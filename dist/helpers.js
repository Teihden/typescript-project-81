/**
 * Функция фильтрует объект, исключая свойства с неопределенными (undefined) или нулевыми (null) значениями.
 * @param {Record<string, string | number | undefined | null>} obj Объект для фильтрации, где ключ - это строка, а значение может быть строкой, числом, undefined или null.
 * @returns {IAttributes} Новый объект, содержащий только те пары "ключ-значение", у которых значения определены и не равны null.
 */
const filterObj = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null));
export { filterObj, };
