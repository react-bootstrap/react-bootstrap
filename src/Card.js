import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';
import createWithBsPrefix from './utils/createWithBsPrefix';

import CardBody from './CardBody';
import CardImg from './CardImg';
import CardTitle from './CardTitle';
import CardSubtitle from './CardSubtitle';

class Card extends React.Component {
  static propTypes = {
    /**
     * @default 'card'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    return <Component className={classNames(bsPrefix, className)} {...props} />;
  }
}

const DecoratedCard = createBootstrapComponent(Card, 'card');
DecoratedCard.Body = CardBody;
DecoratedCard.Img = CardImg;
DecoratedCard.Title = CardTitle;
DecoratedCard.Subtitle = CardSubtitle;

DecoratedCard.Link = createWithBsPrefix('card-link', {
  Component: 'a'
});
DecoratedCard.Text = createWithBsPrefix('card-text', {
  Component: 'p'
});
DecoratedCard.Header = createWithBsPrefix('card-header');
DecoratedCard.Footer = createWithBsPrefix('card-footer');
DecoratedCard.ImgOverlay = createWithBsPrefix('card-img-overlay');

export default DecoratedCard;
