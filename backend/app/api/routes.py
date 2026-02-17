from io import BytesIO
from datetime import datetime

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from openpyxl import Workbook
from sqlalchemy import and_, func
from sqlalchemy.orm import Session

from app.api.deps import db_dep, get_authorization, get_emp_id
from app.core.config import get_settings
from app.db.models import Detector
from app.schemas.common import DetectorOut, FaultReadyResponse, MeResponse

router = APIRouter(prefix='/api')
settings = get_settings()


def apply_filters(query, line: str | None, model_name: str | None, region: str | None):
    conditions = []
    if line:
        conditions.append(Detector.line == line)
    if model_name:
        conditions.append(Detector.model_name == model_name)
    if region:
        conditions.append(Detector.region == region)
    if conditions:
        query = query.filter(and_(*conditions))
    return query


@router.get('/me', response_model=MeResponse)
def me(emp_id: str = Depends(get_emp_id), db: Session = Depends(db_dep)):
    return MeResponse(emp_id=emp_id, authorized=get_authorization(emp_id, db))


@router.get('/metrics/fault-ready', response_model=FaultReadyResponse)
def fault_ready(
    line: str | None = Query(default=None),
    model_name: str | None = Query(default=None),
    region: str | None = Query(default=None),
    emp_id: str = Depends(get_emp_id),
    db: Session = Depends(db_dep),
):
    _ = emp_id
    q = apply_filters(db.query(Detector), line, model_name, region)
    total_count = q.count()

    ready_count = apply_filters(db.query(func.count(Detector.id)).filter(Detector.ready.is_(True)), line, model_name, region).scalar() or 0
    fault_count_excluding_ready = apply_filters(
        db.query(func.count(Detector.id)).filter(Detector.fault.is_(True), Detector.ready.is_(False)), line, model_name, region
    ).scalar() or 0
    denominator_excluding_ready = max(total_count - ready_count, 1)

    fault_rate = fault_count_excluding_ready / denominator_excluding_ready
    ready_rate = ready_count / max(total_count, 1)

    return FaultReadyResponse(total_count=total_count, fault_rate=fault_rate, ready_rate=ready_rate)


@router.get('/detectors/search', response_model=list[DetectorOut])
def detectors_search(
    line: str | None = Query(default=None),
    model_name: str | None = Query(default=None),
    region: str | None = Query(default=None),
    limit: int = Query(default=200, le=5000),
    offset: int = Query(default=0),
    emp_id: str = Depends(get_emp_id),
    db: Session = Depends(db_dep),
):
    _ = emp_id
    q = apply_filters(db.query(Detector), line, model_name, region)
    return q.order_by(Detector.id).offset(offset).limit(limit).all()


@router.get('/export/detectors')
def export_detectors(
    line: str | None = Query(default=None),
    model_name: str | None = Query(default=None),
    region: str | None = Query(default=None),
    emp_id: str = Depends(get_emp_id),
    db: Session = Depends(db_dep),
):
    _ = emp_id
    rows = apply_filters(db.query(Detector), line, model_name, region).all()

    wb = Workbook()
    ws = wb.active
    ws.title = 'detectors'
    ws.append(['management_no', 'fault', 'ready', 'region', 'line', 'floor', 'vendor_name', 'model_name'])
    for d in rows:
        ws.append([d.management_no, d.fault, d.ready, d.region, d.line, d.floor, d.vendor_name, d.model_name])

    stream = BytesIO()
    wb.save(stream)
    stream.seek(0)

    filename = f"{settings.export_filename_prefix}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.xlsx"
    headers = {'Content-Disposition': f'attachment; filename={filename}'}
    return StreamingResponse(stream, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', headers=headers)
