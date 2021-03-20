/* global _:readonly */
import {resetMarkers, renderMarkers, resetMap} from './map.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const FilterCount = {
  START: 0,
  FINISH: 10,
};
const PriceValue = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
}
const PriceRange = {
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
  if (housingRooms.value === DEFAULT_VALUE || marker.offer.rooms === Number(housingRooms.value)) {
    return true;
  }
  return false;
};

const filterGuests = (marker) => {
  if (housingGuests.value === DEFAULT_VALUE || marker.offer.guests === Number(housingGuests.value)) {
    return true;
  }
  return false;
};

const filterPrice = (marker) => {
  const filterPriceValue = {
    low: marker.offer.price < PriceRange.MIN && PriceValue.LOW,
    middle: marker.offer.price >= PriceRange.MIN && marker.offer.price <= PriceRange.MAX && PriceValue.MIDDLE,
    high: marker.offer.price > PriceRange.MAX && PriceValue.HIGH,
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

  for (let i = FilterCount.START; i < data.length; i++) {
    element = data[i];
    const isMatched = filterPrice(element) && filterType(element) && filterRooms(element) && filterGuests(element) && filterCheckbox(element);

    if (isMatched) {
      filterData.push(data[i]);
    }

    if (filterData.length === FilterCount.FINISH) {
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
