import { describe, expect, it } from 'vitest';

import type { HttpMethod, WorkspaceRequest, WorkspaceResponse } from './workspaceTypes';

describe('workspace types', () => {
  it('supports the initial HTTP request model', () => {
    const request: WorkspaceRequest = {
      method: 'GET',
      url: 'https://example.com',
      queryParams: [],
      headers: [],
      body: {
        type: 'none',
        content: '',
      },
    };

    expect(request.method satisfies HttpMethod).toBe('GET');
    expect(request.url).toBe('https://example.com');
    expect(request.queryParams).toEqual([]);
    expect(request.headers).toEqual([]);
    expect(request.body).toEqual({
      type: 'none',
      content: '',
    });
  });

  it('supports query parameters and headers', () => {
    const request: WorkspaceRequest = {
      method: 'GET',
      url: 'https://example.com/users',
      queryParams: [
        {
          key: 'page',
          value: '1',
          enabled: true,
        },
        {
          key: 'limit',
          value: '20',
          enabled: false,
        },
      ],
      headers: [
        {
          key: 'Accept',
          value: 'application/json',
          enabled: true,
        },
      ],
      body: {
        type: 'none',
        content: '',
      },
    };

    expect(request.queryParams).toHaveLength(2);
    expect(request.queryParams[0]).toEqual({
      key: 'page',
      value: '1',
      enabled: true,
    });
    expect(request.queryParams[1].enabled).toBe(false);

    expect(request.headers).toHaveLength(1);
    expect(request.headers[0]).toEqual({
      key: 'Accept',
      value: 'application/json',
      enabled: true,
    });
  });

  it('supports request body configuration', () => {
    const request: WorkspaceRequest = {
      method: 'POST',
      url: 'https://example.com/users',
      queryParams: [],
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
          enabled: true,
        },
      ],
      body: {
        type: 'json',
        content: '{"name":"Akhter"}',
      },
    };

    expect(request.body.type).toBe('json');
    expect(request.body.content).toBe('{"name":"Akhter"}');
  });

  it('supports the initial HTTP response model', () => {
    const response: WorkspaceResponse = {
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json',
      },
      body: '{"ok":true}',
    };

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.headers['content-type']).toBe('application/json');
    expect(response.body).toBe('{"ok":true}');
  });
});
