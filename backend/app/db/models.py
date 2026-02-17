from sqlalchemy import Boolean, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class AuthorizedUser(Base):
    __tablename__ = 'authorized_users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    emp_id: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    name: Mapped[str | None] = mapped_column(String(128), nullable=True)
    approved_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())


class Detector(Base):
    __tablename__ = 'detectors'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    management_no: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    fault: Mapped[bool] = mapped_column(Boolean, default=False)
    ready: Mapped[bool] = mapped_column(Boolean, default=False)
    region: Mapped[str | None] = mapped_column(String(64), nullable=True)
    line: Mapped[str | None] = mapped_column(String(64), nullable=True)
    floor: Mapped[str | None] = mapped_column(String(64), nullable=True)
    vendor_name: Mapped[str | None] = mapped_column(String(128), nullable=True)
    model_name: Mapped[str | None] = mapped_column(String(128), nullable=True)
