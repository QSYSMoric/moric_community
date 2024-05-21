import type { Command } from "@/type/designPattern";
import type { PostRequest } from "@/type/index";
const { notify } = useNotification();
/**
 * @descripttion: 点赞处理类
 * @return {*}
 */
class LikeReceiver {
  trend?: number;
  article?: number;
  api: string;
  type: "trend" | "article";
  users_permissions_user?: number;

  constructor(postId: number, type: "trend" | "article") {
    this.type = type;
    if (type == "trend") {
      this.api = "/trends/" + postId;
    } else {
      this.api = "/articles/" + postId;
    }
  }

  async like(users_permissions_user: number): Promise<{
    id: number;
  }> {
    this.users_permissions_user = users_permissions_user;
    // 发送点赞请求给后端
    const response = await httpPut<
      PostRequest<{
        id: number;
      }>
    >(this.api, {
      data: {
        likeUsers: {
          connect: [this.users_permissions_user],
        },
      },
    });
    if (response.data) {
      notify({
        text: "点赞成功",
        type: "success",
      });
    }
    return response.data!;
  }
}

/**
 * @descripttion: 点赞命令
 * @return {*}
 */
export class LikeCommand implements Command<LikeReceiver> {
  receiver: LikeReceiver;

  constructor(postId: number, type: "trend" | "article") {
    this.receiver = new LikeReceiver(postId, type);
  }
  async execute(users_permissions_user: number): Promise<{
    id: number;
  }> {
    return this.receiver.like(users_permissions_user);
  }
}

/**
 * @descripttion: 取消点赞处理类
 * @return {*}
 */
class UnlikeReceiver {
  trend?: number;
  article?: number;
  api: string;
  type: "trend" | "article";
  users_permissions_user?: number;

  constructor(postId: number, type: "trend" | "article") {
    this.type = type;
    if (type == "trend") {
      this.api = "/trends/" + postId;
    } else {
      this.api = "/articles/" + postId;
    }
  }

  async unlike(users_permissions_user: number): Promise<void> {
    this.users_permissions_user = users_permissions_user;

    const response = await httpPut<
      PostRequest<{
        id: number;
      }>
    >(this.api, {
      data: {
        likeUsers: {
          disconnect: [this.users_permissions_user],
        },
      },
    });
    if (response.data) {
      notify({
        text: "取消点赞成功",
        type: "warn",
      });
    }
  }
}

/**
 * @descripttion: 取消点赞命令
 * @return {*}
 */
export class UnlikeCommand implements Command<UnlikeReceiver> {
  receiver: UnlikeReceiver;

  constructor(postId: number, type: "trend" | "article") {
    this.receiver = new UnlikeReceiver(postId, type);
  }

  async execute(users_permissions_user: number): Promise<void> {
    await this.receiver.unlike(users_permissions_user);
  }
}

/**
 * @descripttion: 评论处理类
 * @return {*}
 */
class CommentReceiver {
  postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }

  async comment() {
    // 发送评论请求给后端
  }
}

/**
 * @descripttion: 收藏处理类
 * @return {*}
 */
class BookmarkReceiver {
  postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }

  async bookmark() {
    // 发送收藏请求给后端
    const response = await fetch(`/api/posts/${this.postId}/bookmark`, {
      method: "POST",
      // 可以根据需要设置其他请求参数
    });

    if (response.ok) {
      // 更新界面显示，例如显示收藏成功等
      console.log("收藏成功");
    } else {
      console.error("收藏失败");
    }
  }
}

/**
 * @descripttion: 收藏命令
 * @return {*}
 */
export class BookmarkCommand implements Command<BookmarkReceiver> {
  receiver: BookmarkReceiver;

  constructor(postId: number) {
    this.receiver = new BookmarkReceiver(postId);
  }

  async execute(): Promise<any> {
    return this.receiver.bookmark();
  }
}
