// eslint-disable no-unused-vars
import { IAttributes } from '../globals';

/**
 * Функция фильтрует объект, исключая свойства с неопределенными (undefined) или нулевыми (null) значениями.
 * @param {Record<string, string | number | undefined | null>} obj Объект для фильтрации, где ключ - это строка, а значение может быть строкой, числом, undefined или null.
 * @returns {IAttributes} Новый объект, содержащий только те пары 'ключ-значение', у которых значения определены и не равны null.
 */
const filterObj = (
  obj: Record<string, string | number | undefined | null>): IAttributes => Object.fromEntries(
  Object
    .entries(obj)
    .filter(([ _, value ]) => {
      return value !== undefined && value !== null;
    }),
) as IAttributes;

export default filterObj;
