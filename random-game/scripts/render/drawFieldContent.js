import { db } from '../db/db.js';
import { options } from '../game/options.js';

const { cellSize, borderSize, edgeH, headerH } = options.game;

const drawFieldContent = (ctx, sprite, cellX, cellY) => {
  const target = db.game[cellY][cellX];
  const targetX = cellX * cellSize + borderSize + edgeH;
  const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;

  const targetCoords = [targetX, targetY, cellSize, cellSize];

  target.isOpen = true;

  if (target.isMine) {
    ctx.drawImage(sprite, 102, 51, 16, 16, ...targetCoords);
  } else {
    switch (target.minesAround) {
      case 0:
        ctx.drawImage(sprite, 17, 51, 16, 16, ...targetCoords);
        break;
      case 1:
        ctx.drawImage(sprite, 0, 68, 16, 16, ...targetCoords);
        break;
      case 2:
        ctx.drawImage(sprite, 17, 68, 16, 16, ...targetCoords);
        break;
      case 3:
        ctx.drawImage(sprite, 34, 68, 16, 16, ...targetCoords);
        break;
      case 4:
        ctx.drawImage(sprite, 51, 68, 16, 16, ...targetCoords);
        break;
      case 5:
        ctx.drawImage(sprite, 68, 68, 16, 16, ...targetCoords);
        break;
      case 6:
        ctx.drawImage(sprite, 85, 68, 16, 16, ...targetCoords);
        break;
      case 7:
        ctx.drawImage(sprite, 102, 68, 16, 16, ...targetCoords);
        break;
      case 8:
        ctx.drawImage(sprite, 119, 68, 16, 16, ...targetCoords);
        break;
    }
  }
};

const drawFieldContentOnContextMenuClick = (ctx, sprite, cellX, cellY) => {
  const targetX = cellX * cellSize + borderSize + edgeH;
  const targetY = cellY * cellSize + borderSize * 2 + edgeH + headerH;

  const targetCoords = [targetX, targetY, cellSize, cellSize];

  ctx.drawImage(sprite, 34, 51, 16, 16, ...targetCoords);
};

export { drawFieldContent, drawFieldContentOnContextMenuClick };
