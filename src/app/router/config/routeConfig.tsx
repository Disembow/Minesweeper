import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePaths } from './routes';
import GameBoard from '../../../components/GameBoard/GameBoard';
import { GameModes } from '../../db/db';
import HomePage from '../../../components/pages/HomePage/HomePage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePage />,
  },
  [AppRoutes.BEGINNER]: {
    path: RoutePaths.beginner,
    element: <GameBoard gameMode={GameModes.BEGINNER} />,
  },
  [AppRoutes.INTERMEDIATE]: {
    path: RoutePaths.intermediate,
    element: <GameBoard gameMode={GameModes.INTERMEDIATE} />,
  },
  [AppRoutes.EXPERT]: {
    path: RoutePaths.expert,
    element: <GameBoard gameMode={GameModes.EXPERT} />,
  },
  [AppRoutes.NIGHTMARE]: {
    path: RoutePaths.nightmare,
    element: <GameBoard gameMode={GameModes.NIGHTMARE} />,
  },
  [AppRoutes.RESULTS]: {
    path: RoutePaths.results,
  },
};
