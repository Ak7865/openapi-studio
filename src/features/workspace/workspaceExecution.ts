import type { WorkspaceRequest, WorkspaceResponse } from './workspaceTypes';

function buildRequestUrl(request: WorkspaceRequest): string {
  const url = new URL(request.url);

  for (const parameter of request.queryParams) {
    if (parameter.enabled && parameter.key) {
      url.searchParams.set(parameter.key, parameter.value);
    }
  }

  return url.toString();
}

function buildRequestHeaders(request: WorkspaceRequest): Record<string, string> {
  return Object.fromEntries(
    request.headers
      .filter((parameter) => parameter.enabled && parameter.key)
      .map((parameter) => [parameter.key, parameter.value]),
  );
}

function buildRequestBody(request: WorkspaceRequest): string | undefined {
  if (request.body.type === 'none') {
    return undefined;
  }

  return request.body.content;
}

export async function executeWorkspaceRequest(
  request: WorkspaceRequest,
  fetchImpl: typeof fetch = fetch,
): Promise<WorkspaceResponse> {
  const response = await fetchImpl(buildRequestUrl(request), {
    method: request.method,
    headers: buildRequestHeaders(request),
    body: buildRequestBody(request),
  });

  const headers = Object.fromEntries(response.headers.entries());
  const body = await response.text();

  return {
    status: response.status,
    statusText: response.statusText,
    headers,
    body,
  };
}
