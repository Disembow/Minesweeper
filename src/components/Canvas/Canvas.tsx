import { FC, useEffect, useRef, useState } from 'react';
import { options } from '../../scripts/game/gameOptions';
import { drawGameFieldBorders } from '../../scripts/render/drawGameFieldBorders';
import { loadSprites } from '../../scripts/sprites/loadSprites';
import { ButtonStateType, drawButton, drawControls } from '../../scripts/render/drawControls';
import { GameModes, db } from '../../scripts/db/db';
import {
  drawFieldContentOnContextMenuClick,
  drawMinesAmount,
} from '../../scripts/render/drawFieldContent';
import { getGameFieldCoords, getStartButtonCoords } from '../../scripts/helpers/getCoords';
import {
  isVictoryGame,
  onLoseAction,
  onWinAction,
  openCellsNearEmptyCell,
  openTargetCell,
  restartGame,
  startGame,
} from '../../scripts/game/gameProcess';

type CanvasStateType = {
  width: number;
  height: number;
};

interface ICanvas {
  gameMode: GameModes;
}

const Canvas: FC<ICanvas> = ({ gameMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasState, setCanvasState] = useState<CanvasStateType>();
  const [sprite, setSprite] = useState<HTMLImageElement>();

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

  const handleMouseDown = (
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

  const handleMouseUp = (canvas: HTMLCanvasElement, sprite: HTMLImageElement) => {
    const isMouseDown = db.isMouseDown;

    if (isMouseDown) {
      drawButton(canvas, sprite, ButtonStateType.START);
    }

    db.isMouseDown = false;
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
        setSprite(sprite);

        db.gameMode = gameMode; //!TODO: update
        db.currentMines = mines;

        drawGameFieldBorders(canvas);
        drawControls(canvas, sprite);
        drawMinesAmount(canvas, sprite, mines);

        document.onmouseup = () => handleMouseUp(canvas, sprite);
        document.oncontextmenu = (e: MouseEvent) => {
          if (e.target instanceof HTMLCanvasElement && e.target.classList.contains('canvas'))
            return false;
        };
      }
    };

    draw(canvas, mines);
  }, [gameMode]);

  return (
    <canvas
      className={'canvas'}
      ref={canvasRef}
      width={canvasState?.width}
      height={canvasState?.height}
      onMouseDown={(e: React.MouseEvent) => handleMouseDown(e, canvasRef.current!, sprite!)}
      onClick={(e) => handleClick(e, canvasRef.current!, sprite!)}
      onContextMenu={(e) => handleContextMenuClick(e, canvasRef.current!, sprite!)}
    />
  );
};

export default Canvas;
