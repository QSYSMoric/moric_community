import type { Classification } from "~/type";
import { getConfig } from "~/api";

interface ConfigState {
  data: Classification[];
}
export const useConfigstore = defineStore("config", {
  state: (): ConfigState => {
    return {
      data: [],
    };
  },
  actions: {
    /**
     * @descripttion: 获取分类与标签
     * @return {*}
     */
    async getClassification(): Promise<Classification[]> {
      if (this.$state.data.length) {
        return Promise.resolve(this.$state.data);
      }
      const config = getConfig();
      config.then((data) => {
        this.$state.data = data;
      });
      return config;
    },
  },
});
