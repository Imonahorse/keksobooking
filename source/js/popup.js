const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const translateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';

    case 'bungalow':
      return 'Бунгало';
  }
};

const createFeaturesList = (arr, clone) => {
  const featuresList = clone.querySelector('.popup__features');
  featuresList.innerHTML = '';

  arr.forEach((item) => {
    const element = document.createElement('li');
    element.classList.add('popup__feature', 'popup__feature--' + item);
    featuresList.appendChild(element);
  })

  return featuresList;
}

const createPhotosList = (arr, clone) => {
  const photoList = clone.querySelector('.popup__photos');
  const photo = clone.querySelector('.popup__photo')
  photoList.innerHTML = '';

  arr.forEach((item) => {
    const photoItem = photo.cloneNode(true);
    photoItem.src = item;
    photoList.appendChild(photoItem);
  });

  return photoList;
};

const createSingleCard = ({offer, author}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__type').textContent = translateType(offer.type);
  createFeaturesList(offer.features, card);
  createPhotosList(offer.photos, card);

  return card;
};

export {createSingleCard};
