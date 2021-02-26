const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const TitleRange = {
  MIN: 30,
  MAX: 100,
}

const RoomValues = {
  ROOM: '100',
  PLACE: '0',
}

const pageForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const selects = mapForm.querySelectorAll('select');
const mapFildsets = mapForm.querySelectorAll('fieldset');
const pageFieldsets = pageForm.querySelectorAll('fieldset');
const title = pageForm.querySelector('#title');
const typeOfApartment = pageForm.querySelector('#type');
const apartmentPrice = pageForm.querySelector('#price');
const timeIn = pageForm.querySelector('#timein');
const timeOut = pageForm.querySelector('#timeout');
const roomNumber = pageForm.querySelector('#room_number');
const capacity = pageForm.querySelector('#capacity');
const address = pageForm.querySelector('#address');

address.readOnly = 'readonly';

const onRoomNumberChange = (evt) => {
  if (+(evt.target.value) < +(capacity.value)) {
    roomNumber.setCustomValidity('Количество комнат должно быть больше или равно количеству мест');
  } else if (evt.target.value === RoomValues.ROOM && capacity.value !== RoomValues.PLACE) {
    roomNumber.setCustomValidity(`Для ${RoomValues.ROOM} комнат количество мест должно быть "не для гостей"`);
  } else if (capacity.value === RoomValues.PLACE && evt.target.value !== RoomValues.ROOM) {
    roomNumber.setCustomValidity(`Количество комнат при выборе "не для гостей" должно быть ${RoomValues.ROOM}`);
  } else {
    roomNumber.setCustomValidity('');
  }
}

const blockPage = (toggle) => {
  selects.forEach((item) => item.disabled = toggle);
  mapFildsets.forEach((item) => item.disabled = toggle);
  pageFieldsets.forEach((item) => item.disabled = toggle);

  if (toggle === true) {
    pageForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  }
  if (toggle === false) {
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

title.minLength = TitleRange.MIN;
title.maxLength = TitleRange.MAX;

const onTitleInput = () => {
  const value = title.value.length
  if (value < TitleRange.MIN) {
    title.setCustomValidity(`Сообщение слишком короткое, не хватает еще ${TitleRange.MIN - value} символов`)
  } else if (value > TitleRange.max) {
    title.setCustomValidity(`Сообщение слишком длинное, уберите ${TitleRange.MAX - value} символа`)
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity()
}

typeOfApartment.addEventListener('change', onTypeChange);

timeIn.addEventListener('change', onSelectChange);

timeOut.addEventListener('change', onSelectChange);

title.addEventListener('input', onTitleInput);

roomNumber.addEventListener('change', onRoomNumberChange);

blockPage(true);

export {blockPage};

