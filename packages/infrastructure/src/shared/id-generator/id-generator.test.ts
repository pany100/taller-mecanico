import { describe, expect, it } from 'vitest';

import { idGenerator } from '@infra/shared/id-generator/id-generator';

const FORMATO_UUID_V7 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('idGenerator', () => {
  it('produce un string con formato UUID v7 válido', () => {
    const id = idGenerator.generate();
    expect(id).toMatch(FORMATO_UUID_V7);
  });

  it('produce ids distintos en llamadas sucesivas', () => {
    const ids = new Set(
      Array.from({ length: 1000 }, () => idGenerator.generate()),
    );
    expect(ids.size).toBe(1000);
  });

  it('produce ids monotónicamente crecientes en el tiempo (propiedad de v7)', () => {
    const primero = idGenerator.generate();
    const segundo = idGenerator.generate();
    expect(segundo > primero).toBe(true);
  });
});
