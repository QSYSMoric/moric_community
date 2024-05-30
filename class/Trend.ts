import type { TrendHome, Comment_cs } from "~/type";
import { LikeCommand, BookmarkCommand, UnlikeCommand } from "@/class/TrendCommand";
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
  public unlike: UnlikeCommand;
  protected type: "trend" = "trend";
  public isLiked: boolean = false;

  constructor(trend: TrendHome) {
    this.trend = trend;
    this.like = new LikeCommand(trend.id, this.type);
    this.bookmark = new BookmarkCommand(trend.id);
    this.unlike = new UnlikeCommand(trend.id, this.type);
    const me = useMystore();
    if (me.isLongin) {
      let data = this.trend.attributes.likeUsers.data.findIndex((element) => {
        return element.id == me.getMe.id;
      });
      this.isLiked = !!~data;
    }
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
    const me = useMystore();
    if (this.isLiked) {
      this.unlike.execute(me.getMe.id).then((data) => {
        this.isLiked = false;
        this.trend.attributes.likeUsers.data.length--;
      });
    } else {
      this.like.execute(me.getMe.id).then((data) => {
        this.isLiked = true;
        this.trend.attributes.likeUsers.data.push({
          id: me.getMe.id,
          attributes: {
            username: me.getMe.username,
          },
        });
      });
    }
  }

  /**
   * @descripttion:评论
   * @param {string} text
   * @return {*}
   */
  commentDo(text?: string): void {
    const me = useMystore();
    const { ruleWordFilter } = useFormRules();
    if (!ruleWordFilter(text!)) {
      notify({
        title: "错误",
        text: "你输入的内容含有敏感词请重新输入",
        type: "warn",
      });
      return;
    }

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
        id: data.data!.id,
        attributes: {
          ...data.data!.attributes!,
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
