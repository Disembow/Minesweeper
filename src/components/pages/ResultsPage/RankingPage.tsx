import { FC, useEffect, useState } from 'react';
import cls from './RankingPage.module.scss';
import { getGameTopResults } from 'helpers/gameActions/localStorage';
import { RawDataType } from 'helpers/gameActions/gameProcess';
import { GameModes } from 'app/db/db';

interface IRankingPage {}

const ResultsPage: FC<IRankingPage> = () => {
  const [topResults, setTopResults] = useState<RawDataType | null>(null);

  useEffect(() => {
    const data = getGameTopResults();
    setTopResults(data);
  }, []);

  const renderTopResultsByMode = (mode: GameModes) => {
    if (topResults) {
      return (
        <>
          <tr>
            <td className={cls.subtable} colSpan={4}>
              {mode}
            </td>
          </tr>
          {topResults[mode].map((r, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.name}</td>
                <td>{r.time}</td>
                <td>{r.date ? new Date(r.date).toLocaleDateString() : 'N/A'}</td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  const renderTable = () => {
    return Object.values(GameModes).map((mode) => {
      return <tbody key={mode}>{renderTopResultsByMode(mode)}</tbody>;
    });
  };

  return (
    <div className={cls.RankingPage}>
      <h3 className={cls.results__title}>Top results</h3>
      <table className={cls.table}>
        <thead>
          <tr>
            <th className={cls.table__number}>#</th>
            <th className={cls.table__name}>Name</th>
            <th className={cls.table__time}>Time, sec</th>
            <th className={cls.table__date}>Date</th>
          </tr>
        </thead>
        {renderTable()}
      </table>
    </div>
  );
};

export default ResultsPage;
