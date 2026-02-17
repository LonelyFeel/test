from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.database import Base
from app.db.models import AuthorizedUser, Detector
from app.main import app
from app.api.deps import db_dep

SQLALCHEMY_DATABASE_URL = 'sqlite:///./test.db'
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


def setup_module():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    db.add(AuthorizedUser(emp_id='E001', name='Tester'))
    db.add_all([
        Detector(management_no='M1', fault=True, ready=False),
        Detector(management_no='M2', fault=False, ready=True),
        Detector(management_no='M3', fault=False, ready=False),
    ])
    db.commit()
    db.close()


app.dependency_overrides[db_dep] = override_get_db
client = TestClient(app)


def test_fault_ready_metrics():
    resp = client.get('/api/metrics/fault-ready', headers={'X-SSO-EMPID': 'E001'})
    assert resp.status_code == 200
    body = resp.json()
    assert body['total_count'] == 3
    assert body['ready_rate'] == 1 / 3
    assert body['fault_rate'] == 1 / 2
