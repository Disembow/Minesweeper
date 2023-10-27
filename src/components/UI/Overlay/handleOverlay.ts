const showOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay?.classList.add('visible');
};

const hideOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay?.classList.remove('visible');
};

const toggleOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay?.classList.toggle('visible');
};

export { showOverlay, hideOverlay, toggleOverlay };
