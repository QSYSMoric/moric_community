import Mint from "mint-filter";
import SensitiveLexicon from "@/assets/content/SensitiveLexicon.json";
// 创建Mint实例
const mint = new Mint(SensitiveLexicon.words);

export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || "必要的信息",
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "确定是正确的邮箱吗";
    },
    rulePassLen: (v: string) => (!!v && v.length >= 6) || "密码必须是大于6位的",
    ruleFile: (value?: File) => {
      return !value || !value.length || value.size < 2000000 || "文件大小必须小于 2 MB!";
    },
    ruleFiles: (value?: File[]) => {
      return (
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        "Avatar size should be less than 2 MB!"
      );
    },
    ruleWordFilter: (value: string) => {
      let flag = mint.verify(value);
      return flag;
    },
  };
};
