import type { FileObj } from "~/type";
import { v4 as uuidv4 } from "uuid";

/**
 * @descripttion:文件对象
 * @return {*}
 */
class FileUploader {
  raw: File | undefined;
  id!: string;
  url: string | undefined;
  isUp: boolean;

  constructor(file: File) {
    this.raw = file;
    this.id = uuidv4();
    this.url = window.URL.createObjectURL(file);
    this.isUp = false;
  }

  /**
   * @descripttion: 实际的上传方法
   * @return {*}
   */
  async upload(): Promise<any> {
    // 模拟上传操作
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isUp = true; // 标记上传完成
        resolve("上传成功");
      }, 1000); // 模拟上传耗时
    });
  }
}

/**
 * @descripttion:上传文件命令接口
 * @return {*}
 */
export class UploadFileCommand {
  receiver: FileUploader[];

  constructor(receiver: File[]) {
    this.receiver = receiver.map((element) => {
      return new FileUploader(element);
    });
  }

  /**
   * @descripttion: 上传命令
   * @return {*}
   */
  async execute(): Promise<FileObj[]> {
    const uploadPromises: Promise<any>[] = this.receiver.map(async (fileUploader) => {
      const respose = await fileUploader.upload(); // 执行上传操作
      return respose; // 返回上传结果
    });
    return Promise.all(uploadPromises); // 等待所有上传操作完成
  }
}
