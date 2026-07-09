from intelligence.analyzer import analyze_title
from intelligence.attention_engine import AttentionEngine


class AttentionPipeline:
    """
    PulseIQ Attention Pipeline

    Orchestrates the end-to-end attention workflow.

        Titles
            ↓
        Analyzer
            ↓
        Attention Engine
            ↓
        Attention Snapshot
    """

    def __init__(self):
        self.engine = AttentionEngine()

    def analyze(self, title: str):
        """
        Analyze a single article.
        """

        analysis = analyze_title(title)

        return self.engine.calculate([analysis])

    def analyze_batch(self, titles):
        """
        Analyze multiple articles.
        """

        analyses = []

        for title in titles:
            analyses.append(
                analyze_title(title)
            )

        return self.engine.calculate(analyses)