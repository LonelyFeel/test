from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    app_env: str = 'local'
    backend_host: str = '0.0.0.0'
    backend_port: int = 8000
    database_url: str = 'postgresql+psycopg://portal:portal@localhost:5432/portal'
    sso_header_name: str = 'X-SSO-EMPID'
    trust_proxy_headers: bool = True
    export_filename_prefix: str = 'detectors_export'
    cors_origins: str = 'http://localhost:5173'


@lru_cache
def get_settings() -> Settings:
    return Settings()
