import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

import CardBody from './CardBody';
import CardImageTop from './CardImageTop';
import CardTitle from './CardTitle';
import CardText from './CardText';

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
DecoratedCard.Text = CardText;
DecoratedCard.ImageTop = CardImageTop;
DecoratedCard.Title = CardTitle;

export default DecoratedCard;
