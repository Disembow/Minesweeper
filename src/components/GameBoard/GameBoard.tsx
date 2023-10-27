import { FC, useEffect, useRef, useState } from 'react';
import { options } from '../../scripts/game/gameOptions';
import { drawGameFieldBorders } from '../../scripts/render/drawGameFieldBorders';
import { loadSprites } from '../../scripts/sprites/loadSprites';
import { drawControls } from '../../scripts/render/drawControls';
import { GameModes, db } from '../../scripts/db/db';
import { drawMinesAmount } from '../../scripts/render/drawFieldContent';
import { handleClick } from './handlers/handleClick';
import { handleMouseDown } from './handlers/handleMouseDown';
import { handleMouseUp } from './handlers/handleMouseUp';
import { handleContextMenuClick } from './handlers/handleContextMenuClick';

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
  const [sprite, setSprite] = useState<HTMLImageElement>();

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

export default GameBoard;
