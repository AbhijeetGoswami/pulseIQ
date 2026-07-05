"""
FastAPI configuration and settings
"""
from typing import List
from dataclasses import dataclass, field


@dataclass
class Settings:
    """
    FastAPI application settings
    """
    app_name: str = "PulseIQ"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # API settings
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True
    
    # CORS settings
    cors_origins: List[str] = field(default_factory=lambda: ["*"])
    cors_credentials: bool = True
    cors_methods: List[str] = field(default_factory=lambda: ["*"])
    cors_headers: List[str] = field(default_factory=lambda: ["*"])
    
    def __post_init__(self):
        pass


settings = Settings()
