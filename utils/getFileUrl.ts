import type { FileObj } from "@/type";
/**
 * @descripttion: 获取图片地址
 * @param {string}
 * @return {*}
 */
export default function getFileUrl(
  avatar?: FileObj,
  option: "small" | "medium" | "thumbnail" | "large" = "medium"
): string | undefined {
  const orgUrl = useRuntimeConfig().public.file_url;
  if (!avatar) {
    return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
  }
  if (avatar.formats[option] && avatar.formats[option].url) {
    return orgUrl + avatar.formats[option].url;
  } else {
    return orgUrl + avatar.url;
  }
}
