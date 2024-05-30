/**
 * @descripttion:登录信息
 * @return {*}
 */
export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    phone: string;
    introduction: string;
    sex: string;
    age: number;
  };
}

/**
 * @descripttion:个人信息
 * @return {*}
 */
export interface Me {
  id: number;
  username: string;
  email?: string;
  provider: string;
  confirmed: boolean;
  uuid: string;
  phone: number;
  sex: "confidential" | "male" | "female";
  age: number;
  avatart?: FileObj;
  birthday?: string;
  explain?: string;
  introduction?: string;
  articles: {
    id: number;
    title: string;
    introduction: string;
    createdAt: string;
    updatedAt: string;
    cover: FileObj;
  }[];
  excels: {
    id: number;
    title: string;
  }[];
  trends: {
    createdAt: string;
    id: number;
    title: string;
    text: string;
    users_permissions_user: {
      id: number;
      username: string;
      avatart: FileObj;
    };
    likeUsers: {
      id: number;
      username: string;
    }[];
    aboutArticle: {
      id: number;
      title: string;
      introduction: string;
      createdAt: string;
      cover: FileObj;
      publisher: {
        id: number;
        username: string;
        avatart: FileObj;
      };
    };
  }[];
}

/**
 * @descripttion:文件对象
 * @return {*}
 */
export interface FileObj {
  id: number;
  url: string;
  formats: {
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    large: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
}

/**
 * @descripttion:文件内容
 * @return {*}
 */
export interface File {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

/**
 * @descripttion:操作结果
 * @return {*}
 */
export interface Action {
  ok: boolean;
}

/**
 * @descripttion:个人文章列表
 * @return {*}
 */
export interface Articleslist {
  articles: {
    id: number;
    title: string;
  }[];
}

/**
 * @descripttion:请求返回体
 * @return {*}
 */
export interface PostRequest<T> {
  data:
    | {
        id: number;
        attributes: T;
      }
    | undefined;
  meta: any;
}

/**
 * @descripttion: get请求返回数据
 * @return {*}
 */
export interface GetRequest<T> {
  data: T;
  meta: any;
}

export interface Request<T, X> {
  data: T;
  meta?: X;
}

/**
 * @descripttion: 分页
 * @return {*}
 */
export interface Pagination {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
/**
 * @descripttion:用户的详细信息
 * @return {*}
 */
export interface UserInfo {
  id: number;
  username: string;
  email: number;
  introduction?: string;
  sex: "confidential" | "male" | "female";
  age?: number;
  explain?: string;
  birthday?: string;
  avatart: FileObj;
  articles: {
    id: number;
    title: string;
    content: string;
    introduction: string;
    publisher: {
      id: number;
      username: string;
      avatart: FileObj;
    };
    cover: FileObj;
  }[];
  excels: {
    id: number;
    title: string;
  }[];
  trends: {
    createdAt: string;
    id: number;
    title: string;
    text: string;
    users_permissions_user: {
      id: number;
      username: string;
      avatart: FileObj;
    };
    comment_cs: {
      id: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      users_permissions_user: {
        id: number;
        username: string;
        avatart?: FileObj;
      };
    }[];
    likeUsers: {
      id: number;
      username: string;
    }[];
    aboutArticle: {
      id: number;
      title: string;
      introduction: string;
      createdAt: string;
      cover: FileObj;
      publisher: {
        id: number;
        username: string;
        avatart: FileObj;
      };
    };
  }[];
}

/**
 * @descripttion: 我所发布的文章列表
 * @return {*}
 */
export interface MyArticlesTable {
  id: number;
  attributes: {
    title: string;
    content: string;
    introduction: string;
    createdAt: string;
    cover: {
      id: number;
      attributes: FileObj;
    };
  };
}
