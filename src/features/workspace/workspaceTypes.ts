export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface WorkspaceRequest {
  method: HttpMethod;
  url: string;
}

export interface WorkspaceResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}
