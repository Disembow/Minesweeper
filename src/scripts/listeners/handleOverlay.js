const showOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('visible');
};

const hideOverlay = () => {
  document.querySelector('.overlay').classList.remove('visible');
};

const toggleOverlay = () => {
  document.querySelector('.overlay').classList.toggle('visible');
};

export { showOverlay, hideOverlay, toggleOverlay };
