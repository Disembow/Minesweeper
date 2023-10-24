import { options } from '../game/gameOptions.js';
import { BORDER_COLOR_BRIGHT, BORDER_COLOR_SHADOWED, MAIN_BG_COLOR } from '../game/variables.js';

const drawGameFieldBorders = (canvas) => {
  const ctx = canvas.getContext('2d');

  const { borderSize, headerH, edgeH } = options.game;
  const fullBorderW = borderSize + edgeH;

  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = MAIN_BG_COLOR;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0 + edgeH, canvas.height - edgeH);
  ctx.lineTo(0 + edgeH, 0 + edgeH);
  ctx.lineTo(canvas.width - edgeH, 0 + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(edgeH, canvas.height - edgeH);
  ctx.lineTo(canvas.width - edgeH, canvas.height - edgeH);
  ctx.lineTo(canvas.width - edgeH, edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, borderSize);
  ctx.lineTo(borderSize, borderSize);
  ctx.lineTo(borderSize, borderSize + headerH);
  ctx.lineTo(fullBorderW, borderSize + headerH - edgeH);
  ctx.lineTo(fullBorderW, fullBorderW);
  ctx.lineTo(canvas.width - borderSize - edgeH, fullBorderW);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, borderSize);
  ctx.lineTo(canvas.width - borderSize, borderSize + headerH);
  ctx.lineTo(borderSize, borderSize + headerH);
  ctx.lineTo(fullBorderW, borderSize + headerH - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, borderSize + headerH - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, fullBorderW);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();

  const gameFieldY = borderSize * 2 + headerH;

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, gameFieldY);
  ctx.lineTo(borderSize, gameFieldY);
  ctx.lineTo(borderSize, canvas.height - borderSize);
  ctx.lineTo(fullBorderW, canvas.height - borderSize - edgeH);
  ctx.lineTo(fullBorderW, gameFieldY + edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, gameFieldY + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_SHADOWED;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width - borderSize, gameFieldY);
  ctx.lineTo(canvas.width - borderSize, canvas.height - borderSize);
  ctx.lineTo(borderSize, canvas.height - borderSize);
  ctx.lineTo(fullBorderW, canvas.height - borderSize - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, canvas.height - borderSize - edgeH);
  ctx.lineTo(canvas.width - borderSize - edgeH, gameFieldY + edgeH);
  ctx.closePath();
  ctx.fillStyle = BORDER_COLOR_BRIGHT;
  ctx.fill();
};

export { drawGameFieldBorders };
