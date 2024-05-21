import type {
  TrendHome,
  Request,
  Pagination,
  Comment,
  PostRequest,
  ArticleHomeList,
  ArticleInfo,
  Classification,
  Talents,
  UserInfo,
  FileObj,
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
          likeUsers: {
            fields: ["username", "avatart"],
          },
          aboutArticle: {
            populate: {
              cover: true,
              publisher: {
                populate: ["avatart"],
                fields: ["username"],
              },
            },
            fields: ["title", "introduction", "createdAt"],
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
  classificationId?: number,
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
        filters: {
          classification: {
            id: {
              $eq: classificationId == -1 ? void 0 : classificationId,
            },
          },
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
        fields: ["title", "createdAt", "content"],
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

/**
 * @descripttion: 获取达人列表
 * @return {*}
 */
export async function getUserList(
  excels: Classification[],
  page: number = 1,
  pageSize: number = 20
): Promise<Talents[]> {
  try {
    const query = qs.stringify({
      populate: {
        avatart: true,
        articles: {
          populate: {
            cover: true,
          },
          fields: ["cover"],
        },
        excels: true,
      },
      filters: {
        excels: {
          id: {
            $in: excels.map((element) => {
              return element.id;
            }),
          },
        },
      },
      pagination: {
        page,
        pageSize,
      },
      fields: ["username"],
    });
    const response = await httpGet<Talents[]>("/users?" + query);
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
 * @descripttion: 获取用户详细信息
 * @param {number} userId
 * @return {*}
 */
export async function getUserInfo(userId: number): Promise<UserInfo> {
  try {
    const query = qs.stringify({
      populate: {
        avatart: true,
        articles: {
          populate: {
            publisher: {
              populate: ["avatart"],
              fields: ["username"],
            },
            cover: {
              fields: true,
            },
          },
        },
        excels: true,
        trends: {
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
            likeUsers: {
              fields: ["username", "avatart"],
            },
            aboutArticle: {
              populate: {
                cover: true,
                publisher: {
                  populate: ["avatart"],
                  fields: ["username"],
                },
              },
              fields: ["title", "introduction", "createdAt"],
            },
          },
        },
      },
      fields: ["username", "email", "introduction", "sex", "age", "explain", "birthday"],
    });
    const response = await httpGet<UserInfo>("/users/" + userId + "?" + query);
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
 * @descripttion: 文章搜索列表
 * @return {*}
 */
interface ArticleList {
  id: number;
  attributes: {
    title: string;
    classification: {
      data: {
        id: number;
        attributes: {
          title: string;
        };
      };
    };
    cover: {
      data: {
        id: number;
        attributes: FileObj;
      };
    };
  };
}

/**
 * @descripttion: 用户搜索列表
 * @return {*}
 */
interface UserList {
  id: number;
  username: string;
  excels: {
    id: number;
    title: string;
  }[];
  avatart: FileObj;
}

/**
 * @descripttion: 模糊搜索
 * @param {string} str
 * @return {*}
 */
export async function fuzzySearch(str: string): Promise<{
  articleList: ArticleList[];
  userList: UserList[];
}> {
  try {
    const articQuery = qs.stringify({
      populate: ["classification", "cover"],
      fields: ["title"],
      filters: {
        title: {
          $containsi: str,
        },
      },
    });
    const userQuery = qs.stringify({
      populate: ["excels", "avatart"],
      filters: {
        username: {
          $containsi: str,
        },
      },
      fields: ["username"],
    });
    const userListResponse = await httpGet<UserList[]>("/users?" + userQuery);
    const articleListResponse = await httpGet<Request<ArticleList[], undefined>>(
      "/articles?" + articQuery
    );
    return {
      userList: userListResponse,
      articleList: articleListResponse.data,
    };
  } catch (error) {
    notify({
      text: "未知错误",
      type: "error",
    });
    throw error;
  }
}
