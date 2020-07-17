/**
 *
 * 兼容ts低于3.5的版本
 * Construct a type with the properties of T except for those in type K.
 *
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
