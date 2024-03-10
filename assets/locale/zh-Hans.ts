import { zhHans } from "vuetify/locale"; // 导入Vuetify 自带的简体中文语言包

export default {
  label: "简体中文",
  // page login
  login: "登录",
  register: "注册",
  username: "用户名",
  password: "密码",
  login_account: "登录帐户",
  // menu
  menu: {
    home: "首页",
    dashboard: "仪表盘",
  },
  // 展开 简体中文语言包的所有项目
  ...zhHans,
};
