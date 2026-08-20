import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WorkspaceEditor from './WorkspaceEditor';

describe('WorkspaceEditor', () => {
  it('renders the request editor foundation', () => {
    render(<WorkspaceEditor />);

    expect(screen.getByRole('heading', { name: 'Request Editor', level: 2 })).toBeInTheDocument();

    expect(screen.getByLabelText('Method')).toBeInTheDocument();
    expect(screen.getByLabelText('URL')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();

    expect(screen.getByRole('group', { name: 'Query Parameters' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Headers' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Request Body' })).toBeInTheDocument();
  });

  it('allows the method and URL to be changed', () => {
    render(<WorkspaceEditor />);

    const method = screen.getByLabelText('Method');
    const url = screen.getByLabelText('URL');

    fireEvent.change(method, { target: { value: 'POST' } });
    fireEvent.change(url, {
      target: { value: 'https://example.com/users' },
    });

    expect(method).toHaveValue('POST');
    expect(url).toHaveValue('https://example.com/users');
  });

  it('allows query parameters and headers to be added', () => {
    render(<WorkspaceEditor />);

    fireEvent.click(screen.getByRole('button', { name: 'Add query parameter' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add header' }));

    expect(screen.getByLabelText('Query parameter 1 key')).toBeInTheDocument();

    expect(screen.getByLabelText('Header 1 key')).toBeInTheDocument();
  });

  it('allows request body configuration', () => {
    render(<WorkspaceEditor />);

    const bodyType = screen.getByLabelText('Body type');
    const bodyContent = screen.getByLabelText('Content');

    fireEvent.change(bodyType, { target: { value: 'json' } });
    fireEvent.change(bodyContent, {
      target: { value: '{"name":"Akhter"}' },
    });

    expect(bodyType).toHaveValue('json');
    expect(bodyContent).toHaveValue('{"name":"Akhter"}');
  });

  it('allows parameters to be edited and removed', () => {
    render(<WorkspaceEditor />);

    fireEvent.click(screen.getByRole('button', { name: 'Add query parameter' }));

    const key = screen.getByLabelText('Query parameter 1 key');
    const value = screen.getByLabelText('Query parameter 1 value');

    fireEvent.change(key, { target: { value: 'page' } });
    fireEvent.change(value, { target: { value: '1' } });

    expect(key).toHaveValue('page');
    expect(value).toHaveValue('1');

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    expect(screen.queryByLabelText('Query parameter 1 key')).not.toBeInTheDocument();
  });
});
