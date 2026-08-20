import { describe, expect, it } from 'vitest';

import type { HttpMethod, WorkspaceRequest, WorkspaceResponse } from './workspaceTypes';

describe('workspace types', () => {
  it('supports the initial HTTP request model', () => {
    const request: WorkspaceRequest = {
      method: 'GET',
      url: 'https://example.com',
    };

    expect(request.method satisfies HttpMethod).toBe('GET');
    expect(request.url).toBe('https://example.com');
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
