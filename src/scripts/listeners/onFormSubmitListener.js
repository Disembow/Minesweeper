import { handleUsernameForm } from './handleMouseEvents.js';

const onFormSubmitListener = () => {
  const form = document.forms[0];
  form.onsubmit = handleUsernameForm;

  const submitButton = document.querySelector('.button__submit');
  submitButton.onclick = handleUsernameForm;
};

export { onFormSubmitListener };
