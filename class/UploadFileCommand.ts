import type { FileObj } from "~/type";
import { v4 as uuidv4 } from "uuid";
import { upFile } from "@/api";

/**
 * @descripttion:文件对象
 * @return {*}
 */
class FileUploader {
  raw?: File;
  id!: string;
  url: string | undefined;
  isUp: boolean;
  fileObj?: FileObj;

  constructor(uploader: { file?: File; fileObj?: FileObj }) {
    if (uploader.file) {
      this.raw = uploader.file;
      this.id = uuidv4();
      this.url = window.URL.createObjectURL(this.raw);
      this.isUp = false;
    } else {
      this.id = uploader.fileObj?.id as unknown as string;
      this.isUp = true;
      this.fileObj = uploader.fileObj;
      this.fileObj!.id = this.id as unknown as number;
      this.url = getFileUrl(uploader.fileObj);
    }
  }

  /**
   * @descripttion: 实际的上传方法
   * @return {*}
   */
  async upload(): Promise<FileObj | undefined> {
    // 模拟上传操作
    return new Promise(async (resolve, reject) => {
      if (this.raw && !this.isUp) {
        let data = await upFile(this.raw);
        resolve(data[0]);
      } else {
        resolve(this.fileObj);
      }
    });
  }
}

/**
 * @descripttion:上传文件命令接口
 * @return {*}
 */
export class UploadFileCommand {
  public receiver: FileUploader[];

  constructor(receiver: File[]) {
    this.receiver = receiver.map((element) => {
      return new FileUploader({
        file: element,
      });
    });
  }
  /**
   * @descripttion: 添加系统文件
   * @param {FileObj} fileObjs
   * @return {*}
   */
  addFileObj(fileObjs: FileObj[]): void {
    fileObjs.forEach((element) => {
      this.receiver.push(
        new FileUploader({
          fileObj: element,
        })
      );
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
  exceed(file: File): void {
    if (this.receiver) {
      this.receiver.pop();
    }
    this.receiver.push(
      new FileUploader({
        file,
      })
    );
  }
}
