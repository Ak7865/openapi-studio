import { describe, expect, it, vi } from 'vitest';

import { executeWorkspaceRequest } from './workspaceExecution';
import { createInitialWorkspaceRequest } from './workspaceTypes';

describe('executeWorkspaceRequest', () => {
  it('executes a GET request with enabled query parameters and headers', async () => {
    const request = createInitialWorkspaceRequest();

    request.url = 'https://example.com/users';
    request.queryParams = [
      {
        key: 'page',
        value: '1',
        enabled: true,
      },
      {
        key: 'disabled',
        value: 'ignored',
        enabled: false,
      },
    ];
    request.headers = [
      {
        key: 'Accept',
        value: 'application/json',
        enabled: true,
      },
      {
        key: 'X-Ignored',
        value: 'ignored',
        enabled: false,
      },
    ];

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(`{"ok":true}`, {
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
        },
      }),
    );

    const response = await executeWorkspaceRequest(request, fetchMock);

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/users?page=1', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      body: undefined,
    });

    expect(response).toEqual({
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json',
      },
      body: '{"ok":true}',
    });
  });

  it('sends a request body when configured', async () => {
    const request = createInitialWorkspaceRequest();

    request.method = 'POST';
    request.url = 'https://example.com/users';
    request.body = {
      type: 'json',
      content: '{"name":"Akhter"}',
    };

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response('created', {
        status: 201,
        statusText: 'Created',
      }),
    );

    const response = await executeWorkspaceRequest(request, fetchMock);

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/users', {
      method: 'POST',
      headers: {},
      body: '{"name":"Akhter"}',
    });

    expect(response.status).toBe(201);
    expect(response.body).toBe('created');
  });

  it('does not send a body for a none body type', async () => {
    const request = createInitialWorkspaceRequest();

    request.method = 'DELETE';
    request.url = 'https://example.com/users/1';

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(null, {
        status: 204,
        statusText: 'No Content',
      }),
    );

    await executeWorkspaceRequest(request, fetchMock);

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/users/1', {
      method: 'DELETE',
      headers: {},
      body: undefined,
    });
  });
});
