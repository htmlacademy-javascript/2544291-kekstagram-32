import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') || evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('keydown', onEscKeydown);
  document.body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
