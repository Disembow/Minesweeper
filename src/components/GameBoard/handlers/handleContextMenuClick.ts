import { db } from '../../../app/db/db';
import { isVictoryGame, onWinAction, startGame } from '../../../helpers/gameActions/gameProcess';
import { getGameFieldCoords } from '../../../helpers/gameActions/getCoords';
import { ButtonStateType, drawButton } from '../../../helpers/draw/drawControls';
import {
  drawFieldContentOnContextMenuClick,
  drawMinesAmount,
} from '../../../helpers/draw/drawFieldContent';

export const handleContextMenuClick = (
  event: React.MouseEvent,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

  if (startGameTerms) {
    if (!db.game) {
      startGame(canvas, sprite);
    }

    drawFieldContentOnContextMenuClick(canvas, sprite, cellX, cellY);

    if (db.currentMines && db.isGameRuns) {
      if (db.game && db.game[cellY][cellX].flag) {
        db.currentMines--;
      } else {
        db.currentMines++;
      }

      drawMinesAmount(canvas, sprite, db.currentMines);
    }
  }

  if (isVictoryGame()) {
    drawButton(canvas, sprite, ButtonStateType.WIN);
    onWinAction();
  }
};
