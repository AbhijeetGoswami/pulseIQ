class ArticleIngestor:
    """
    PulseIQ Article Ingestor

    Responsible for normalizing incoming
    articles into a common format for the
    processing pipeline.
    """

    def ingest(self, articles):
        """
        Normalize incoming articles.

        Parameters
        ----------
        articles : list[dict]

        Example
        -------
        [
            {
                "title": "Lionel Messi scores against Brazil"
            }
        ]

        Returns
        -------
        list[str]
        """

        titles = []

        for article in articles:

            title = article.get("title")

            if not title:
                continue

            title = title.strip()

            if not title:
                continue

            titles.append(title)

        return titles