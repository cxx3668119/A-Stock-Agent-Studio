import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type { StockSearchItem } from "../types/stock";
export async function searchStocks(query: string) {
  const response = await apiClient.get<ApiResponse<StockSearchItem[]>>(
    "/v1/stocks/search",
    {
      params: { q: query },
    },
  );

  return response.data;
}
