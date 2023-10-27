import { db } from '../../app/db/db.ts';
import { options } from '../../app/db/gameOptions.ts';

enum ButtonStateType {
  START = 'start',
  CLICK = 'click',
  WIN = 'win',
  LOSE = 'lose',
}

const drawBoards = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  const { scoreboardH, borderSize, headerH } = options.game;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

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

const drawField = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  const { borderSize, headerH, cellSize, edgeH } = options.game;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

  if (db.gameMode) {
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
  }
};

const drawButton = (canvas: HTMLCanvasElement, sprite: HTMLImageElement, type: ButtonStateType) => {
  const { smileSize, borderSize, headerH } = options.game;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

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

const drawControls = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  drawBoards(canvas, sprite);
  drawField(canvas, sprite);
  drawButton(canvas, sprite, ButtonStateType.START);
};

export { ButtonStateType, drawControls, drawButton, drawField };
