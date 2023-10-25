const showPreloader = (canvas: HTMLCanvasElement): void => {
  const preloader = <HTMLDivElement>document.querySelector('.preloader');
  preloader.classList.remove('preloader_done');

  preloader.style.width = `${canvas.width}px`;
  preloader.style.height = `${canvas.height}px`;
};

const hidePreloader = (): void => {
  const preloader = <HTMLDivElement>document.querySelector('.preloader');
  preloader.classList.add('preloader_done');
};

export { showPreloader, hidePreloader };
