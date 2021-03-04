import {
  getRandomIntegerInRange,
  getArrayRandomElement,
  getRandomArray,
  getAddress
} from './util.js';


const TITLES = ['Привет', 'Hello', 'Bonjour', 'die Empfehlung'];

const APARTMENTS = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN = ['12:00', '13:00', '14:00'];

const CHECKOUT = ['12:00', '13:00', '14:00'];

const DESCRIPTIONS = [
  'Надо брать',
  'Хорошее предложение',
  'Подумайте хорошенько',
  'Кошмар',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFER_COUNT = 10;

const generateOffer = () => {
  const coordinates = getAddress();

  return {
    author: {
      avatar: `../img/avatars/user0${getRandomIntegerInRange(1, 8)}.png`,
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
      photos: getRandomArray(PHOTOS),
    },
    location: coordinates,
  };
}

const getOfferList = () => new Array(OFFER_COUNT).fill('').map(() => generateOffer());

export {getOfferList};
