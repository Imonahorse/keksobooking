import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {createSingleCard} from './popup.js';
import {blockPage} from './form.js'

const MAP_ZOOM = 8;
const ICON_SIZE_X = 40;
const ICON_SIZE_Y = 40;
const ICON_ANCHOR_X = ICON_SIZE_X / 2;
const ICON_ANCHOR_Y = ICON_SIZE_Y;
const Marker_Count = {
  FIRST: 0,
  LAST: 10,
};

const LayerInfo = {
  URL: 'https://tile.jawg.io/de746faa-447c-4eb6-8260-7a692a455863/{z}/{x}/{y}.png?access-token=glVpOAWw5vB9ajv40MQCRq5QREOPc7FO4ig4CwVcuhqC8YYJOMtjg4lq9KmZ7ATT',
  COPYRIGHT: '<a href=\\"https://www.jawg.io\\" target=\\"_blank\\">&copy; Jawg</a> - <a href=\\"https://www.openstreetmap.org\\" target=\\"_blank\\">&copy; OpenStreetMap</a>&nbsp;contributors',
};

const StartAddressValue = {
  X: 35.65283,
  Y: 139.83947,
}

const CommonIcon = {
  URL: 'img/pin.svg',
  SIZE: [ICON_SIZE_X, ICON_SIZE_Y],
  ANCHOR: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
}

const MainIcon = {
  URL: 'img/main-pin.svg',
  SIZE: [ICON_SIZE_X, ICON_SIZE_Y],
  ANCHOR: [ICON_ANCHOR_X, ICON_ANCHOR_Y],
}

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');
addressInput.value = `${StartAddressValue.X}, ${StartAddressValue.Y}`;

blockPage(true);

map.on('load', () => {
  blockPage(false);
});

map.setView({
  lat: StartAddressValue.X,
  lng: StartAddressValue.Y,
}, MAP_ZOOM);

L.tileLayer(
  LayerInfo.URL,
  {
    attribution: LayerInfo.COPYRIGHT,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MainIcon.URL,
  iconSize: MainIcon.SIZE,
  iconAnchor: MainIcon.ANCHOR,
})

const mainMarker = L.marker(
  {
    lat: StartAddressValue.X,
    lng: StartAddressValue.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
)

mainMarker.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
})

mainMarker.addTo(map);

const markers = L.layerGroup().addTo(map);

const renderMarkers = (points) => {
  const pointsRange = points.slice(Marker_Count.FIRST, Marker_Count.LAST)

  pointsRange.forEach((point) => {
    const icon = L.icon({
      iconUrl: CommonIcon.URL,
      iconSize: CommonIcon.SIZE,
      iconAnchor: CommonIcon.ANCHOR,
    });

    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markers)
      .bindPopup(createSingleCard(point),
        {
          keepInView: true,
        },
      )
  });
}

const resetMarkers = () => {
  markers.clearLayers();
}

const resetMarker = () => {
  mainMarker.setLatLng(
    {
      lat: StartAddressValue.X,
      lng: StartAddressValue.Y,
    },
  )
}

const resetMap = () => {
  map.panTo([StartAddressValue.X, StartAddressValue.Y]);
}

export {renderMarkers, resetMarker, resetMap, resetMarkers}

