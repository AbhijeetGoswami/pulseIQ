from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class User:
    id: Optional[int]
    email: str
    password_hash: str
    first_name: str
    last_name: str
    role: str
    is_active: bool
    created_at: Optional[datetime] = None