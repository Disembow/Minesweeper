const showPopupMenu = () => {
  document.querySelector('.modes__container').classList.add('modes__container_active');
};

const hidePopupMenu = () => {
  document.querySelector('.modes__container').classList.remove('modes__container_active');
};

const showResultsMenu = () => {
  document.querySelector('.results__popup').classList.add('results__popup_hidden');
};

export { showPopupMenu, hidePopupMenu, showResultsMenu };
