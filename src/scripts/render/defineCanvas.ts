import { db } from '../../app/db/db.ts';
import { handleMouseUp } from '../listeners/handleMouseEvents.ts';
import { options } from '../../app/db/gameOptions.ts';
import { loadSprites } from '../../helpers/sprites/loadSprites.ts';
import { drawControls } from '../../helpers/draw/drawControls.ts';
import { drawMinesAmount } from '../../helpers/draw/drawFieldContent.ts';
import { changeGameMode, createTag } from './render.ts';
import { drawGameFieldBorders } from '../../helpers/draw/drawGameFieldBorders.ts';
import { hidePreloader, showPreloader } from './preloader.ts';

const defineCanvas = async () => {
  const main = <HTMLElement>document.querySelector('.main');
  const canvas = <HTMLCanvasElement>createTag('canvas', 'canvas', main);

  const gameMode = changeGameMode();

  if (gameMode) {
    const { cellsW, cellsH } = options[gameMode];
    const { cellSize, borderSize, headerH, edgeH } = options.game;
    const { mines } = options[gameMode];

    canvas.width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
    canvas.height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

    showPreloader(canvas);

    drawGameFieldBorders(canvas);

    const sprite = await loadSprites();

    drawControls(canvas, sprite);

    db.currentMines = mines;
    drawMinesAmount(canvas, sprite, mines);

    hidePreloader();

    document.onmouseup = () => handleMouseUp(canvas, sprite);

    document.oncontextmenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.classList.contains('canvas')) {
        return false;
      }
    };
  }
};

export { defineCanvas };
