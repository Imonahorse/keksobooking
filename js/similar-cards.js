import {offerList} from './data.js';
import {getPopupType} from './util.js';

const similarOfferList = offerList();

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCardList = document.querySelector('.map__canvas');

const similarCardListFragment = document.createDocumentFragment();

similarOfferList.forEach(({author, offer, location}) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = `${offer.address.x}, ${offer.address.y}`;
  card.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__type').textContent = getPopupType(offer.type);

  const featuresList = card.querySelector('.popup__features');
  const getFeaturesList = (parent) => {
    const featuresChildren = parent.children;
    for (let i = 0; i < featuresChildren.length; i++) {
      for (let j = 0; j < offer.features.length; j++) {
        if (featuresChildren[i].classList.contains('popup__feature--' + offer.features[j])) {
          featuresList.removeChild(featuresChildren[i]);
        }
      }
    }
  }
  getFeaturesList(featuresList);

  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = '';
  const photosItem = cardTemplate.querySelector('.popup__photo');
  for (let i = 0; i < offer.photo.length; i++) {
    const photoClone = photosItem.cloneNode(true);
    photoClone.src = offer.photo[i];
    photosList.appendChild(photoClone)
  }

  similarCardListFragment.appendChild(card);
})

similarCardList.appendChild(similarCardListFragment);

export {similarCardList};
