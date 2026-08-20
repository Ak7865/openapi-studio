export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface WorkspaceParameter {
  key: string;
  value: string;
  enabled: boolean;
}

export interface WorkspaceRequest {
  method: HttpMethod;
  url: string;
  queryParams: WorkspaceParameter[];
  headers: WorkspaceParameter[];
}

export interface WorkspaceResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}
