const loadSprites = (): Promise<HTMLImageElement> => {
  const sprite = new Image();
  sprite.src = './src/assets/sprites/minesweeper-sprites.png';

  return new Promise((resolve) => {
    sprite.onload = () => resolve(sprite);
  });
};

export { loadSprites };
