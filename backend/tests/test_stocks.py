from fastapi.testclient import TestClient

from app.main import app


def test_stock_summary_endpoint():
    client = TestClient(app)
    response = client.get("/api/v1/stocks/600519/summary")

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["code"] == "600519"
    assert payload["data"]["name"] == "贵州茅台"
    assert payload["data"]["sources"]


def test_stock_search_endpoint():
    client = TestClient(app)
    response = client.get("/api/v1/stocks/search", params={"q": "茅台"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["data"][0]["code"] == "600519"
