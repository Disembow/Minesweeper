import { db } from '../db/db.js';
import { options } from '../game/options.js';

const { scoreboardH, smileSize, borderSize, headerH, cellSize, edgeH } = options.game;

const drawStartGameButton = (canvas, ctx, sprite) => {
  const x = canvas.width / 2 - smileSize / 2;
  const y = borderSize + headerH / 2 - smileSize / 2;

  ctx.clearRect(x, y, smileSize, smileSize);
  ctx.drawImage(sprite, 0, 24, 26, 26, x, y, smileSize, smileSize);
};

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
        17,
        17,
        borderSize + edgeH + cellSize * i,
        borderSize * 2 + headerH + edgeH + cellSize * j,
        cellSize,
        cellSize,
      );
    }
  }
};

const drawControls = (canvas, ctx, sprite) => {
  drawStartGameButton(canvas, ctx, sprite);
  drawBoards(canvas, ctx, sprite);
  drawField(ctx, sprite);
};

//TODO: join into one function
const drawStartGameButtonOnClick = (canvas, ctx, sprite) => {
  const x = canvas.width / 2 - smileSize / 2;
  const y = borderSize + headerH / 2 - smileSize / 2;

  ctx.clearRect(x, y, smileSize, smileSize);
  ctx.drawImage(sprite, 54, 24, 26, 26, x, y, smileSize, smileSize);
};

const drawWinStateButton = (canvas, ctx, sprite) => {
  const x = canvas.width / 2 - smileSize / 2;
  const y = borderSize + headerH / 2 - smileSize / 2;

  ctx.clearRect(x, y, smileSize, smileSize);
  ctx.drawImage(sprite, 81, 24, 26, 26, x, y, smileSize, smileSize);
};

const drawLoseStateButton = (canvas, ctx, sprite) => {
  const x = canvas.width / 2 - smileSize / 2;
  const y = borderSize + headerH / 2 - smileSize / 2;

  ctx.clearRect(x, y, smileSize, smileSize);
  ctx.drawImage(sprite, 108, 24, 26, 26, x, y, smileSize, smileSize);
};

export {
  drawControls,
  drawStartGameButtonOnClick,
  drawStartGameButton,
  drawField,
  drawWinStateButton,
  drawLoseStateButton,
};
