from dataclasses import dataclass, field

@dataclass
class Entity:

    id: str

    type: str

    value: str

    aliases: list[str]

    sport: str

    confidence: float = 1.0

    metadata: dict = field(default_factory=dict)