'use strict'

//ДОМАШНЕЕ ЗАДАНИЕ 2

const getRandomNumberInRange = (min, max) => min + Math.random() * (max + 1 - min);

const getRandomInteger = (min, max) => {
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

// ДОМАШНЕЕ ЗАДАНИЕ 3

// 1 ИЗ ТРЕХ ОБЪЕКТОВ:АВТОР;

let author = {};

let randomPhotoNumber = '0' + getRandomInteger(1, 8);

author.avatar = 'img/avatars/user' + randomPhotoNumber + '.png';

//2 ИЗ ТРЕХ ОБЪЕКТОВ: ОФФЕР;

const offer = {};
const apartments = ['palace', 'flat', 'house', 'bungalow'];
const time = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


const getOneOfFixValues = (array) => parseInt(Math.random() * array.length);

offer.title = 'Рандомный заголовок';

offer.address = 'location ' + getRandomFloatingPoint(0, 100, 5) + ' location ' + getRandomFloatingPoint(0, 100, 5);

offer.price = getRandomInteger(0, 1000000000);

offer.type = apartments[getOneOfFixValues(apartments)];

offer.rooms = getRandomInteger(1, 10);

offer.quests = getRandomInteger(1, 10);

offer.checkin = time[getOneOfFixValues(time)];

offer.checkout = time[getOneOfFixValues(time)];

const randomArrayLength = getRandomInteger(1, features.length);
features.length = randomArrayLength;

offer.features = [];

for (let i = 0; i < randomArrayLength; i++) {
  offer.features[i] = features[i];
}

offer.description = 'Рандомное описание помещения';


/* todo Тут иногда значение уезжает выше 35.70000, чтобы так не было надо убрать +1 у getRandomNumberInRange,
    но это надо новую функцию писать наверно */

const location = {};
location.x = getRandomFloatingPoint(35.65000, 35.70000, 5);
location.y = getRandomFloatingPoint(139.70000, 139.80000, 5);


// СКЛЕИВАЕМ ТРИ ОБЪЕКТА В ОДИН

let ad = [author, offer, location];
console.log(ad);
