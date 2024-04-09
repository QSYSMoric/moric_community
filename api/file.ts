import type { FileObj } from "~/type";
import qs from "qs";
const { notify } = useNotification();

/**
 * @descripttion: 上传文件
 * @param {File} file
 * @return {*}
 */
export async function upFile(file: File): Promise<FileObj[]> {
  try {
    let form = new FormData();
    form.append("files", file); // 将文件添加到 FormData 实例中
    const response = await httpPost<FileObj[]>("/upload", form);
    console.log(response);
    return response;
  } catch (error) {
    console.error("出错了：", error);
    throw error;
  }
}
