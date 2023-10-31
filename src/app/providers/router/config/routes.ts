export enum AppRoutes {
  HOME = 'home',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  NIGHTMARE = 'nightmare',
  RESULTS = 'results',
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.BEGINNER]: '/beginner',
  [AppRoutes.INTERMEDIATE]: '/intermediate',
  [AppRoutes.EXPERT]: '/expert',
  [AppRoutes.NIGHTMARE]: '/nightmare',
  [AppRoutes.RESULTS]: '/results',
  [AppRoutes.NOT_FOUND]: '*',
};
