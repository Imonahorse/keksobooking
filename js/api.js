const getData = (onSuccess) => {

  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((markers) => {
      onSuccess(markers)
    });
}


const sendData = (onSuccess, onFail, body) => {

  fetch('https://22.javascript.pages.academy/keksobooking',
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
    .catch((err) => {
      onFail();
      console.error(err);
    });
};

export {getData, sendData}
