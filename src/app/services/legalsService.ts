import type { LegalsResponse, FetchLegalsParams } from "../types/legals";

const API_BASE_URL = "https://r5exi0cxad.execute-api.ap-south-1.amazonaws.com";

export async function getLegals(params?: FetchLegalsParams): Promise<LegalsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const query = queryParams.toString();
  const url = `${API_BASE_URL}/admin/legals${query ? "?" + query : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch legal documents: ${response.statusText}`);
  }

  return response.json();
}
