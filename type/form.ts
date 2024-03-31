import { extend } from "lodash";
import type { FileObj } from "./api";
import type { Labels } from "./config";
/**
 * @descripttion:动态列表
 * @return {*}
 */
export interface Trend {
  title: string;
  text: string;
  aboutArticle?: number | null;
  users_permissions_user?: number;
}

/**
 * @descripttion:文章
 * @return {*}
 */
export interface Article {
  title: string;
  content: string;
  imgs?: FileObj[];
  introduction: string;
  publisher?: number;
  classification?: Labels;
  labels: Labels[];
  cover: FileObj[];
}

/**
 * @descripttion: 表单类型
 * @return {*}
 */
export interface Form<T> {
  receiver: T;
  actions?: any;
  execute: () => void;
}
