import {getOfferList} from './data.js';
import {translateType} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('.map__canvas');

const createFeaturesList = (arr, clone) => {
  const featuresList = clone.querySelector('.popup__features');
  featuresList.innerHTML = '';

  arr.forEach((item) => {
    const element = document.createElement('li');
    element.className = 'popup__feature';
    element.classList.add('popup__feature--' + item);
    featuresList.appendChild(element);
  })

  return featuresList;
}

const createPhotosList = (arr, clone) => {
  const featuresList = clone.querySelector('.popup__photos');
  featuresList.innerHTML = '';

  arr.forEach((item) => {
    const element = document.createElement('img');
    element.className = 'popup__photo';
    element.src = item
    element.width = 45;
    element.hight = 40;
    element.alt = 'Фотография жилья';
    featuresList.appendChild(element);
  })

  return featuresList;
}

const createSingleCard = ({offer, author}) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = `${offer.address.x}, ${offer.address.y}`;
  card.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__type').textContent = translateType(offer.type);
  createFeaturesList(offer.features, card);
  createPhotosList(offer.photo, card);
  return card;
};

const fillMap = () => {
  map.appendChild(createSingleCard(getOfferList()[0]));
}

export {fillMap};


