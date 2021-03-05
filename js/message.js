const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');
const map = document.querySelector('.map');

const showSuccessMessage = () => {
  const message = successTemplate.cloneNode(true);

  const onMessageClick = (evt) => {
    if (evt.key === 'Esc') {
      message.remove();
    } else {
      message.remove();
    }
  }

  window.addEventListener('keydown', onMessageClick);
  window.addEventListener('click', onMessageClick);

  map.style.zIndex = '0';
  main.appendChild(message);
}

const showFailMessage = () => {
  const message = errorTemplate.cloneNode(true);
  const button = message.querySelector('.error__button');

  const onMessageClick = (evt) => {
    if (evt.key === 'Esc') {
      message.remove();
    } else {
      message.remove();
    }
  }

  button.addEventListener('click', onMessageClick);
  window.addEventListener('keydown', onMessageClick)
  window.addEventListener('click', onMessageClick)

  map.style.zIndex = '0';
  main.appendChild(message)
};

const showDataMessage = () => {
  const message = successTemplate.cloneNode(true);
  const errorText = message.querySelector('.success__message');
  errorText.innerHTML = 'Произошла ошибка,</br> попробуйте снова позже';

  const onMessageClick = (evt) => {
    if (evt.key === 'Esc') {
      message.remove();
    } else {
      message.remove();
    }
  }

  window.addEventListener('keydown', onMessageClick);
  window.addEventListener('click', onMessageClick);

  map.style.zIndex = '0';
  main.appendChild(message);
}


export {showSuccessMessage, showFailMessage, showDataMessage}
