import type { ArticleInfo, Comment, Comment_cs } from "@/type/index";
import { BookmarkCommand, LikeCommand } from "./TrendCommand";
import { postComments } from "@/api";
const { notify } = useNotification();

/**
 * @descripttion: 文章类
 * @return {*}
 */
export class Article {
  public article: ArticleInfo;
  public haveYouBeenLikedOrNot: boolean = false;
  public whetherItIsCollected: boolean = false;
  public doYouWantToOpenComments: boolean = false;
  public like: LikeCommand;
  public bookmark: BookmarkCommand;
  protected type: "article" = "article";
  constructor(article: ArticleInfo) {
    this.article = article;
    this.like = new LikeCommand(article.id, this.type);
    this.bookmark = new BookmarkCommand(article.id);
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
      article: this.article.id,
      users_permissions_user: me.getMe.id,
    }).then((data) => {
      this.article.attributes.comment_cs.data.unshift({
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
   * @descripttion: 获取评论列表
   * @return {*}
   */
  getComment_cs(): Comment_cs[] {
    return this.article.attributes.comment_cs.data;
  }
}
