import { FC, useEffect, useRef, useState } from 'react';
import { options } from '../../scripts/game/gameOptions';
import { changeGameMode } from '../../scripts/render/render';

// interface ICanvas {
//   width: number;
//   height: number;
// }

type CanvasStateType = {
  width: number;
  height: number;
};

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasState, setCanvasState] = useState<CanvasStateType>();

  const draw = (ctx: CanvasRenderingContext2D | null) => {
    console.log(ctx);
  };

  useEffect(() => {
    const gameMode = changeGameMode() || 'beginner'; //! replace
    const { cellsW, cellsH } = options[gameMode];
    const { cellSize, borderSize, headerH, edgeH } = options.game;

    const width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
    const height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

    setCanvasState({ width, height });

    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    draw(context);
  }, []);

  return (
    <canvas
      className={'canvas'}
      ref={canvasRef}
      width={canvasState?.width}
      height={canvasState?.height}
    />
  );
};

export default Canvas;
