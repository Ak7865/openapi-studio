import type {
  HttpMethod,
  RequestBodyType,
  WorkspaceParameter,
  WorkspaceRequest,
} from './workspaceTypes';

export function updateRequestMethod(
  request: WorkspaceRequest,
  method: HttpMethod,
): WorkspaceRequest {
  return {
    ...request,
    method,
  };
}

export function updateRequestUrl(request: WorkspaceRequest, url: string): WorkspaceRequest {
  return {
    ...request,
    url,
  };
}

export function addRequestParameter(
  request: WorkspaceRequest,
  type: 'queryParams' | 'headers',
): WorkspaceRequest {
  const parameter: WorkspaceParameter = {
    key: '',
    value: '',
    enabled: true,
  };

  return {
    ...request,
    [type]: [...request[type], parameter],
  };
}

export function updateRequestParameter(
  request: WorkspaceRequest,
  type: 'queryParams' | 'headers',
  index: number,
  parameter: WorkspaceParameter,
): WorkspaceRequest {
  return {
    ...request,
    [type]: request[type].map((item, itemIndex) => (itemIndex === index ? parameter : item)),
  };
}

export function removeRequestParameter(
  request: WorkspaceRequest,
  type: 'queryParams' | 'headers',
  index: number,
): WorkspaceRequest {
  return {
    ...request,
    [type]: request[type].filter((_, itemIndex) => itemIndex !== index),
  };
}

export function updateRequestBody(
  request: WorkspaceRequest,
  type: RequestBodyType,
  content: string,
): WorkspaceRequest {
  return {
    ...request,
    body: {
      type,
      content,
    },
  };
}

export function resetRequest(): WorkspaceRequest {
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
