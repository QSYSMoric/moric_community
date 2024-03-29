import { merge } from "lodash";

type FetchType = typeof $fetch;
type ReqType = Parameters<FetchType>[0];
type FetchOptions = Parameters<FetchType>[1];
const { notify } = useNotification();
export function httpRequest<T = unknown>(
  method: any,
  url: ReqType,
  bodyOrParams?: any,
  opts?: FetchOptions
) {
  const token = useCookie("token");
  const router = useRouter();
  const route = useRoute();

  const defaultOpts = {
    method,
    // baseURL: '/api',
    headers: { token: token.value } as any,
    onRequestError() {
      notify({
        text: "请求出错，请重试！",
        type: "error",
      });
    },
    onResponseError({ response }) {
      switch (response.status) {
        case 400:
          notify({
            text: "参数错误",
            type: "error",
          });
          break;
        case 401:
          notify({
            text: "没有访问权限",
            type: "error",
          });
          router.push(`/login?callback=${route.path}`);
          break;
        case 403:
          notify({
            text: "服务器拒绝访问",
            type: "error",
          });
          break;
        case 404:
          notify({
            text: "请求地址错误",
            type: "error",
          });
          break;
        case 500:
          notify({
            text: "服务器故障",
            type: "error",
          });
          break;
        default:
          notify({
            text: "网络连接故障",
            type: "error",
          });
          break;
      }
    },
  } as FetchOptions;
  if (defaultOpts) {
    if (method === "post") defaultOpts.body = bodyOrParams;
    else defaultOpts.params = bodyOrParams;
  }
  return $fetch<T>(url, merge(defaultOpts, opts));
}

export function httpPost<T = unknown>(request: ReqType, body?: any, opts?: FetchOptions) {
  return httpRequest<T>("post", request, body, opts);
}

export function httpGet<T = unknown>(request: ReqType, opts?: FetchOptions) {
  return httpRequest<T>("get", request, null, opts);
}
