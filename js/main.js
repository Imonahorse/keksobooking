'use strict'

const getRandomNumber = (min, max) => {
  if (max <= min || min < 0 || max < 0) return 'Ошибка';

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

getRandomNumber(10, 20);

const getRandomPoint = (min, max, digits) => {
  if (max <= min || min < 0 || max < 0) return 'Ошибка';

  const randomPoint = min + Math.random() * (max + 1 - min);
  return randomPoint.toFixed(digits);
};

getRandomPoint(10, 20, 15);
