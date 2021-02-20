const form = document.querySelector('.ad-form');

const typeOfApartment = form.querySelector('#type');

const apartmentPrice = form.querySelector('#price');

const timeIn = form.querySelector('#timein');

const timeOut = form.querySelector('#timeout');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const getNewPrice = (type, obj) => {
  switch (type.value) {
    case 'bungalow':
      apartmentPrice.placeholder = obj.bungalow;
      apartmentPrice.setAttribute('min', obj.bungalow)
      return;
    case'flat':
      apartmentPrice.placeholder = obj.flat;
      apartmentPrice.setAttribute('min', obj.flat)
      return;
    case 'house' :
      apartmentPrice.placeholder = obj.house;
      apartmentPrice.setAttribute('min', obj.house)
      return;
    case 'palace':
      apartmentPrice.placeholder = obj.palace;
      apartmentPrice.setAttribute('min', obj.palace)
      return;
  }
};

const formTypeAndTime = () => {

  typeOfApartment.addEventListener('change', () => {
    getNewPrice(typeOfApartment, minPrice)
  })

  timeIn.addEventListener('change', () => {
    timeOut.value = timeIn.value;
  })

  timeOut.addEventListener('change', () => {
    timeIn.value = timeOut.value;
  })
}

export {formTypeAndTime}
