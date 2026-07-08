from intelligence.analyzer import analyze_titles
from intelligence.attention_engine import AttentionEngine

titles = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi signs new contract",
    "Argentina prepares for World Cup",
    "Brazil defeats Uruguay",
    "Lionel Messi wins Ballon d'Or"
]

analyses = analyze_titles(titles)

engine = AttentionEngine()

result = engine.calculate(analyses)

print(result)