import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import { options } from 'app/db/gameOptions';
import { drawGameFieldBorders } from 'helpers/draw/drawGameFieldBorders';
import { loadSprites } from 'helpers/sprites/loadSprites';
import { ButtonStateType, drawButton, drawControls } from 'helpers/draw/drawControls';
import { GameModes, db } from 'app/db/db';
import { drawFieldContentOnContextMenuClick, drawMinesAmount } from 'helpers/draw/drawFieldContent';
import { getGameFieldCoords, getStartButtonCoords } from 'helpers/gameActions/getCoords';
import {
  isVictoryGame,
  onLoseAction,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from 'helpers/gameActions/gameProcess';
import cls from './GameBoard.module.scss';

type GameBoardStateType = {
  width: number;
  height: number;
};

interface IGameBoard {
  gameMode: GameModes;
}

const GameBoard: FC<IGameBoard> = ({ gameMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasState, setCanvasState] = useState<GameBoardStateType>();
  const [sprite, setSprites] = useState<HTMLImageElement>();

  useEffect(() => {
    const { cellsW, cellsH, mines } = options[gameMode];
    const { cellSize, borderSize, headerH, edgeH } = options.game;

    const width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
    const height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

    setCanvasState({ width, height });

    const canvas = canvasRef.current;

    const draw = async (canvas: HTMLCanvasElement | null, mines: number) => {
      if (canvas) {
        const sprite = await loadSprites();
        setSprites(sprite);

        db.gameMode = gameMode;
        db.currentMines = mines;

        drawGameFieldBorders(canvas);
        drawControls(canvas, sprite);
        drawMinesAmount(canvas, sprite, mines);

        document.addEventListener('mouseup', () => handleMouseUp(canvas, sprite));
      }
    };

    draw(canvas, mines);

    if (sprite) return document.removeEventListener('mouseup', () => handleMouseUp(canvas, sprite));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode]);

  const handleClick = (event: MouseEvent, canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
    const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);
    const restartGameTrems = getStartButtonCoords(event, canvas);

    if (startGameTerms) {
      if (!db.game) startGame(canvas, sprite);

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

    if (restartGameTrems) restartGame(canvas, sprite);
  };

  const handleContextMenuClick = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    sprite: HTMLImageElement,
  ) => {
    const { startGameTerms, cellX, cellY } = getGameFieldCoords(event, canvas);

    if (startGameTerms) {
      if (!db.game) startGame(canvas, sprite);

      drawFieldContentOnContextMenuClick(canvas, sprite, cellX, cellY);

      if (db.currentMines && db.isGameRuns) {
        db.game && db.game[cellY][cellX].flag ? db.currentMines-- : db.currentMines++;

        drawMinesAmount(canvas, sprite, db.currentMines);
      }
    }

    if (isVictoryGame()) {
      drawButton(canvas, sprite, ButtonStateType.WIN);
      onWinAction();
    }
  };

  const handleMouseDown = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    sprite: HTMLImageElement,
  ) => {
    const coordsTerms = getStartButtonCoords(event, canvas);

    if (coordsTerms) {
      db.isMouseDown = true;
      drawButton(canvas, sprite, ButtonStateType.CLICK);
    }
  };

  const handleMouseUp = (canvas: HTMLCanvasElement | null, sprite: HTMLImageElement | null) => {
    if (db.isMouseDown && canvas && sprite) drawButton(canvas, sprite, ButtonStateType.START);

    db.isMouseDown = false;
  };

  return (
    <canvas
      className={cls.canvas}
      ref={canvasRef}
      width={canvasState?.width}
      height={canvasState?.height}
      onMouseDown={(e) => handleMouseDown(e, canvasRef.current!, sprite!)}
      onClick={(e) => handleClick(e, canvasRef.current!, sprite!)}
      onContextMenu={(e) => handleContextMenuClick(e, canvasRef.current!, sprite!)}
    />
  );
};

export default GameBoard;
