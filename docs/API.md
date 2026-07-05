# FastAPI Integration Guide

This document describes the FastAPI integration for the PulseIQ project.

## Overview

The project has been integrated with FastAPI, a modern web framework for building APIs with Python. The API provides endpoints for:

- Health checks and status
- News collection and ingestion
- Article retrieval and filtering
- Metrics and analytics

## Project Structure

```
api/
├── __init__.py
├── config.py           # API configuration settings
├── ingest.py          # Utility functions for news collection
└── routers/           # API route modules
    ├── health.py      # Health check endpoints
    ├── news.py        # News collection endpoints
    ├── metrics.py     # Metrics and analytics endpoints
    └── articles.py    # Article retrieval endpoints

app.py                 # Main FastAPI application
```

## Running the API

### Prerequisites

- Python 3.8+
- Virtual environment activated (if using one)
- Dependencies installed: `pip install -r requirements.txt`

### Start the Development Server

```bash
python app.py
```

The API will start on `http://localhost:8000`

Alternatively, using uvicorn directly:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Production Server

For production, use Gunicorn with Uvicorn workers:

```bash
pip install gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

## API Endpoints

### Health & Status

- **GET** `/api/health` - Quick health check
- **GET** `/api/status` - Detailed API status and information

### News Collection

- **POST** `/api/collect` - Trigger news collection
  - Request body:
    ```json
    {
      "include_metrics": true
    }
    ```
  - Response includes: run_id, inserted count, duplicates, failures, duration

- **GET** `/api/collect/status` - Collection endpoint information

### Articles

- **GET** `/api/articles` - Retrieve articles with filtering
  - Query parameters:
    - `sport`: Filter by sport (optional)
    - `source`: Filter by source (optional)
    - `limit`: Max results (default: 50)
    - `offset`: Pagination offset (default: 0)

- **GET** `/api/articles/{article_id}` - Get specific article

- **GET** `/api/articles/count` - Get article count
  - Query parameters:
    - `sport`: Filter by sport (optional)
    - `source`: Filter by source (optional)

### Metrics

- **GET** `/api/metrics` - Aggregated collection metrics
  - Query parameters:
    - `days`: Number of days to aggregate (default: 7)
  - Returns: total runs, articles, inserted, duplicates, failures

- **GET** `/api/metrics/sources` - Metrics by news source
  - Query parameters:
    - `limit`: Max sources (default: 10)

- **GET** `/api/metrics/sports` - Metrics by sport category

## Interactive Documentation

FastAPI provides two interactive documentation interfaces:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These allow you to:
- View all endpoints with detailed information
- Try out API calls directly in the browser
- See request/response schemas
- View error responses

## Example API Calls

### Trigger News Collection

```bash
curl -X POST http://localhost:8000/api/collect \
  -H "Content-Type: application/json" \
  -d '{"include_metrics": true}'
```

### Get Articles

```bash
# Get latest articles
curl http://localhost:8000/api/articles?limit=10

# Get articles by sport
curl http://localhost:8000/api/articles?sport=football&limit=20

# Get articles by source
curl http://localhost:8000/api/articles?source=BBC%20Sport
```

### Get Metrics

```bash
# Get last 7 days metrics
curl http://localhost:8000/api/metrics

# Get last 30 days metrics
curl http://localhost:8000/api/metrics?days=30

# Get source metrics
curl http://localhost:8000/api/metrics/sources

# Get sports metrics
curl http://localhost:8000/api/metrics/sports
```

## Configuration

API settings can be configured in `api/config.py`:

- `app_name`: Application name
- `app_version`: API version
- `debug`: Debug mode
- `api_host`: Server host (default: 0.0.0.0)
- `api_port`: Server port (default: 8000)
- `api_reload`: Auto-reload on file changes
- `cors_origins`: Allowed CORS origins (default: ["*"])

## Error Handling

The API includes error handling for:
- Database connection failures
- Invalid query parameters
- Missing resources (404)
- Server errors (500)

Error responses include:
```json
{
  "detail": "Error message describing what went wrong"
}
```

## Performance

- **Connection Pooling**: Reuses database connections
- **Async Endpoints**: Non-blocking request handling
- **CORS**: Enabled for cross-origin requests
- **Uvicorn**: High-performance ASGI server

## Monitoring & Logging

Integration with the project's logging system:
- Access logs via `/logs` directory
- Request/response logging
- Performance metrics collection

## Development

### Adding New Endpoints

1. Create a new router in `api/routers/`:
   ```python
   from fastapi import APIRouter
   
   router = APIRouter()
   
   @router.get("/example")
   async def example_endpoint():
       return {"message": "Hello"}
   ```

2. Include in `app.py`:
   ```python
   from api.routers import example
   app.include_router(example.router, prefix="/api", tags=["Example"])
   ```

### Pydantic Models

Use Pydantic models for request validation and response serialization:

```python
from pydantic import BaseModel

class MyRequest(BaseModel):
    field: str
    optional_field: str = None

@router.post("/endpoint", response_model=MyRequest)
async def create_item(item: MyRequest):
    return item
```

## Testing

Run the API and test endpoints using:
- curl commands
- Postman collection
- Python requests library
- FastAPI's built-in test client

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
python app.py --port 8001
```

### Database Connection Issues
- Ensure `data/pulseiq.db` exists and is readable
- Check database schema is initialized
- Verify database path in `config.py`

### Import Errors
- Ensure all dependencies in `requirements.txt` are installed
- Check Python version is 3.8+
- Verify virtual environment is activated

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Uvicorn Documentation](https://www.uvicorn.org)
- [Pydantic Documentation](https://docs.pydantic.dev)
- [Project Architecture](ARCHITECTURE.md)
