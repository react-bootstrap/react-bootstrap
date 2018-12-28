import * as React from 'react';

import { default as CardImg } from './CardImg';

import { BsPrefixComponent } from './helpers';

declare class CardTitle<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class CardSubtitle<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class CardBody<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class CardLink<
  As extends React.ReactType = 'a'
> extends BsPrefixComponent<As> {}

declare class CardText<
  As extends React.ReactType = 'p'
> extends BsPrefixComponent<As> {}

declare class CardHeader<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class CardFooter<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

declare class CardImgOverlay<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export interface CardProps {
  bg?:
    | string
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  text?:
    | string
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'white'
    | 'muted';
  border?:
    | string
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  body?: boolean;
}

declare class Card<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, CardProps> {
  public static Img: typeof CardImg;
  public static Title: typeof CardTitle;
  public static Subtitle: typeof CardSubtitle;
  public static Body: typeof CardBody;
  public static Link: typeof CardLink;
  public static Text: typeof CardText;
  public static Header: typeof CardHeader;
  public static Footer: typeof CardFooter;
  public static ImgOverlay: typeof CardImgOverlay;
}

export default Card;
