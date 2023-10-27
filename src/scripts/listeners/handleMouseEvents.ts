import { db } from '../../app/db/db.ts';
import { getGameFieldCoords, getStartButtonCoords } from '../../helpers/gameActions/getCoords.ts';
import {
  setGameModeToLocalStorage,
  setUserNameToLocalStorage,
} from '../../helpers/gameActions/localStorage.ts';
import { ButtonStateType, drawButton } from '../../helpers/draw/drawControls.ts';
import {
  drawFieldContentOnContextMenuClick,
  drawMinesAmount,
} from '../../helpers/draw/drawFieldContent.ts';
import { renderTopListItems } from '../render/render.ts';
import {
  isVictoryGame,
  onLoseAction,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from '../../helpers/gameActions/gameProcess.ts';
import { defineCanvas } from '../render/defineCanvas.ts';
import {
  hideOverlay,
  showOverlay,
  toggleOverlay,
} from '../../components/UI/Overlay/handleOverlay.ts';
import {
  hidePopupMenu,
  showResultsMenu,
} from '../../components/GameBoard/handlers/handlePopupMenu.ts';

const handleMouseDown = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
) => {
  const coordsTerms = getStartButtonCoords(event, canvas);

  if (coordsTerms) {
    db.isMouseDown = true;
    drawButton(canvas, sprite, ButtonStateType.CLICK);
  }
};

const handleMouseUp = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
  const isMouseDown = db.isMouseDown;

  if (isMouseDown) {
    drawButton(canvas, sprite, ButtonStateType.START);
  }

  db.isMouseDown = false;
};

const handleClick = (
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

const handleContextMenuClick = (
  event: React.MouseEvent,
  canvas: HTMLCanvasElement,
  sprite: HTMLImageElement,
) => {
  const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

  if (startGameTerms && !db.game) {
    startGame(canvas, sprite);
  }

  drawFieldContentOnContextMenuClick(canvas, sprite, cellX, cellY);

  if (db.currentMines) {
    if (db.game && db.game[cellY][cellX].flag) {
      db.currentMines--;
    } else {
      db.currentMines++;
    }

    drawMinesAmount(canvas, sprite, db.currentMines);
  }

  if (isVictoryGame()) {
    drawButton(canvas, sprite, ButtonStateType.WIN);
    onWinAction();
  }
};

const handleResultsTable = () => {
  showOverlay();

  const popup = document.querySelector('.results__popup');
  popup?.classList.remove('results__popup_hidden');

  renderTopListItems();
};

const handleOverlayClick = () => {
  toggleOverlay();
  showResultsMenu();
  hidePopupMenu();
};

const handleUsernameForm = (e: SubmitEvent) => {
  e.preventDefault();
  const username = document.forms[0].username.value;
  setUserNameToLocalStorage(username);
};

const modesHandler = (e: MouseEvent) => {
  if (
    e.target instanceof HTMLElement &&
    e.target.classList.contains('modes__item') &&
    !e.target.classList.contains('results')
  ) {
    document.querySelector('.active')?.classList.remove('active');

    e.target.classList.add('active');

    const newMode = e.target.textContent?.toLowerCase();
    setGameModeToLocalStorage(newMode);

    const canvas = document.querySelector('.canvas');
    canvas?.remove();
    defineCanvas();

    hideOverlay();
  }

  const container = document.querySelector('.modes__container_active');
  container?.classList.remove('modes__container_active');
};

export {
  handleClick,
  handleMouseDown,
  handleMouseUp,
  handleContextMenuClick,
  handleResultsTable,
  handleOverlayClick,
  handleUsernameForm,
  modesHandler,
};
