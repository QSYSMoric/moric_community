import type { TrendHome } from "~/type";
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

  likeDo() {
    this.like.execute();
  }

  commentDo(text?: string) {
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
      trends: this.trend.id,
      users_permissions_user: me.getMe.id,
    }).then((data) => {
      notify({
        title: "成功",
        text: "发布成功",
        type: "success",
      });
    });
  }

  bookmarkDo() {
    this.bookmark.execute();
  }
}
