import './map.js';
import {renderMarkers} from './map.js';
import './form.js';
import {setPageFormSubmit} from './form.js';
import {getData} from './api.js';

getData(renderMarkers);
setPageFormSubmit();
