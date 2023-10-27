import { db } from '../../../app/db/db';
import { ButtonStateType, drawButton } from '../../../helpers/draw/drawControls';

export const handleMouseUp = (
  canvas: HTMLCanvasElement | null,
  sprite: HTMLImageElement | null,
) => {
  const isMouseDown = db.isMouseDown;

  if (isMouseDown && canvas && sprite) {
    drawButton(canvas, sprite, ButtonStateType.START);
  }

  db.isMouseDown = false;
};
