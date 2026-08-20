import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

function TestComponent() {
  return <h1>OpenAPI Studio</h1>;
}

describe('React testing infrastructure', () => {
  it('renders a React component', () => {
    render(<TestComponent />);

    expect(screen.getByRole('heading', { name: 'OpenAPI Studio' })).toBeInTheDocument();
  });
});
