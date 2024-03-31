/**
 * @descripttion: 分割路由
 * @param {string} url
 * @param {number} level
 * @return {*}
 */
export default function getRouteByNumber(url: string, level: number): string | undefined {
  const routes = url.split("/").filter((route) => route !== "");
  if (routes.length === 0 && level === 1) {
    return "/";
  }
  if (level < 1 || level > routes.length) {
    return void 0;
  }
  return "/" + routes[level - 1];
}
