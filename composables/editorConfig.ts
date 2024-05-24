import { upFile } from "~/api";
/**
 * @descripttion: 富文本编辑器自定义上传文件
 * @param {Blob} blobInfo：文件二进制信息
 * @return {*}
 */
async function editorUpFile(blobInfo: { base64: () => string; blob: () => File }): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = blobInfo.blob();
    upFile(data)
      .then((data) => {
        const orgUrl = useRuntimeConfig().public.file_url;
        let fileUrl = orgUrl + data[0].url;
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

export default {
  editInit: {
    language: "zh_CN",
    selector: "textarea",
    promotion: false,
    branding: false,
    plugins: ["advlist", "autolink", "link", "image", "lists", "charmap", "preview"],
    statusbar: false,
    images_upload_handler: editorUpFile,
    min_height: 400,
  },
  readInit: {
    language: "zh_CN",
    inline: true,
    promotion: false,
    branding: false,
    menubar: false,
    statusbar: false,
    toolbar: false,
    readonly: true,
    hidden_input: true,
  },
  apiKey: "4op9omm5p6x5fmcbu3e12ssftcngv9258809rs4ea7orsuem",
};
