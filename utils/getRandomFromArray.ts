const getRandomFromArray = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];

export default getRandomFromArray;
