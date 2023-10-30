import cls from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={cls.HomePage}>
      <h3 className={cls.title}>About game</h3>
      <p className={cls.text}>
        Minesweeper is a logic puzzle game. The game features a grid of clickable tiles, with hidden
        "mines" (depicted as naval mines in the original game) scattered throughout the board.
      </p>
      <h3 className={cls.title}>Rules</h3>
      <p className={cls.text}>
        Minesweeper rules are very simple. The board is divided into cells, with mines randomly
        distributed. To win, you need to open all the cells. The number on a cell shows the number
        of mines adjacent to it. Using this information, you can determine cells that are safe, and
        cells that contain mines. Cells suspected of being mines can be marked with a flag using the
        right mouse button.
      </p>
      <h3 className={cls.title}>Playing styles</h3>
      <p className={cls.text}>
        Despite the simple rules, there are many ways to play minesweeper. There is something for
        everyone: play to be the fastest, try to complete the most difficult boards, or just enjoy
        the logic. There are leaderboards for many different categories.
      </p>
    </div>
  );
};

export default HomePage;
