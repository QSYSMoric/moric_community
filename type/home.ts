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
      data: {
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
      }[];
    };
  };
}
