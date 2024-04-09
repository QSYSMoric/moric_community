import type { Command } from "@/type/designPattern";

/**
 * @descripttion: 点赞处理类
 * @return {*}
 */
class LikeReceiver {
  postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }

  async like() {
    // 发送点赞请求给后端
    const response = await fetch(`/api/posts/${this.postId}/like`, {
      method: "POST",
      // 可以根据需要设置其他请求参数
    });

    if (response.ok) {
      // 更新界面显示，例如增加点赞计数等
      console.log("点赞成功");
    } else {
      console.error("点赞失败");
    }
  }
}

/**
 * @descripttion: 点赞命令
 * @return {*}
 */
export class LikeCommand implements Command<LikeReceiver> {
  receiver: LikeReceiver;
  constructor(postId: number) {
    this.receiver = new LikeReceiver(postId);
  }
  async execute(): Promise<any> {}
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
