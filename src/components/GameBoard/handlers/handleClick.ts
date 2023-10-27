import { db } from '../../../scripts/db/db';
import {
  onLoseAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from '../../../scripts/game/gameProcess';
import { getGameFieldCoords, getStartButtonCoords } from '../../../scripts/helpers/getCoords';
import { ButtonStateType, drawButton } from '../../../scripts/render/drawControls';

export const handleClick = (
  event: React.MouseEvent,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
  const restartGameTrems = getStartButtonCoords(event, canvas);

  if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, sprite);
    }

    if (db.game && db.isGameRuns) {
      const targetCell = db.game[cellY][cellX];
      if (!targetCell.flag && !targetCell.isOpen) {
        openTargetCell(canvas, sprite, cellX, cellY);

        if (targetCell.isMine) {
          drawButton(canvas, sprite, ButtonStateType.LOSE);
          onLoseAction(canvas, sprite);
        }

        if (targetCell.minesAround === 0 && !targetCell.isMine) {
          openCellsNearEmptyCell(canvas, sprite, targetCell);
        }
      }
    }
  }

  if (restartGameTrems) {
    restartGame(canvas, sprite);
  }
};
