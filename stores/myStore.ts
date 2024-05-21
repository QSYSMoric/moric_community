import type { FileObj, Me, Optionlist } from "@/type";
import { getUserInfor, getPublishedArticles, deleteTrend } from "~/api/user";
import { useRequest, useToggle } from "vue-hooks-plus";

interface MeState {
  me: Me;
  apiMap: Map<string, Promise<any>>;
  myArticleslist: Optionlist[];
}
export const useMystore = defineStore("myStore", {
  state: (): MeState => {
    return {
      me: {
        id: -1,
        username: "",
        email: "",
        provider: "",
        confirmed: false,
        uuid: "",
        phone: -1,
        sex: "confidential",
        age: -1,
        avatart: void 0,
        articles: [],
        excels: [],
        trends: [],
      },
      apiMap: new Map(),
      myArticleslist: [],
    };
  },
  getters: {
    isLongin(state) {
      return ~state.me.id;
    },
    getMe(state) {
      return state.me;
    },
  },
  actions: {
    async linkUserInfo(): Promise<void> {
      getUserInfor().then((data) => {
        this.$state.me = data;
      });
    },
    async getUserInforAsync(): Promise<Me | undefined> {
      const token = toRef(useCookie("token"));
      const [state, { toggle }] = useToggle();
      return new Promise((resolve, reject) => {
        if (!token.value && !this.isLongin) {
          reject(void 0);
        }
        if (!~this.$state.me.id) {
          getUserInfor().then((data) => {
            resolve(data);
            this.$state.me = data;
          });
        } else {
          resolve(this.$state.me);
        }
      });
    },
    async getArticleslist(): Promise<Optionlist[] | undefined> {
      if (this.$state.myArticleslist.length) {
        return Promise.resolve(this.$state.myArticleslist);
      }
      return getPublishedArticles().then((data) => {
        if (data.length) {
          this.$state.myArticleslist = data[0].articles;
          return data[0].articles;
        }
        return void 0;
      });
    },
    logOut() {
      let token = useCookie("token");
      token.value = null;
      this.$state.me = {
        id: -1,
        username: "",
        email: "",
        provider: "",
        confirmed: false,
        uuid: "",
        phone: -1,
        sex: "confidential",
        age: -1,
        avatart: void 0,
        articles: [],
        excels: [],
        trends: [],
      };
    },
    setBasicMsg(data: {
      username: string;
      sex: "confidential" | "male" | "female";
      birthday?: string;
      avatart?: FileObj;
      introduction?: string;
      excels: {
        id: number;
        title: string;
      }[];
    }) {
      const { username, sex, birthday, avatart, excels, introduction } = data;
      this.$state.me.username = username;
      this.$state.me.sex = sex;
      this.$state.me.birthday = birthday;
      this.$state.me.avatart = avatart;
      this.$state.me.excels = excels;
      this.$state.me.introduction = introduction;
    },
    async deleteTrendItem(trendId: number): Promise<any> {
      let index = this.$state.me.trends.findIndex((element) => {
        return element.id == trendId;
      });
      console.log(trendId);
      if (!~index) {
        return Promise.reject(void 0);
      }
      await deleteTrend(trendId);
      this.$state.me.trends.splice(index, 1);
    },
  },
});
