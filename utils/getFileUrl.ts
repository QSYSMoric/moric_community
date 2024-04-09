import type { FileObj } from "@/type";
/**
 * @descripttion: 获取图片地址
 * @param {string}
 * @return {*}
 */
export default function getFileUrl(avatar?: FileObj): string | undefined {
  const orgUrl = useRuntimeConfig().public.file_url;

  if (!avatar) {
    return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
  }

  return orgUrl + avatar.formats.medium.url;
}
