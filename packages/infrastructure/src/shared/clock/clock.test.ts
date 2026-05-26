import { describe, expect, it } from 'vitest';

import { clock } from '@infra/shared/clock/clock';

describe('clock', () => {
  it('devuelve una instancia de Date', () => {
    const ahora = clock.now();
    expect(ahora).toBeInstanceOf(Date);
  });

  it('devuelve un instante cercano al momento de la llamada', () => {
    const antes = Date.now();
    const ahora = clock.now().getTime();
    const despues = Date.now();
    expect(ahora).toBeGreaterThanOrEqual(antes);
    expect(ahora).toBeLessThanOrEqual(despues);
  });
});
