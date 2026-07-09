from pprint import pprint

from intelligence.trend_pipeline import TrendPipeline


pipeline = TrendPipeline()


previous = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Stephen Curry scores for the Golden State Warriors",
    "Scottie Scheffler wins The Masters",
]

current = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Lionel Messi captains Argentina",
    "Lionel Messi leads Argentina to victory",
    "Stephen Curry scores for the Golden State Warriors",
    "Carlos Alcaraz reaches Wimbledon final",
]


result = pipeline.compare(
    previous,
    current,
)

pprint(result)