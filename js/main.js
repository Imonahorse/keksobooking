'use strict'

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

const getRandomNumberInRange = (min, max) => min + Math.random() * (max + 1 - min);

const getRandomIntegerInRange = (min, max) => {
  if (max <= min || min < 0 || max < 0) {
    //eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  const randomInteger = getRandomNumberInRange(min, max);
  return Math.floor(randomInteger);
};

const getRandomFloatingPoint = (min, max, digits = 2) => {
  if (max <= min || min < 0 || max < 0) {
    //eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  const randomFloatingPoint = getRandomNumberInRange(min, max);
  return randomFloatingPoint.toFixed(digits);
};

const getArrayRandomElement = (array) => array[getRandomIntegerInRange(0, array.length - 1)];

const getRandomArray = (array) => {
  let arrayList = [];

  array.forEach((element) => {
    if(Math.random()>0.5) {
      return;
    }

    arrayList.push(element);
  })

  return arrayList;
}


const generateOffer = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntegerInRange(1, 8) + '.png',
    },
    offer: {
      title: getArrayRandomElement(TITLES),
      address: `${getRandomFloatingPoint(100, 1000)}, ${getRandomFloatingPoint(100, 1000)}`,
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
    location: {
      x: getRandomFloatingPoint(35.65, 35.7, 5),
      y: getRandomFloatingPoint(139.7, 139.8, 5),
    },
  };
}

const offerList = new Array(10).fill('').map(() => generateOffer());

//eslint-disable-next-line no-console
console.log(offerList);

const filter = offerList.filter((item) => item.offer.price > 400000);
