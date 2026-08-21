export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface WorkspaceParameter {
  key: string;
  value: string;
  enabled: boolean;
}

export type RequestBodyType = 'none' | 'json' | 'text' | 'form-data';

export interface WorkspaceRequestBody {
  type: RequestBodyType;
  content: string;
}

export interface WorkspaceRequest {
  method: HttpMethod;
  url: string;
  queryParams: WorkspaceParameter[];
  headers: WorkspaceParameter[];
  body: WorkspaceRequestBody;
}

export interface WorkspaceResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

export function createInitialWorkspaceRequest(): WorkspaceRequest {
  return {
    method: 'GET',
    url: '',
    queryParams: [],
    headers: [],
    body: {
      type: 'none',
      content: '',
    },
  };
}
