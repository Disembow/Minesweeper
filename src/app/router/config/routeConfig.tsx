import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePaths } from './routes';
import Canvas from '../../../components/Canvas/Canvas';
import { GameModes } from '../../../scripts/db/db';
import HomePage from '../../../components/Main/HomePage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePage />,
  },
  [AppRoutes.BEGINNER]: {
    path: RoutePaths.beginner,
    element: <Canvas gameMode={GameModes.BEGINNER} />,
  },
  [AppRoutes.INTERMEDIATE]: {
    path: RoutePaths.intermediate,
    element: <Canvas gameMode={GameModes.INTERMEDIATE} />,
  },
  [AppRoutes.EXPERT]: {
    path: RoutePaths.expert,
    element: <Canvas gameMode={GameModes.EXPERT} />,
  },
  [AppRoutes.NIGHTMARE]: {
    path: RoutePaths.nightmare,
    element: <Canvas gameMode={GameModes.NIGHTMARE} />,
  },
  [AppRoutes.RESULTS]: {
    path: RoutePaths.results,
  },
};
