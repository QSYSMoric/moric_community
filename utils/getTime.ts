const dayjs = useDayjs();

/**
 * @descripttion: 获取时间
 * @param {string} time：时间
 * @return {*}
 */
export default function getTime(time: string): string {
  return dayjs(time).format("YYYY-MM-DD HH:mm");
}
