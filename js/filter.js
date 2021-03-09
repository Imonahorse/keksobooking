import {resetMarkers, renderMarkers, resetMap} from './map.js';
import {mapForm} from './form.js';

const DEFAULT_HOUSE_TYPE = 'any';
const Default_House_Price = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
}

const housingType = mapForm.querySelector('#housing-type');
const housingPrice = mapForm.querySelector('#housing-price');
const housingRooms = mapForm.querySelector('#housing-rooms');
const housingGuests = mapForm.querySelector('#housing-guests');
const filterWifi = mapForm.querySelector('#filter-wifi');
const filterDishwasher = mapForm.querySelector('#filter-dishwasher');
const filterParking = mapForm.querySelector('#filter-parking');
const filterWasher = mapForm.querySelector('#filter-washer');
const filterElevator = mapForm.querySelector('#filter-elevator');
const filterConditioner = mapForm.querySelector('#filter-conditioner');

const filterType = (data) => {
  if (housingType.value === DEFAULT_HOUSE_TYPE) {
    return data;
  }

  return data.filter((item) => item.offer.type === housingType.value);
};

const filterPrice = (data) => {
  if (housingPrice.value === DEFAULT_HOUSE_TYPE) {
    return data;
  }
  if (housingPrice.value === Default_House_Price.LOW) {
    return data.filter((item) => item.offer.price < 10000);
  }
  if (housingPrice.value === Default_House_Price.MIDDLE) {
    return data.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000);
  }
  if (housingPrice.value === Default_House_Price.HIGH) {
    return data.filter((item) => item.offer.price > 50000);
  }
};

const filterRooms = (data) => {
  if (housingRooms.value === DEFAULT_HOUSE_TYPE) {
    return data;
  }
  return data.filter((item) => item.offer.rooms == housingRooms.value);
};

const filterGuests = (data) => {
  if (housingGuests.value === DEFAULT_HOUSE_TYPE) {
    return data;
  }
  return data.filter((item) => item.offer.guests == housingGuests.value);
};

const filterCheckbox = (data, checkbox) => {
  const dataAfterFilter = [];

  if (checkbox.checked === false) {
    return data;
  }

  if (checkbox.checked) {
    data.forEach((item) => {

      item.offer.features.forEach((element) => {
        if (element === checkbox.value) {
          dataAfterFilter.push(item);
        }
      })
    })
  }
  return dataAfterFilter;
};

const updateMarkers = (data) => {
  resetMarkers();
  resetMap();
  const dataType = filterType(data);
  const dataPrice = filterPrice(dataType);
  const dataRooms = filterRooms(dataPrice);
  const dataGuests = filterGuests(dataRooms);
  const dataCheckboxWifi = filterCheckbox(dataGuests, filterWifi);
  const dataCheckboxDishwasher = filterCheckbox(dataCheckboxWifi, filterDishwasher);
  const dataCheckboxParking = filterCheckbox(dataCheckboxDishwasher, filterParking);
  const dataCheckboxWasher = filterCheckbox(dataCheckboxParking, filterWasher);
  const dataCheckboxElevator = filterCheckbox(dataCheckboxWasher, filterElevator);
  const dataCheckboxConditioner = filterCheckbox(dataCheckboxElevator, filterConditioner);
  renderMarkers(dataCheckboxConditioner);
};

const setFilterListener = (cb) => {
  mapForm.addEventListener('change', cb);
};

export {setFilterListener, updateMarkers}
