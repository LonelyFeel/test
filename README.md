# GasTech 통합 Portal Monorepo (MVP 1단계)

FastAPI + Vue3 + PostgreSQL 기반의 최소 실행 가능한 모노레포 스캐폴딩입니다.

## A) 파일 트리

```text
.
├── .env.example
├── docker-compose.yml
├── README.md
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── deps.py
│   │   │   └── routes.py
│   │   ├── core
│   │   │   └── config.py
│   │   ├── db
│   │   │   ├── database.py
│   │   │   └── models.py
│   │   ├── schemas
│   │   │   └── common.py
│   │   └── main.py
│   ├── migrations
│   │   └── sql
│   │       └── 001_init.sql
│   ├── requirements.txt
│   └── tests
│       └── test_metrics.py
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── src
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── services
│   │       └── api.js
│   └── vite.config.js
└── etl
    ├── README.md
    └── scripts
        └── load_stub.py
```

## B) DB DDL + 마이그레이션 방식

- DDL 파일: `backend/migrations/sql/001_init.sql`
- 전략: MVP에서는 SQL 파일 기반 **순차 수동 마이그레이션**(001, 002...)을 사용.
- 이후 확장 시 Alembic 도입 가능하도록 SQLAlchemy 모델을 분리해 둠.

핵심 테이블:
- `authorized_users`: SSO 권한 승인된 사용자 저장
- `detectors`: 감지기 Raw + Fault/Ready 상태 저장

## C) 로컬 실행 방법 + 최소 테스트

### 1. 환경변수
```bash
cp .env.example .env
```

### 2. PostgreSQL 실행
```bash
docker compose up -d db
```

### 3. 마이그레이션 적용
```bash
psql postgresql://portal:portal@localhost:5432/portal -f backend/migrations/sql/001_init.sql
```

### 4. 백엔드 실행
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 5. 프론트 실행
```bash
cd frontend
npm install
npm run dev
```

### 6. 테스트 1개 이상
```bash
cd backend
pytest -q
```

## API 범위 (MVP)

- `GET /api/me` : SSO 헤더 기반 권한 여부 확인
- `GET /api/metrics/fault-ready` : 오류율/Ready율 계산
- `GET /api/detectors/search` : Raw 조회
- `GET /api/export/detectors` : 엑셀 다운로드

## SSO/보안 가정

- `X-SSO-EMPID` 헤더는 **사내 SSO 프록시가 주입**한다고 가정.
- 본 앱은 반드시 내부 프록시 뒤에서만 노출되어야 하며, 외부 직접 접근 차단이 전제.

## D) TODO

1. 사내 결재 API 연동
   - 권한 요청/승인 플로우 구현
   - 승인 결과를 `authorized_users`에 반영
2. C-DEP 배포 파이프라인
   - backend/frontend/etl 이미지 빌드 및 배포 스펙 작성
   - ETL 정기 실행 스케줄 등록
3. Data Lake -> 임시 DB 적재 실 ETL 구현
4. 대시보드 시각화(차트, 필터 고도화, 페이지네이션)
5. MySQL 호환성 점검(SQLAlchemy dialect + SQL 문법 차이 검토)
