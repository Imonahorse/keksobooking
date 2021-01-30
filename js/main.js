'use strict'

const getRandomNumber = (min, max) => {
  if (max <= min || min < 0 || max < 0) return 'Ошибка';

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

getRandomNumber(10, 20);

const getRandomPoint = (min, max, digits) => {
  if (max <= min || min < 0 || max < 0) return 'Ошибка';

  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(digits);
};

getRandomPoint(10, 20, 15);
