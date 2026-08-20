import { useState } from 'react';

import type { HttpMethod, WorkspaceParameter, WorkspaceRequest } from './workspaceTypes';

const defaultRequest: WorkspaceRequest = {
  method: 'GET',
  url: '',
  queryParams: [],
  headers: [],
  body: {
    type: 'none',
    content: '',
  },
};

const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

function createParameter(): WorkspaceParameter {
  return {
    key: '',
    value: '',
    enabled: true,
  };
}

function WorkspaceEditor() {
  const [request, setRequest] = useState<WorkspaceRequest>(defaultRequest);

  const updateRequest = <K extends keyof WorkspaceRequest>(key: K, value: WorkspaceRequest[K]) => {
    setRequest((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateParameter = (
    type: 'queryParams' | 'headers',
    index: number,
    parameter: WorkspaceParameter,
  ) => {
    setRequest((current) => ({
      ...current,
      [type]: current[type].map((item, itemIndex) => (itemIndex === index ? parameter : item)),
    }));
  };

  const addParameter = (type: 'queryParams' | 'headers') => {
    setRequest((current) => ({
      ...current,
      [type]: [...current[type], createParameter()],
    }));
  };

  const removeParameter = (type: 'queryParams' | 'headers', index: number) => {
    setRequest((current) => ({
      ...current,
      [type]: current[type].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <section aria-labelledby="request-editor-heading">
      <h2 id="request-editor-heading">Request Editor</h2>

      <div>
        <label htmlFor="request-method">Method</label>
        <select
          id="request-method"
          value={request.method}
          onChange={(event) => updateRequest('method', event.target.value as HttpMethod)}
        >
          {httpMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <label htmlFor="request-url">URL</label>
        <input
          id="request-url"
          type="url"
          value={request.url}
          onChange={(event) => updateRequest('url', event.target.value)}
          placeholder="https://example.com"
        />

        <button type="button">Send</button>
      </div>

      <fieldset>
        <legend>Query Parameters</legend>

        {request.queryParams.map((parameter, index) => (
          <div key={`query-${index}`}>
            <input
              aria-label={`Query parameter ${index + 1} key`}
              value={parameter.key}
              onChange={(event) =>
                updateParameter('queryParams', index, {
                  ...parameter,
                  key: event.target.value,
                })
              }
              placeholder="Key"
            />

            <input
              aria-label={`Query parameter ${index + 1} value`}
              value={parameter.value}
              onChange={(event) =>
                updateParameter('queryParams', index, {
                  ...parameter,
                  value: event.target.value,
                })
              }
              placeholder="Value"
            />

            <label>
              <input
                type="checkbox"
                checked={parameter.enabled}
                onChange={(event) =>
                  updateParameter('queryParams', index, {
                    ...parameter,
                    enabled: event.target.checked,
                  })
                }
              />
              Enabled
            </label>

            <button type="button" onClick={() => removeParameter('queryParams', index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => addParameter('queryParams')}>
          Add query parameter
        </button>
      </fieldset>

      <fieldset>
        <legend>Headers</legend>

        {request.headers.map((parameter, index) => (
          <div key={`header-${index}`}>
            <input
              aria-label={`Header ${index + 1} key`}
              value={parameter.key}
              onChange={(event) =>
                updateParameter('headers', index, {
                  ...parameter,
                  key: event.target.value,
                })
              }
              placeholder="Key"
            />

            <input
              aria-label={`Header ${index + 1} value`}
              value={parameter.value}
              onChange={(event) =>
                updateParameter('headers', index, {
                  ...parameter,
                  value: event.target.value,
                })
              }
              placeholder="Value"
            />

            <label>
              <input
                type="checkbox"
                checked={parameter.enabled}
                onChange={(event) =>
                  updateParameter('headers', index, {
                    ...parameter,
                    enabled: event.target.checked,
                  })
                }
              />
              Enabled
            </label>

            <button type="button" onClick={() => removeParameter('headers', index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => addParameter('headers')}>
          Add header
        </button>
      </fieldset>

      <fieldset>
        <legend>Request Body</legend>

        <label htmlFor="request-body-type">Body type</label>
        <select
          id="request-body-type"
          value={request.body.type}
          onChange={(event) =>
            setRequest((current) => ({
              ...current,
              body: {
                ...current.body,
                type: event.target.value as WorkspaceRequest['body']['type'],
              },
            }))
          }
        >
          <option value="none">None</option>
          <option value="json">JSON</option>
          <option value="text">Text</option>
          <option value="form-data">Form data</option>
        </select>

        <label htmlFor="request-body-content">Content</label>
        <textarea
          id="request-body-content"
          value={request.body.content}
          onChange={(event) =>
            setRequest((current) => ({
              ...current,
              body: {
                ...current.body,
                content: event.target.value,
              },
            }))
          }
          placeholder="Request body"
        />
      </fieldset>
    </section>
  );
}

export default WorkspaceEditor;
