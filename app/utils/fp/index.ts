import {get, defaultTo, pipe, compact} from 'lodash/fp';

/**
 *
 * Improved getOr from lodash/fp
 *
 * const person = { name: null }
 *
 * const name1 = getOr('Dmytro', 'name', person)
 * const name2 = safeGetOr('Dmytro', 'name', person)
 *
 * console.log(name1)
 * // null
 * console.log(name2)
 * // 'Dmytro'
 *
 * @param defaultValue {*}
 * @param path {String | String[]}
 * @return {function(*=): *}
 */
export const safeGetOr = <TObject extends object, TDefault>(
  defaultValue: TDefault,
  path: string,
) => {
  /**
   * @param object {*}
   *
   * @return {defaultValue | *}
   */
  return (object: TObject): TDefault | any => {
    const value = get(path, object);

    return defaultTo<TDefault, TDefault>(defaultValue, value);
  };
};

export const safeGetCollection = <TObject extends object, TDefault>(
  path: string,
) => (object: TObject): TDefault[] =>
  pipe<TObject | any, any[], TDefault[]>(
    safeGetOr<TObject, TDefault | any>([], path),
    (array) => compact<TDefault>(array),
  )(object);
