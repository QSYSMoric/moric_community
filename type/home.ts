import type { FileObj } from "./api";

/**
 * @descripttion: 文章列表信息
 * @return {*}
 */
export interface ArticleHome {
  id: number;
  attributes: {
    title: string;
    content: string;
    introduction: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        id: number;
        attributes: FileObj;
      };
    };
  };
}

/**
 * @descripttion: 评论
 * @return {*}
 */
export interface Comment_cs {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    updatedAt: string;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
          avatart: {
            id: number;
            data: {
              attributes: FileObj;
            };
          };
        };
      };
    };
  };
}

/**
 * @descripttion: 动态列表
 * @return {*}
 */
export interface TrendHome {
  id: number;
  attributes: {
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
          avatart: {
            id: number;
            data: {
              attributes: FileObj;
            };
          };
        };
      };
    };
    comment_cs: {
      data: Comment_cs[];
    };
    likeUsers: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      }[];
    };
  };
}

/**
 * @descripttion: 文章列表
 * @return {*}
 */
export interface ArticleHomeList {
  id: number;
  attributes: {
    title: string;
    introduction: string;
    createdAt: string;
    publisher: {
      data: {
        id: number;
        attributes: {
          username: string;
          avatart: {
            id: number;
            data: {
              attributes: FileObj;
            };
          };
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
 * @descripttion: 文章详细信息
 * @return {*}
 */
export interface ArticleInfo {
  id: number;
  attributes: {
    title: string;
    introduction: string;
    createdAt: string;
    publisher: {
      data: {
        id: number;
        attributes: {
          username: string;
          avatart: {
            id: number;
            data: {
              attributes: FileObj;
            };
          };
        };
      };
    };
    cover: {
      data: {
        id: number;
        data: {
          attributes: FileObj;
        };
      };
    };
    imgs: {
      data: {
        id: number;
        attributes: FileObj;
      }[];
    };
    comment_cs: {
      data: Comment_cs[];
    };
  };
}
