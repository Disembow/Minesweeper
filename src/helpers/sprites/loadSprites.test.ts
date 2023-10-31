import { loadSprites } from 'helpers/sprites/loadSprites';
import { describe, expect, test } from 'vitest';

describe('sprite loading', () => {
  test('it should load image', async () => {
    loadSprites().then((data) => {
      expect(data).toBeInstanceOf(HTMLImageElement);
    });
  });
});
