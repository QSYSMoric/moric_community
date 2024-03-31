import type { Action, LoginResponse, Me, Articleslist, Trend, PostRequest } from "~/type";
import qs from "qs";
const { notify } = useNotification();
/**
 * @descripttion:登录
 * @param {string} username
 * @param {string} password
 * @return {*}
 */
export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await httpPost<LoginResponse>("/auth/local", {
      identifier: username,
      password,
    });
    const { jwt } = response;
    const token = useCookie("token");
    token.value = jwt;
    return jwt;
  } catch (error) {
    // 处理登录失败逻辑
    notify({
      text: "登录失败,请检查你输入的密码或账号是否正确",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 注册
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @return {*}
 */
export async function register(username: string, email: string, password: string): Promise<string> {
  try {
    const response = await httpPost<LoginResponse>("/auth/local/register", {
      username,
      email,
      password,
      role: {
        disconnect: [],
        connect: [
          {
            id: 3,
            position: {
              end: true,
            },
          },
        ],
      },
      sex: "confidential",
    });
    const { jwt } = response;
    const token = useCookie("token");
    token.value = jwt;
    return jwt;
  } catch (error) {
    // 处理注册失败逻辑
    notify({
      text: "注册失败",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 获取个人信息
 * @return {*}
 */
export async function getUserInfor(): Promise<Me> {
  try {
    const query = qs.stringify(
      {
        populate: {
          avatart: {
            fields: ["url", "formats", "formats.medium"],
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Me>("/users/me?" + query);
    return response;
  } catch (error) {
    // 处理登录失败逻辑
    console.error("请先登录", error);
    throw error;
  }
}
/**
 * @descripttion: 重置密码
 * @return {*}
 */
export async function resetting(
  code: string,
  password: string,
  passwordConfirmation: string
): Promise<string> {
  try {
    const response = await httpPost<LoginResponse>("/auth/reset-password", {
      code,
      password,
      passwordConfirmation,
    });
    return response.jwt;
  } catch (error) {
    // 处理注册失败逻辑
    notify({
      text: "重置失败",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 发生重置密码邮件
 * @param {string} email
 * @return {*}
 */
export async function forgotPassword(email: string): Promise<boolean> {
  try {
    const response = await httpPost<Action>("/auth/forgot-password", {
      email,
    });
    return response.ok;
  } catch (error) {
    // 处理注册失败逻辑
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion:获取个人发布的文章列表
 * @return {*}
 */
export async function getPublishedArticles(): Promise<Articleslist[]> {
  try {
    const query = qs.stringify(
      {
        populate: {
          articles: {
            fields: ["id", "title"],
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Articleslist[]>("/users?" + query);
    return response;
  } catch (error) {
    // 处理注册失败逻辑
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}
/**
 * @descripttion: 上传动态
 * @param {Trend} trend
 * @param {number} user
 * @return {*}
 */
export async function upTrends(trend: Trend, user: number): Promise<PostRequest> {
  try {
    trend.users_permissions_user = user;
    const response = await httpPost<PostRequest>("/trends", {
      data: trend,
    });
    return response;
  } catch (error) {
    // 处理注册失败逻辑
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}
