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
            data?: {
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
    aboutArticle: {
      data?: {
        id: number;
        attributes: {
          title: string;
          introduction: string;
          createdAt: string;
          cover: {
            data: {
              id: number;
              attributes: FileObj;
            };
          };
          publisher: {
            data: {
              id: number;
              attributes: {
                username: string;
                avatart?: {
                  data: {
                    id: number;
                    attributes: FileObj;
                  };
                };
              };
            };
          };
        };
      };
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
    content: string;
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

/**
 * @descripttion:达人列表
 * @return {*}
 */
export interface Talents {
  id: number;
  username: string;
  avatart: FileObj;
  articles: {
    id: number;
    cover: FileObj;
  }[];
  excels: {
    id: number;
    title: string;
  }[];
}

/**
 * @descripttion: 我所发布的文章列表
 * @return {*}
 */
export interface MyArticlesTables {
  id: number;
  title: string;
  content: string;
  introduction: string;
  createdAt: string;
  cover: {
    id: number;
    attributes: FileObj;
  };
}

/**
 * @descripttion:编辑文章所需参数
 * @return {*}
 */
export interface EditeArticMsg {
  classification: {
    data: {
      id: number;
      attributes: {
        title: string;
      };
    };
  };
  imgs: {
    data: {
      id: number;
      attributes: FileObj;
    }[];
  };
  content: string;
  createdAt: string;
  introduction: string;
  cover: {
    data: {
      id: number;
      attributes: FileObj;
    };
  };
  labels: {
    data: {
      id: number;
      attributes: {
        title: string;
      };
    }[];
  };
  title: string;
  updatedAt: string;
}

/**
 * @descripttion: 我所发布的动态
 * @return {*}
 */
export interface MyupTrends {
  id: number;
  attributes: {
    title: string;
    text: string;
    createdAt: string;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
          avatart: {
            data: {
              id: number;
              attributes: FileObj;
            };
          };
        };
      };
    };
    likeUsers: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      }[];
    };
    aboutArticle: {
      data: {
        id: number;
        attributes: {
          title: string;
          createdAt: string;
          introduction: string;
          cover: {
            data: {
              id: number;
              attributes: FileObj;
            };
          };
          publisher: {
            data: {
              id: number;
              attributes: {
                username: string;
                avatart: {
                  data: {
                    id: number;
                    attributes: FileObj;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}
