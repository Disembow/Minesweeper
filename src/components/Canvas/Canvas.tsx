import { FC } from 'react';
import { options } from '../../scripts/game/gameOptions';
import { changeGameMode } from '../../scripts/render/render';

// interface ICanvas {
//   width: number;
//   height: number;
// }

const Canvas: FC = () => {
  const gameMode = changeGameMode() || 'beginner';

  const { cellsW, cellsH, mines } = options[gameMode];
  const { cellSize, borderSize, headerH, edgeH } = options.game;

  const width = cellsW * cellSize + borderSize + edgeH * 5 + 2;
  const height = cellsH * cellSize + borderSize * 3 + headerH + edgeH * 2;

  const canvas = <canvas className={'canvas'} width={width} height={height} />;

  return canvas;
};

export default Canvas;
