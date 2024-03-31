/**
 * @descripttion:选项结构
 * @return {*}
 */
export interface Optionlist {
  id: number;
  title: string;
}

/**
 * @descripttion:标签
 * @return {*}
 */
export interface Labels {
  id: number;
  attributes: {
    title: string;
  };
}
/**
 * @descripttion: 分类与子标签
 * @return {*}
 */
export interface Classification {
  id: number;
  attributes: {
    title: string;
    labels: {
      data: Labels[];
    };
  };
}
