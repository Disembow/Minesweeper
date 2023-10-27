import { db } from '../../../app/db/db';
import { getStartButtonCoords } from '../../../helpers/gameActions/getCoords';
import { ButtonStateType, drawButton } from '../../../helpers/draw/drawControls';

export const handleMouseDown = (
  event: React.MouseEvent,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
) => {
  const coordsTerms = getStartButtonCoords(event, canvas);

  if (coordsTerms) {
    db.isMouseDown = true;
    drawButton(canvas, sprite, ButtonStateType.CLICK);
  }
};
