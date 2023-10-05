const loadSprites = () => {
  const sprite = new Image();
  sprite.src = './assets/sprites/minesweeper-sprites.png';
  sprite.addEventListener('load', () => {
    this.createGameHeader(sprite);
    this.sprite = sprite;
  });
};

export { loadSprites };
