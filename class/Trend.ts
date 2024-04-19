import type { TrendHome, Comment_cs } from "~/type";
import { LikeCommand, BookmarkCommand } from "@/class/TrendCommand";
import { postComments } from "@/api";
const { notify } = useNotification();
/**
 * @descripttion:动态类
 * @return {*}
 */
export class Trend {
  public trend: TrendHome;
  public haveYouBeenLikedOrNot: boolean = false;
  public whetherItIsCollected: boolean = false;
  public doYouWantToOpenComments: boolean = false;
  public like: LikeCommand;
  public bookmark: BookmarkCommand;
  protected type: string = "trends";

  constructor(trend: TrendHome) {
    this.trend = trend;
    this.like = new LikeCommand(trend.id);
    this.bookmark = new BookmarkCommand(trend.id);
  }
  /**
   * @descripttion: 切换评论点赞状态
   * @return {*}
   */
  switchCommentStatus(): void {
    this.doYouWantToOpenComments = !this.doYouWantToOpenComments;
  }

  /**
   * @descripttion: 点赞
   * @return {*}
   */
  likeDo(): void {
    this.like.execute();
  }

  /**
   * @descripttion:评论
   * @param {string} text
   * @return {*}
   */
  commentDo(text?: string): void {
    const me = useMystore();
    if (!text) {
      notify({
        title: "警告",
        text: "请输入内容",
        type: "warn",
      });
      return;
    }
    postComments({
      content: text,
      trend: this.trend.id,
      users_permissions_user: me.getMe.id,
    }).then((data) => {
      this.trend.attributes.comment_cs.data.unshift({
        id: data.data.id,
        attributes: {
          ...data.data.attributes!,
          users_permissions_user: {
            data: {
              id: me.getMe.id,
              attributes: {
                username: me.getMe.username,
                avatart: {
                  id: me.getMe.avatart?.id!,
                  data: {
                    attributes: me.getMe.avatart!,
                  },
                },
              },
            },
          },
        },
      });
      notify({
        title: "成功",
        text: "发布成功",
        type: "success",
      });
    });
  }

  /**
   * @descripttion:收藏
   * @return {*}
   */
  bookmarkDo(): void {
    this.bookmark.execute();
  }
  /**
   * @descripttion: 获取评论列表
   * @return {*}
   */
  getComment_cs(): Comment_cs[] {
    return this.trend.attributes.comment_cs.data;
  }
}
