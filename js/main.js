import {getRandomIntegerInRange, getArrayRandomElement, getRandomArray, getAddress} from './util.js';
import {TITLES, APARTMENTS, CHECKIN, CHECKOUT, DESCRIPTIONS, FEATURES, PHOTOS, OFFER_COUNT} from './data.js';

const generateOffer = () => {
  const coordinates = getAddress();

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntegerInRange(1, 8)}.png`,
    },
    offer: {
      title: getArrayRandomElement(TITLES),
      address: coordinates,
      price: getRandomIntegerInRange(0, 1000000),
      type: getArrayRandomElement(APARTMENTS),
      rooms: getRandomIntegerInRange(1, 10),
      guests: getRandomIntegerInRange(1, 10),
      checkin: getArrayRandomElement(CHECKIN),
      checkout: getArrayRandomElement(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: getArrayRandomElement(DESCRIPTIONS),
      photo: getRandomArray(PHOTOS),
    },
    location: coordinates,
  };
}

const offerList = new Array(OFFER_COUNT).fill('').map(() => generateOffer());

//eslint-disable-next-line no-console
console.log(offerList)
