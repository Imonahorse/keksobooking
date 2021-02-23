import {createSingleCard} from './popup.js';
import './form.js';
import {getOfferList} from './data.js';

const map = L.map('map-canvas');
const layerInfo = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const startAddressValue = {
  x: 35.652832,
  y: 139.839478,
}
const mapZoom = 8;
const commonIcon = {
  url: 'img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
}
const mainIcon = {
  url: 'img/main-pin.svg',
  size: [56, 56],
  anchor: [26, 56],
}
const addressInput = document.querySelector('#address');
addressInput.value = `${startAddressValue.x}, ${startAddressValue.y}`;

const disableNoticeForm = (toggle) => {
  const form = document.querySelector('.ad-form');
  const fieldsets = form.querySelectorAll('fieldset');
  const arr = Array.from(fieldsets);
  arr.forEach((item) => item.disabled = toggle);
  switch (toggle) {
    case true:
      return form.classList.add('ad-form--disabled');
    case false:
      return form.classList.remove('ad-form--disabled');
  }
}

const disableMapForm = (toggle) => {
  const form = document.querySelector('.map__filters');
  const selects = form.querySelectorAll('select');
  const arr = Array.from(selects);
  arr.forEach((item) => item.disabled = toggle);
  const fieldset = form.querySelector('fieldset');
  fieldset.disabled = toggle;
  switch (toggle) {
    case true:
      return form.classList.add('map__filters--disabled');
    case false:
      return form.classList.remove('map__filters--disabled');
  }

}

disableNoticeForm(true);

disableMapForm(true);

const createMap =(place, layer, icon) => {
  place.on('click', () => {
    console.log('zoom')
    disableNoticeForm(false);
    disableMapForm(false);
  });

  place.setView({
    lat: startAddressValue.x,
    lng: startAddressValue.y,
  }, mapZoom);


  L.tileLayer(
    layer.url,
    {
      attribution: layer.copyright,
    },
  ).addTo(map);


  const mainPinIcon = L.icon({
    iconUrl: icon.url,
    iconSize: icon.size,
    iconAnchor: icon.anchor,
  })

  const marker = L.marker(
    {
      lat: startAddressValue.x,
      lng: startAddressValue.y,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  )

  marker.on('moveend', (evt) => {
    addressInput.value = evt.target.getLatLng();
  })

  marker.addTo(map);
}

const addOffersOnMap = (arr, card, icon) => {

  arr.forEach((point) => {
    const pin = L.icon({
      iconUrl: icon.url,
      iconSize: icon.size,
      iconAnchor: icon.anchor,
    });

    const marker = L.marker(
      {
        lat: point.location.x,
        lng: point.location.y,
      },
      {
        pin,
      },
    );

    marker
      .addTo(map)
      .bindPopup(card(point),
        {
          keepInView: true,
        },
      )
  });
}

createMap(map, layerInfo, mainIcon)

addOffersOnMap(getOfferList(), createSingleCard, commonIcon);
