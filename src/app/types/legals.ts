export interface Legal {
  id: string;
  documentName: string;
  documentLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalsResponse {
  message: string;
  count: number;
  total: number;
  scannedCount: number;
  legals: Legal[];
}

export interface FetchLegalsParams {
  limit?: number;
}
