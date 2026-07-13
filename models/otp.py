from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class OtpCode:
    id: Optional[int]
    user_id: int
    otp: str
    expires_at: datetime
    verified: bool
    created_at: Optional[datetime] = None