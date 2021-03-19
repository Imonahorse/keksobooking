import {sendData} from './api.js';
import {showSuccessMessage, showFailMessage} from './message.js';
import {resetMarker, resetMap, resetMarkers, renderMarkers} from './map.js';
import {clearPreview} from './picture-upload.js';

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const TitleRange = {
  MIN: 30,
  MAX: 100,
};
const RoomValues = {
  ROOM: '100',
  PLACE: '0',
};

const pageForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const selects = document.querySelectorAll('select');
const fieldsets = document.querySelectorAll('fieldset');
const title = pageForm.querySelector('#title');
const typeOfApartment = pageForm.querySelector('#type');
const apartmentPrice = pageForm.querySelector('#price');
const timeIn = pageForm.querySelector('#timein');
const timeOut = pageForm.querySelector('#timeout');
const roomNumber = pageForm.querySelector('#room_number');
const capacity = pageForm.querySelector('#capacity');
const address = pageForm.querySelector('#address');
const resetButton = pageForm.querySelector('.ad-form__reset');

const onRoomNumberChange = () => {
  if (+roomNumber.value < +capacity.value) {
    roomNumber.setCustomValidity('Количество комнат должно быть больше или равно количеству мест');
  } else if (roomNumber.value === RoomValues.ROOM && capacity.value !== RoomValues.PLACE) {
    roomNumber.setCustomValidity(`Для ${RoomValues.ROOM} комнат количество мест должно быть "не для гостей"`);
  } else if (capacity.value === RoomValues.PLACE && roomNumber.value !== RoomValues.ROOM) {
    roomNumber.setCustomValidity(`Количество комнат при выборе "не для гостей" должно быть ${RoomValues.ROOM}`);
  } else {
    roomNumber.setCustomValidity('');
  }
}

const blockPage = (toggle) => {
  selects.forEach((item) => item.disabled = toggle);
  fieldsets.forEach((item) => item.disabled = toggle);

  if (toggle === true) {
    pageForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    pageForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }
}

const onTypeChange = () => {
  apartmentPrice.placeholder = minPrice[typeOfApartment.value];
  apartmentPrice.min = minPrice[typeOfApartment.value];
};

const onSelectChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

const onTitleChange = () => {
  const value = title.value.length
  if (value < TitleRange.MIN) {
    title.setCustomValidity(`Сообщение слишком короткое, не хватает еще ${TitleRange.MIN - value} символов`)
  } else if (value > TitleRange.max) {
    title.setCustomValidity(`Сообщение слишком длинное, уберите ${TitleRange.MAX - value} символа`)
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
}

const setPageToDefault = (data) => {
  pageForm.reset();
  mapForm.reset();
  clearPreview();
  resetMarker();
  resetMap();
  resetMarkers();
  renderMarkers(data);
}

const handleFormSubmit = (data) => {
  showSuccessMessage();
  mapForm.reset();
  pageForm.reset();
  clearPreview();
  resetMarker();
  resetMap();
  clearPreview();
  resetMarkers();
  renderMarkers(data);
}

const handleFormFail = () => {
  showFailMessage();
  resetMarker();
  resetMap();
}

typeOfApartment.addEventListener('change', onTypeChange);

timeIn.addEventListener('change', onSelectChange);

timeOut.addEventListener('change', onSelectChange);

title.addEventListener('change', onTitleChange);

roomNumber.addEventListener('change', onRoomNumberChange);

capacity.addEventListener('change', onRoomNumberChange);

const clickOnResetButton = (data) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setPageToDefault(data);
  });
}

const setPageFormSubmit = (data) => {
  pageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(() => handleFormSubmit(data),
      handleFormFail,
      formData)
  });
};

title.minLength = TitleRange.MIN;
title.maxLength = TitleRange.MAX;
address.readOnly = 'readonly';
onTypeChange();
onRoomNumberChange();

export {blockPage, setPageFormSubmit, handleFormFail, clickOnResetButton};
