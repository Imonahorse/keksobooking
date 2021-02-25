/* global L:readonly */
import {createSingleCard} from './popup.js';
import {getOfferList} from './data.js';
import {blockPage} from './form.js'

const LayerInfo = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const StartAddressValue = {
  X: 35.652832,
  Y: 139.839478,
}

const MAP_ZOOM = 8;
const ICON_SIZE_X = 40;
const ICON_SIZE_Y = 40;
const ICON_ANCHOR_X = ICON_SIZE_X / 2;
const ICON_ANCHOR_Y = ICON_SIZE_Y;

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

const offerList = getOfferList();
const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');
addressInput.value = `${StartAddressValue.X}, ${StartAddressValue.Y}`;

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

const marker = L.marker(
  {
    lat: StartAddressValue.X,
    lng: StartAddressValue.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
)

marker.on('move', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(6)}, ${evt.target.getLatLng().lng.toFixed(6)}`
})

marker.addTo(map);

const renderMarkers = (arr) => {

  arr.forEach((point) => {
    const icon = L.icon({
      iconUrl: CommonIcon.URL,
      iconSize: CommonIcon.SIZE,
      iconAnchor: CommonIcon.ANCHOR,
    });

    const marker = L.marker(
      {
        lat: point.location.x,
        lng: point.location.y,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createSingleCard(point),
        {
          keepInView: true,
        },
      )
  });
}

renderMarkers(offerList);
