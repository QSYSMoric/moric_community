import type {
  TrendHome,
  Request,
  Pagination,
  Comment,
  PostRequest,
  ArticleHomeList,
  ArticleInfo,
} from "~/type";
import qs from "qs";
const { notify } = useNotification();

/**
 * @descripttion: 获取首页推荐的文章
 * @return {*}
 */
export async function getHomeArticles(): Promise<any> {
  try {
    const query = qs.stringify(
      {
        populate: {
          cover: {
            fields: ["url", "formats", "formats.medium"],
          },
        },
        pagination: {
          page: 1,
          pageSize: 10,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet("/articles?" + query);
    return response;
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 获取首页动态
 * @return {*}
 */
export async function getHomeTrends(
  page: number = 1,
  pageSize: number = 10
): Promise<Request<TrendHome[], Pagination>> {
  try {
    const query = qs.stringify(
      {
        populate: {
          users_permissions_user: {
            populate: ["avatart"],
            fields: ["username"],
          },
          comment_cs: {
            populate: {
              users_permissions_user: {
                populate: ["avatart"],
                fields: ["username"],
              },
            },
            sort: ["createdAt:desc"],
          },
        },
        pagination: {
          page,
          pageSize,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Request<TrendHome[], Pagination>>("/trends?" + query);
    return response;
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 发表评论
 * @param {Comment} comment：评论体
 * @return {*}
 */
export async function postComments(comment: Comment): Promise<
  PostRequest<{
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>
> {
  try {
    const response = await httpPost<
      PostRequest<{ content: string; createdAt: string; updatedAt: string; publishedAt: string }>
    >("/comment-cs", {
      data: comment,
    });
    return response;
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 获取文章列表
 * @return {*}
 */
export async function getHomeArticlesList(
  page: number = 1,
  pageSize: number = 10
): Promise<Request<ArticleHomeList[], Pagination>> {
  try {
    const query = qs.stringify(
      {
        populate: {
          publisher: {
            populate: ["avatart"],
            fields: ["username"],
          },
          cover: {
            fields: true,
          },
        },
        pagination: {
          page,
          pageSize,
        },
        fields: ["title", "introduction", "createdAt"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Request<ArticleHomeList[], Pagination>>("/articles?" + query);
    return response;
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}

/**
 * @descripttion: 获取文章的详细信息
 * @param {number} articleId
 * @return {*}
 */
export async function getArticleInfo(
  articleId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Request<ArticleInfo, undefined>> {
  try {
    const query = qs.stringify(
      {
        populate: {
          publisher: {
            populate: ["avatart"],
            fields: ["username"],
          },
          cover: {
            fields: true,
          },
          comment_cs: {
            populate: {
              users_permissions_user: {
                populate: ["avatart"],
                fields: ["username"],
              },
            },
            sort: ["createdAt:desc"],
          },
          imgs: {
            fields: true,
          },
        },
        fields: ["title", "introduction", "createdAt"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const response = await httpGet<Request<ArticleInfo, undefined>>(
      "/articles/" + articleId + "/?" + query
    );
    return response;
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}
