/**
 * @descripttion: 命令接口
 * @return {*}
 */
export interface Command<T> {
  receiver: T;
  execute: (option: any) => any;
}
