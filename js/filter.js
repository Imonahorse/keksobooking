import {resetMarkers, renderMarkers, resetMap} from './map.js';

const DEFAULT_VALUE = 'any';
const FILTER_COUNT = 10;
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
  const featuresArray = [];

  for (let feature of mapFeatures) {
    featuresArray.push(feature.value)
  }

  return featuresArray.every((item) => marker.offer.features.includes(item));
};

const filterMarkers = (data) => {
  const filterData = [];

  data.forEach((item) => {
    const filter = filterPrice(item) && filterType(item) && filterRooms(item) && filterGuests(item) && filterCheckbox(item);

    if(filter && filterData.length < FILTER_COUNT) {
      filterData.push(item);
    }
  });
  return filterData;
}

const updateMarkers = (data) => {
  resetMarkers();
  resetMap();
  const filterData = filterMarkers(data);
  renderMarkers(filterData);
};

const setFilterListener = (cb) => {
  mapForm.addEventListener('change', cb);
};

export {setFilterListener, updateMarkers}
