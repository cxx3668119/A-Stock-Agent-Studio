from fastapi.testclient import TestClient

from app.main import app


def test_reports_endpoint_is_available():
    client = TestClient(app)
    response = client.get("/api/v1/reports")

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["data"], list)
