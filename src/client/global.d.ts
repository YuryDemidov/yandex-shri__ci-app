type Dispose = () => void;
type InsertCssItem = () => Dispose;
type GetCSSItem = () => string;
type GetContent = () => string;

interface Style {
  [key: string]: InsertCssItem | GetCSSItem | GetContent | string;
  _insertCss: InsertCssItem;
  _getCss: GetCSSItem;
  _getContent: GetContent;
}

declare module '*.module.scss' {
  const style: Style;
  export default style;
}

declare module '*.module.css' {
  const style: Style;
  export default style;
}

declare module 'isomorphic-style-loader/useStyles' {
  export default function useStyles(...styles: Style[]): void;
}

declare module 'isomorphic-style-loader/StyleContext' {
  import { Context } from 'react';

  type RemoveGlobalCss = () => void;
  type InsertCSS = (...styles: Style[]) => RemoveGlobalCss | void;
  interface StyleContextValue {
    insertCss: InsertCSS;
  }

  const StyleContext: Context<StyleContextValue>;

  export { StyleContext as default, InsertCSS };
}

declare module '*.scss';
declare module '*.svg';
declare module '*.png';
