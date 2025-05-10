import classNames from 'classnames';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardImg from './CardImg';
import CardImgOverlay from './CardImgOverlay';
import CardLink from './CardLink';
import CardSubtitle from './CardSubtitle';
import CardText from './CardText';
import CardTitle from './CardTitle';
import type { Color, Variant } from './types';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets card background
   *
   * @type {'primary' | 'secondary' | 'success' |'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  bg?: Variant | undefined;

  /**
   * Sets card text color
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted' | undefined}
   */
  text?: Color | undefined;

  /**
   * Sets card border color
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  border?: Variant | undefined;

  /**
   * When this prop is set, it creates a Card with a Card.Body inside
   * passing the children directly to it
   */
  body?: boolean | undefined;
}

const Card: DynamicRefForwardingComponent<'div', CardProps> = React.forwardRef<
  HTMLElement,
  CardProps
>(
  (
    {
      bsPrefix,
      className,
      bg,
      text,
      border,
      body = false,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'card');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          prefix,
          bg && `bg-${bg}`,
          text && `text-${text}`,
          border && `border-${border}`,
        )}
      >
        {body ? <CardBody>{children}</CardBody> : children}
      </Component>
    );
  },
);

Card.displayName = 'Card';

export default Object.assign(Card, {
  Img: CardImg,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Link: CardLink,
  Text: CardText,
  Header: CardHeader,
  Footer: CardFooter,
  ImgOverlay: CardImgOverlay,
});
