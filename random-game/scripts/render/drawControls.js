import { db } from '../db/db.js';
import { options } from '../game/options.js';

const { scoreboardH, smileSize, borderSize, headerH, cellSize, edgeH } = options.game;

const drawBoards = (canvas, ctx, sprite) => {
  const x = borderSize + headerH / 2 - scoreboardH / 2;
  const y = x;
  const sw = 14;
  const sh = 23.5;
  const k = sh / sw;
  const dw = 24;
  const dh = dw * k;
  const offset = 1.5;

  ctx.drawImage(sprite, 126, 0, sw, sh, x, y, dw, dh);
  ctx.drawImage(sprite, 126, 0, sw, sh, x + dw - offset - 0.5, y, dw, dh);
  ctx.drawImage(sprite, 126, 0, sw, sh, x + (dw - offset - 0.5) * 2, y, dw, dh);

  ctx.drawImage(sprite, 126, 0, sw, sh, canvas.width - x - dw, y, dw, dh);
  ctx.drawImage(sprite, 126, 0, sw, sh, canvas.width - x - (dw - offset) * 2, y, dw, dh);
  ctx.drawImage(sprite, 126, 0, sw, sh, canvas.width - x - (dw - offset - 0.5) * 3, y, dw, dh);
};

const drawField = (ctx, sprite) => {
  const { cellsW, cellsH } = options[db.gameMode];

  for (let i = 0; i < cellsW; i++) {
    for (let j = 0; j < cellsH; j++) {
      ctx.drawImage(
        sprite,
        0,
        50,
        16,
        16,
        borderSize + edgeH + cellSize * i,
        borderSize * 2 + headerH + edgeH + cellSize * j,
        cellSize,
        cellSize,
      );
    }
  }
};

const drawButton = (canvas, ctx, sprite, type) => {
  const x = canvas.width / 2 - smileSize / 2;
  const y = borderSize + headerH / 2 - smileSize / 2;

  ctx.clearRect(x, y, smileSize, smileSize);

  switch (type) {
    case 'start':
      ctx.drawImage(sprite, 0, 24, 26, 26, x, y, smileSize, smileSize);
      break;
    case 'click':
      ctx.drawImage(sprite, 54, 24, 26, 26, x, y, smileSize, smileSize);
      break;
    case 'win':
      ctx.drawImage(sprite, 81, 24, 26, 26, x, y, smileSize, smileSize);
      break;
    case 'lose':
      ctx.drawImage(sprite, 108, 24, 26, 26, x, y, smileSize, smileSize);
      break;
  }
};

const drawControls = (canvas, ctx, sprite) => {
  drawBoards(canvas, ctx, sprite);
  drawField(ctx, sprite);
  drawButton(canvas, ctx, sprite, 'start');
};

export { drawControls, drawButton, drawField };
