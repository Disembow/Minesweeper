import { FC } from 'react';
import cls from './RankingPage.module.scss';

interface IRankingPage {}

const ResultsPage: FC<IRankingPage> = () => {
  return <div className={cls.RankingPage}>Ranking Page!</div>;
};

export default ResultsPage;
