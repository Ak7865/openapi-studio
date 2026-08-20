import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../app/App';

describe('App', () => {
  it('renders the OpenAPI Studio application shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'OpenAPI Studio', level: 1 })).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Welcome to OpenAPI Studio',
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Open-source API development workspace.')).toBeInTheDocument();
  });
});
