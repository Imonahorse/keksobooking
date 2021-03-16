/* global _:readonly */
import './map.js';
import {renderMarkers} from './map.js';
import './form.js';
import {setPageFormSubmit, clickOnResetButton, blockPage} from './form.js';
import {getData} from './api.js';
import {showErrorMessage} from './message.js';
import {setFilterListener, updateMarkers} from './filter.js';
import './avatar.js';

const RERENDER_DELAY = 500;
const MARKER_COUNT = 10;

const onDataSuccess = (data) => {
  renderMarkers(data.slice(0, MARKER_COUNT));
  setFilterListener(_.debounce(() => updateMarkers(data), RERENDER_DELAY));
  clickOnResetButton(data);
  setPageFormSubmit(data);
}

const onDataFail = () => {
  showErrorMessage();
  blockPage(true);
}

getData((markers) => onDataSuccess(markers),
  onDataFail);

