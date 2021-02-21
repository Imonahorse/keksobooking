const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const typeOfApartment = form.querySelector('#type');
const apartmentPrice = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');


const onTypeChange = (evt) => {
  switch (type.value) {
    case 'bungalow':
      apartmentPrice.placeholder = minPrice[type.value];
      apartmentPrice.min = minPrice[type.value];
      return;
    case'flat':
      apartmentPrice.placeholder = minPrice[type.value];
      apartmentPrice.min = minPrice[type.value];
      return;
    case 'house' :
      apartmentPrice.placeholder = minPrice[type.value];
      apartmentPrice.min = minPrice[type.value];
      return;
    case 'palace':
      apartmentPrice.placeholder = minPrice[type.value];
      apartmentPrice.min = minPrice[type.value];
      return;
  }
};


typeOfApartment.addEventListener('change', onTypeChange)

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
})

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
})



