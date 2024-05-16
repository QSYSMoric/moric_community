import { upFile } from "~/api";
/**
 * @descripttion: 富文本编辑器自定义上传文件
 * @param {Blob} blobInfo：文件二进制信息
 * @param {Function} succFun：成功回调
 * @param {Function} failFun：失败回调
 * @return {*}
 */
export async function editorUpFile(blobInfo: {
  base64: () => string;
  blob: () => File;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = blobInfo.blob();
    upFile(data)
      .then((data) => {
        const orgUrl = useRuntimeConfig().public.file_url;
        let fileUrl = orgUrl + data[0].formats.medium.url;
        if (fileUrl) {
          resolve(fileUrl);
        } else {
          reject("上传失败");
        }
      })
      .catch(() => {
        resolve("上传失败");
      });
  });
}
