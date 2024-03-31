/**
 * @descripttion:登录信息
 * @return {*}
 */
export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    phone: string;
    introduction: string;
    sex: string;
    age: number;
  };
}

/**
 * @descripttion:个人信息
 * @return {*}
 */
export interface Me {
  id: number;
  username: string;
  email?: string;
  provider: string;
  confirmed: boolean;
  uuid: string;
  phone: number;
  sex: string;
  age: number;
  avatart?: FileObj;
}

/**
 * @descripttion:文件对象
 * @return {*}
 */
export interface FileObj {
  id: number;
  url: string;
  formats: {
    small: File;
    medium: File;
    thumbnail: File;
  };
}

/**
 * @descripttion:文件内容
 * @return {*}
 */
export interface File {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

/**
 * @descripttion:操作结果
 * @return {*}
 */
export interface Action {
  ok: boolean;
}

/**
 * @descripttion:个人文章列表
 * @return {*}
 */
export interface Articleslist {
  articles: {
    id: number;
    title: string;
  }[];
}

/**
 * @descripttion:请求返回体
 * @return {*}
 */
export interface PostRequest {
  data: {
    id: number;
    attributes: any;
  };
}

export interface Request<T> {
  data: T;
  meta: any;
}
