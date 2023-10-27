import { db } from '../../../scripts/db/db';
import { getStartButtonCoords } from '../../../scripts/helpers/getCoords';
import { ButtonStateType, drawButton } from '../../../scripts/render/drawControls';

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
