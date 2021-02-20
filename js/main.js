import {fillMap} from './popup.js';

fillMap();


const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const getNewPrice = (type, obj) => {
  switch (type.value) {
    case 'bungalow':
      price.placeholder = obj.bungalow;
      price.setAttribute('min', obj.bungalow)
      return;
    case'flat':
      price.placeholder = obj.flat;
      price.setAttribute('min', obj.flat)
      return;
    case 'house' :
      price.placeholder = obj.house;
      price.setAttribute('min', obj.house)
      return;
    case 'palace':
      price.placeholder = obj.palace;
      price.setAttribute('min', obj.palace)
      return;
  }
};


type.addEventListener('change', () => {
  getNewPrice(type, minPrice)
})
