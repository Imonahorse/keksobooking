const DATA_URL = 'https://22.javascript.pages.academy/keksoboo9king'

const getData = (onSuccess, onFail) => {
  fetch(`${DATA_URL}/data`)
    .then((response) => response.json())
    .then((markers) => onSuccess(markers))
    .catch(() => onFail())
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess()
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData}
