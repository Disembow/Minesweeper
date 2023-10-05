import { ROOT } from './scripts/game/variables.js';
import { render } from './scripts/render/render.js';
import { loadSprites } from './scripts/sprites/loadSprites.js';

const init = () => {
  render(ROOT);
  loadSprites();
};

export { init };
