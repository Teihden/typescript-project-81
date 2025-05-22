/**
 * Функция filterFromUndefined принимает объект и возвращает новый объект,
 * из которого исключены все свойства с неопределёнными значениями (undefined).
 * @param {object} obj - Исходный объект, который необходимо обработать.
 * @return {object} Новый объект без свойств с неопределёнными значениями.
 */
const filterFromUndefined = (obj: object): object => Object.fromEntries(
  Object.entries(obj).filter(([ _, value ]) => value !== undefined),
);

export {
  filterFromUndefined,
};
