export interface DemoProps {
  /**
   * 源码字符串(需经过encodeURIComponent处理)
   */
  code: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 描述
   */
  desc?: string;
  /**
   * 语言
   */
  lang?: string;
}
