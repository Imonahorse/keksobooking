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
  const arrayList = [];

  array.forEach((element) => {
    if (Math.random() > 0.5) {
      return;
    }

    arrayList.push(element);
  })

  return arrayList;
};

const getAddress = () => {
  return {
    lat: getRandomFloatingPoint(35.65, 35.7, 5),
    lng: getRandomFloatingPoint(139.7, 139.8, 5),
  }
};

export {
  getRandomNumberInRange,
  getRandomIntegerInRange,
  getRandomFloatingPoint,
  getArrayRandomElement,
  getRandomArray,
  getAddress
};
