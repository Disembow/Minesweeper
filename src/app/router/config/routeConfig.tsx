import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePaths } from './routes';
import { GameModes } from '../../db/db';
import { HomePageAsync } from '../../../components/pages/HomePage/HomePageAsync';
import { GameBoardAsync } from '../../../components/GameBoard/GameBoardAsync';
import { RankingPageAsync } from '../../../components/pages/HomePage/ResultsPage/RankingPageAsync';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePageAsync />,
  },
  [AppRoutes.BEGINNER]: {
    path: RoutePaths.beginner,
    element: <GameBoardAsync gameMode={GameModes.BEGINNER} />,
  },
  [AppRoutes.INTERMEDIATE]: {
    path: RoutePaths.intermediate,
    element: <GameBoardAsync gameMode={GameModes.INTERMEDIATE} />,
  },
  [AppRoutes.EXPERT]: {
    path: RoutePaths.expert,
    element: <GameBoardAsync gameMode={GameModes.EXPERT} />,
  },
  [AppRoutes.NIGHTMARE]: {
    path: RoutePaths.nightmare,
    element: <GameBoardAsync gameMode={GameModes.NIGHTMARE} />,
  },
  [AppRoutes.RESULTS]: {
    path: RoutePaths.results,
    element: <RankingPageAsync />,
  },
};
