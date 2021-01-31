'use strict'

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

getRandomInteger(10, 20);

const getRandomFloatingPoint = (min, max, digits=2) => {
  if (max <= min || min < 0 || max < 0){
    //eslint-disable-next-line no-console
    console.log('error');
    return;
  }

  const randomFloatingPoint = getRandomNumberInRange(min, max) ;
  return randomFloatingPoint.toFixed(digits);
};

getRandomFloatingPoint(10, 20, 15);
