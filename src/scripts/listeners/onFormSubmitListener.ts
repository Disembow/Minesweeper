import { handleUsernameForm } from './handleMouseEvents.ts';

const onFormSubmitListener = () => {
  const form = document.forms[0];
  form.onsubmit = handleUsernameForm;

  const submitButton = document.querySelector('.button__submit');
  if (submitButton instanceof HTMLButtonElement) submitButton.onclick = handleUsernameForm;
};

export { onFormSubmitListener };
