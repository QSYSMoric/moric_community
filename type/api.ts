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
    large: File;
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
export interface PostRequest<T> {
  data: {
    id: number;
    attributes?: T;
  };
  meta: any;
}

export interface Request<T, X> {
  data: T;
  meta?: X;
}

/**
 * @descripttion: 分页
 * @return {*}
 */
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: string;
}
