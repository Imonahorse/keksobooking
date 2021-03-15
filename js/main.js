/* global _:readonly */
import './map.js';
import {renderMarkers} from './map.js';
import './form.js';
import {setPageFormSubmit} from './form.js';
import {getData} from './api.js';
import {showDataMessage} from './message.js';
import {setFilterListener, updateMarkers} from './filter.js';
import './avatar.js';

const RERENDER_DELAY = 500;
const MARKER_COUNT = 10;

const onDataSuccess = (data) => {
  renderMarkers(data.slice(0, MARKER_COUNT));

  setFilterListener(_.debounce(() => updateMarkers(data), RERENDER_DELAY));
}

const onDataFail = () => {
  showDataMessage()
}

getData((markers) => onDataSuccess(markers),
  onDataFail);

setPageFormSubmit();
