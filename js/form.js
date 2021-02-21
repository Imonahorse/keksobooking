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
  apartmentPrice.placeholder = minPrice[evt.target.value];
  apartmentPrice.min = minPrice[evt.target.value];
};

typeOfApartment.addEventListener('change', onTypeChange)

const onSelectChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

timeIn.addEventListener('change', onSelectChange);
timeOut.addEventListener('change', onSelectChange);

