import './map.js';
import {renderMarkers} from './map.js';
import './form.js';
import {setPageFormSubmit} from './form.js';
import {getData} from './api.js';
import {showDataMessage} from './message.js'

getData(renderMarkers, showDataMessage);
setPageFormSubmit();
