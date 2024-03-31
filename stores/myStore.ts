import type { Me, Optionlist } from "@/type";
import { getUserInfor, getPublishedArticles } from "~/api/user";
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
        sex: "",
        age: -1,
        avatart: void 0,
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
    async getUserInforAsync(): Promise<Me | undefined> {
      const token = toRef(useCookie("token"));
      if (!token.value && !this.isLongin) {
        return void 0;
      }
      if (~!this.$state.me.id) {
        if (this.$state.apiMap.has("getUserInfo")) {
          return this.$state.apiMap.get("getUserInfo");
        }
        let info = getUserInfor().then((data) => {
          this.$state.me = data;
          return data;
        });
        // this.$state.apiMap.set("getUserInfo", info);
        // console.log(info);
        return info;
      }
      return Promise.resolve(this.$state.me);
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
        sex: "",
        age: -1,
        avatart: void 0,
      };
    },
  },
});
