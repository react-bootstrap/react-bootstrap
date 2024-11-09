import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

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
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Color, Variant } from './types';

export interface CardProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  text?: Color;
  border?: Variant;
  body?: boolean;
}

const propTypes = {
  /**
   * @default 'card'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets card background
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  bg: PropTypes.string,

  /**
   * Sets card text color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|'white'|'muted')}
   */
  text: PropTypes.string,

  /**
   * Sets card border color
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  border: PropTypes.string,

  /**
   * When this prop is set, it creates a Card with a Card.Body inside
   * passing the children directly to it
   */
  body: PropTypes.bool,

  as: PropTypes.elementType,
};

const Card: BsPrefixRefForwardingComponent<'div', CardProps> = React.forwardRef<
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
) as typeof Card;

Card.displayName = 'Card';
Card.propTypes = propTypes;

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
