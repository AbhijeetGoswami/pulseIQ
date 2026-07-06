from intelligence.attention_engine import AttentionEngine

engine = AttentionEngine()

entities = [

    {
        "id":"football_team_england"
    },

    {
        "id":"football_team_england"
    },

    {
        "id":"football_competition_fifa_world_cup"
    }

]

print(
    engine.calculate(
        entities
    )
)