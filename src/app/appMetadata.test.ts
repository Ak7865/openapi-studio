import { describe, expect, it } from 'vitest';

import { appMetadata } from './appMetadata';

describe('appMetadata', () => {
  it('defines the application identity', () => {
    expect(appMetadata.name).toBe('OpenAPI Studio');
    expect(appMetadata.description).toBe('Open-source API development workspace.');
  });
});
