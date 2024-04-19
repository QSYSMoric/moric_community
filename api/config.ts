import type { Classification, Request } from "~/type";
import qs from "qs";
const { notify } = useNotification();

/**
 * @descripttion: 获取配置
 * @return {*}
 */
export async function getConfig(): Promise<Classification[]> {
  try {
    const query = qs.stringify(
      {
        fields: ["title", "id"],
        populate: ["labels.title", "labels.id"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Request<Classification[], any>>("/classifications?" + query);
    return response.data;
  } catch (error) {
    notify({
      text: "出现错误",
      type: "error",
    });
    throw error;
  }
}
