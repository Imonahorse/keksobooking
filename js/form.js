const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const pageForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const selects = mapForm.querySelectorAll('select');
const mapFildsets = mapForm.querySelectorAll('fieldset');
const pageFieldsets = pageForm.querySelectorAll('fieldset');
const typeOfApartment = pageForm.querySelector('#type');
const apartmentPrice = pageForm.querySelector('#price');
const timeIn = pageForm.querySelector('#timein');
const timeOut = pageForm.querySelector('#timeout');

const blockPage = (toggle) => {
  selects.forEach((item) => item.disabled = toggle);
  mapFildsets.forEach((item) => item.disabled = toggle);
  pageFieldsets.forEach((item) => item.disabled = toggle);

  if(toggle === true) {
    pageForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
  if(toggle === false) {
    pageForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
}

const onTypeChange = (evt) => {
  apartmentPrice.placeholder = minPrice[evt.target.value];
  apartmentPrice.min = minPrice[evt.target.value];
};

const onSelectChange = (evt) => {

  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

typeOfApartment.addEventListener('change', onTypeChange)
timeIn.addEventListener('change', onSelectChange);
timeOut.addEventListener('change', onSelectChange);

blockPage(true);

export {blockPage};
