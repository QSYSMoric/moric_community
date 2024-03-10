export const useFormRules = () => {
  return {
    ruleRequired: (v: any) => !!v || "必要的信息",
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "确定是正确的邮箱吗";
    },
    rulePassLen: (v: string) => (!!v && v.length >= 6) || "密码必须是大于6位的",
  };
};
