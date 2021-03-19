/* global _:readonly */
import {resetMarkers, renderMarkers, resetMap} from './map.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const Filter_Count = {
  START: 0,
  FINISH: 10,
};
const Price_Value = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
}
const Price_Range = {
  MIN: 10000,
  MAX: 50000,
}

const mapForm = document.querySelector('.map__filters');
const housingType = mapForm.querySelector('#housing-type');
const housingPrice = mapForm.querySelector('#housing-price');
const housingRooms = mapForm.querySelector('#housing-rooms');
const housingGuests = mapForm.querySelector('#housing-guests');

const filterType = (marker) => {
  if (housingType.value === DEFAULT_VALUE || housingType.value === marker.offer.type) {
    return true
  }
  return false
};

const filterRooms = (marker) => {
  if (housingRooms.value === DEFAULT_VALUE || marker.offer.rooms == housingRooms.value) {
    return true;
  }
  return false;
};

const filterGuests = (marker) => {
  if (housingGuests.value === DEFAULT_VALUE || marker.offer.guests == housingGuests.value) {
    return true;
  }
  return false;
};

const filterPrice = (marker) => {
  const filterPriceValue = {
    low: marker.offer.price < Price_Range.MIN && Price_Value.LOW,
    middle: marker.offer.price >= Price_Range.MIN && marker.offer.price <= Price_Range.MAX && Price_Value.MIDDLE,
    high: marker.offer.price > Price_Range.MAX && Price_Value.HIGH,
  }

  if (housingPrice.value === DEFAULT_VALUE || filterPriceValue[housingPrice.value]) {
    return true;
  }
  return false;
};

const filterCheckbox = (marker) => {
  const mapFeatures = mapForm.querySelectorAll('.map__checkbox:checked');

  return Array.from(mapFeatures)
    .map((element) => element.value)
    .every((item) => marker.offer.features.includes(item));
};

const filterMarkers = (data) => {
  const filterData = [];
  let element;

  for (let i = Filter_Count.START; i < data.length; i++) {
    element = data[i];
    const isMatched = filterPrice(element) && filterType(element) && filterRooms(element) && filterGuests(element) && filterCheckbox(element);

    if (isMatched) {
      filterData.push(data[i]);
    }

    if(filterData.length === Filter_Count.FINISH) {
      return filterData;
    }
  }
  return filterData;
}

const updateMarkers = (data) => {
  resetMarkers();
  resetMap();
  const filterData = filterMarkers(data);
  renderMarkers(filterData);
};

const setFilterListener = (data) => {
  mapForm.addEventListener('change', _.debounce(() => updateMarkers(data), RERENDER_DELAY));
};

export {setFilterListener}
