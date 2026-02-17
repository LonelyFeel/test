from fastapi import HTTPException, Request
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.database import get_db
from app.db.models import AuthorizedUser


settings = get_settings()


def get_emp_id(request: Request) -> str:
    # Behind trusted internal proxy only; direct external access must be blocked by infra.
    header_name = settings.sso_header_name
    emp_id = request.headers.get(header_name)
    if not emp_id:
        raise HTTPException(status_code=401, detail=f'Missing SSO header: {header_name}')
    return emp_id


def get_authorization(emp_id: str, db: Session) -> bool:
    return db.query(AuthorizedUser).filter(AuthorizedUser.emp_id == emp_id).first() is not None


def db_dep():
    yield from get_db()
