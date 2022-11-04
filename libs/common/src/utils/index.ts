import { genSaltSync, getSalt, hashSync } from 'bcryptjs';

/**
 * 先判断str是否存在;存在,做个小优化,去除左右两边空字符串；不存在,返回undefined
 */
export function trimStringData(str?: string) {
  return str ? str.trim() : undefined;
}

/**
 *
 * @param hashPassword 数据库中存的password
 * @param passport 用户传过来的password
 * @returns
 */
export function checkPassword(hashPassword: string, passport: string): boolean {
  const salt = getSalt(hashPassword);
  const hash = hashSync(passport, salt);
  if (hash !== hashPassword) {
    return false;
  }

  return true;
}

export function getHashPassword(password: string): string {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
}
