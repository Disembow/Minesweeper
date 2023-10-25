const options = {
  beginner: {
    mines: 10,
    cellsW: 10,
    cellsH: 10,
  },
  intermediate: {
    mines: 40,
    cellsW: 16,
    cellsH: 16,
  },
  expert: {
    mines: 99,
    cellsW: 30,
    cellsH: 16,
  },
  nightmare: {
    mines: 199,
    cellsW: 45,
    cellsH: 17,
  },
  game: {
    cellSize: 30,
    borderSize: 12,
    headerH: 60,
    scoreboardW: 70,
    scoreboardH: 40,
    smileSize: 40,
    edgeH: 3,
  },
};

Object.freeze(options);

export { options };
