const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

const declOfNum = (number, txt=['символ', 'символа','символов']) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export {isEscEvent, declOfNum};
