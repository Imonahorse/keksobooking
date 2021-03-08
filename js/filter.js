import {resetMarkers, renderMarkers, resetMap} from './map.js';
import {mapForm} from './form.js';

const DEFAULT_HOUSE_TYPE = 'any';

const housingType = mapForm.querySelector('#housing-type');

const filter = (data) => {
  if (housingType.value === DEFAULT_HOUSE_TYPE) {
    return data;
  }

  const dataAfterFilter = data.filter((item) => item.offer.type === housingType.value);
  return dataAfterFilter;
};

const updateMarkers = (data) => {
  resetMarkers();
  resetMap();
  const dataAfterFilter = filter(data);
  renderMarkers(dataAfterFilter);
};

const setFilterListener = (cb) => {
  housingType.addEventListener('change', () => cb());
};

export {setFilterListener, updateMarkers}
