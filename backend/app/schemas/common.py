from pydantic import BaseModel


class MeResponse(BaseModel):
    emp_id: str | None
    authorized: bool


class FaultReadyResponse(BaseModel):
    total_count: int
    fault_rate: float
    ready_rate: float


class DetectorOut(BaseModel):
    management_no: str
    fault: bool
    ready: bool
    region: str | None
    line: str | None
    floor: str | None
    vendor_name: str | None
    model_name: str | None

    class Config:
        from_attributes = True
