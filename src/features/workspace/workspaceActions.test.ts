import { describe, expect, it } from 'vitest';

import {
  addRequestParameter,
  removeRequestParameter,
  resetRequest,
  updateRequestBody,
  updateRequestMethod,
  updateRequestParameter,
  updateRequestUrl,
} from './workspaceActions';
import { createInitialWorkspaceRequest } from './workspaceTypes';

describe('workspace actions', () => {
  it('updates the request method', () => {
    const request = createInitialWorkspaceRequest();

    const updated = updateRequestMethod(request, 'POST');

    expect(updated.method).toBe('POST');
    expect(request.method).toBe('GET');
  });

  it('updates the request URL', () => {
    const request = createInitialWorkspaceRequest();

    const updated = updateRequestUrl(request, 'https://example.com/users');

    expect(updated.url).toBe('https://example.com/users');
    expect(request.url).toBe('');
  });

  it('adds query parameters and headers', () => {
    const request = createInitialWorkspaceRequest();

    const withQuery = addRequestParameter(request, 'queryParams');
    const withHeader = addRequestParameter(withQuery, 'headers');

    expect(withQuery.queryParams).toEqual([
      {
        key: '',
        value: '',
        enabled: true,
      },
    ]);

    expect(withHeader.headers).toEqual([
      {
        key: '',
        value: '',
        enabled: true,
      },
    ]);
  });

  it('updates a request parameter', () => {
    const request = addRequestParameter(createInitialWorkspaceRequest(), 'queryParams');

    const updated = updateRequestParameter(request, 'queryParams', 0, {
      key: 'page',
      value: '1',
      enabled: true,
    });

    expect(updated.queryParams[0]).toEqual({
      key: 'page',
      value: '1',
      enabled: true,
    });
  });

  it('removes a request parameter', () => {
    let request = addRequestParameter(createInitialWorkspaceRequest(), 'queryParams');

    request = addRequestParameter(request, 'queryParams');

    const updated = removeRequestParameter(request, 'queryParams', 0);

    expect(updated.queryParams).toHaveLength(1);
    expect(updated.queryParams[0]).toEqual({
      key: '',
      value: '',
      enabled: true,
    });
  });

  it('updates the request body', () => {
    const request = createInitialWorkspaceRequest();

    const updated = updateRequestBody(request, 'json', '{"name":"Akhter"}');

    expect(updated.body).toEqual({
      type: 'json',
      content: '{"name":"Akhter"}',
    });
  });

  it('resets the request', () => {
    let request = createInitialWorkspaceRequest();

    request = updateRequestMethod(request, 'POST');
    request = updateRequestUrl(request, 'https://example.com');
    request = addRequestParameter(request, 'queryParams');

    const reset = resetRequest();

    expect(reset).toEqual(createInitialWorkspaceRequest());
    expect(request).not.toEqual(reset);
  });

  it('does not mutate the original request', () => {
    const request = createInitialWorkspaceRequest();
    const original = structuredClone(request);

    updateRequestMethod(request, 'POST');
    addRequestParameter(request, 'headers');
    updateRequestBody(request, 'json', '{}');

    expect(request).toEqual(original);
  });
});
