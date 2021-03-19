import {isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);
const errorTextPlace = successMessage.querySelector('.success__message');
const errorText = 'Не удалось получить данные с сервера, попробуйте попытку позже';

const onMessageKeydown = (message) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      removeMessage(message);
    }
  }
}

const onMessageClick = (message) => {
  return () => {
    removeMessage(message);
  }
}

const removeMessage = (message) => {
  message.remove();
  message.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageKeydown);
}

const showMessage = (message) => {
  document.body.appendChild(message);
  message.style.zIndex = '99999';
  document.addEventListener('keydown', onMessageKeydown(message));
  message.addEventListener('click', onMessageClick(message));
};

const showSuccessMessage = () => showMessage(successMessage);
const showFailMessage = () => showMessage(errorMessage);
const showErrorMessage = () => {
  showErrorMessage();
  errorTextPlace.textContent = errorText;
}

export {showSuccessMessage, showFailMessage, showErrorMessage}
