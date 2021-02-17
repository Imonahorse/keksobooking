import {getOfferList} from './data.js';
import {translateType} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('.map__canvas');

// const createFeaturesList = (arr, clone) => {
//   const featuresList = clone.querySelector('.popup__features');
//   featuresList.innerHTML = '';
//
//   arr.forEach((item) => {
//     const element = document.createElement('li');
//     element.className = 'popup__feature';
//     element.classList.add('popup__feature--' + item);
//     featuresList.appendChild(element);
//   })
//
//   return featuresList;
// }


const createSingleCard = ({offer, author}) => {
  const card = cardTemplate.cloneNode(true);
  const photoList = card.querySelector('.popup__photos');
  const featureList = card.querySelector('.popup__features');

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = `${offer.address.x}, ${offer.address.y}`;
  card.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__type').textContent = translateType(offer.type);

  featureList.innerHTML = '';
  for(let i=0; i < offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + offer.features[i]);
    featureList.appendChild(featureItem);
  }

  photoList.innerHTML = '';
  for(let i=0; i < offer.photo.length; i++) {
    const photoItem = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoItem.src = offer.photo[i];
    photoList.appendChild(photoItem);
  }

  return card;
};

const fillMap = () => {
  map.appendChild(createSingleCard(getOfferList()[0]));
}

export {fillMap};


