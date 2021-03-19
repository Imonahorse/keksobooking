import './map.js';
import './form.js';
import './picture-upload.js';
import {getData} from './api.js';
import {renderMarkers} from './map.js';
import {setFilterListener} from './filter.js';
import {setPageFormSubmit, clickOnResetButton, blockPage} from './form.js';

const onDataSuccess = (data) => {
  renderMarkers(data);
  setFilterListener(data);
  clickOnResetButton(data);
  setPageFormSubmit(data);
}

const onDataFail = () => {
  blockPage(true);
}

getData((markers) => onDataSuccess(markers),
  onDataFail);

