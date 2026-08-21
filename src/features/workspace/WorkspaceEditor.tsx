import { useState } from 'react';

import {
  addRequestParameter,
  removeRequestParameter,
  updateRequestBody,
  updateRequestMethod,
  updateRequestParameter,
  updateRequestUrl,
} from './workspaceActions';
import {
  createInitialWorkspaceRequest,
  type HttpMethod,
  type RequestBodyType,
  type WorkspaceParameter,
  type WorkspaceRequest,
} from './workspaceTypes';

const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

function WorkspaceEditor() {
  const [request, setRequest] = useState<WorkspaceRequest>(createInitialWorkspaceRequest);

  const handleMethodChange = (method: HttpMethod) => {
    setRequest((current) => updateRequestMethod(current, method));
  };

  const handleUrlChange = (url: string) => {
    setRequest((current) => updateRequestUrl(current, url));
  };

  const handleParameterChange = (
    type: 'queryParams' | 'headers',
    index: number,
    parameter: WorkspaceParameter,
  ) => {
    setRequest((current) => updateRequestParameter(current, type, index, parameter));
  };

  const handleAddParameter = (type: 'queryParams' | 'headers') => {
    setRequest((current) => addRequestParameter(current, type));
  };

  const handleRemoveParameter = (type: 'queryParams' | 'headers', index: number) => {
    setRequest((current) => removeRequestParameter(current, type, index));
  };

  const handleBodyChange = (type: RequestBodyType, content: string) => {
    setRequest((current) => updateRequestBody(current, type, content));
  };

  return (
    <section aria-labelledby="request-editor-heading">
      <h2 id="request-editor-heading">Request Editor</h2>

      <div>
        <label htmlFor="request-method">Method</label>
        <select
          id="request-method"
          value={request.method}
          onChange={(event) => handleMethodChange(event.target.value as HttpMethod)}
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
          onChange={(event) => handleUrlChange(event.target.value)}
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
                handleParameterChange('queryParams', index, {
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
                handleParameterChange('queryParams', index, {
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
                  handleParameterChange('queryParams', index, {
                    ...parameter,
                    enabled: event.target.checked,
                  })
                }
              />
              Enabled
            </label>

            <button type="button" onClick={() => handleRemoveParameter('queryParams', index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => handleAddParameter('queryParams')}>
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
                handleParameterChange('headers', index, {
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
                handleParameterChange('headers', index, {
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
                  handleParameterChange('headers', index, {
                    ...parameter,
                    enabled: event.target.checked,
                  })
                }
              />
              Enabled
            </label>

            <button type="button" onClick={() => handleRemoveParameter('headers', index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => handleAddParameter('headers')}>
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
            handleBodyChange(event.target.value as RequestBodyType, request.body.content)
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
          onChange={(event) => handleBodyChange(request.body.type, event.target.value)}
          placeholder="Request body"
        />
      </fieldset>
    </section>
  );
}

export default WorkspaceEditor;
