const showPopupMenu = () => {
  const popup = document.querySelector('.modes__container');
  popup?.classList.add('modes__container_active');
};

const hidePopupMenu = () => {
  const popup = document.querySelector('.modes__container');
  popup?.classList.remove('modes__container_active');
};

const showResultsMenu = () => {
  const popup = document.querySelector('.results__popup');
  popup?.classList.add('results__popup_hidden');
};

export { showPopupMenu, hidePopupMenu, showResultsMenu };
