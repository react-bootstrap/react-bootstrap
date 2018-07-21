import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import transition from 'dom-helpers/transition';
import Transition from 'react-transition-group/Transition';

import triggerBrowserReflow from './utils/triggerBrowserReflow';
import { createBootstrapComponent } from './ThemeProvider';

const isTransitioning = s => s === 'exiting' || s === 'entering';
const isActive = s => s === 'entered' || s === 'exiting';

const propTypes = {
  /**
   * @default 'carousel-item'
   */
  bsPrefix: PropTypes.string,
  direction: PropTypes.oneOf(['prev', 'next']),
  onSlideStart: PropTypes.func,
  onSlideEnd: PropTypes.func,
  active: PropTypes.bool,
  animateIn: PropTypes.bool,
  animateOut: PropTypes.bool,
  index: PropTypes.number,
};

const defaultProps = {
  active: false,
  animateIn: false,
  animateOut: false,
};

class CarouselItem extends React.Component {
  handleExit = () => {
    if (this.props.onSlideStart) {
      this.props.onSlideStart();
    }
  };

  handleExiting = () => {
    if (this.props.onSlideEnd) {
      this.props.onSlideEnd();
    }
  };

  render() {
    const {
      bsPrefix,
      direction,
      active,
      children,
      className,
      ...props
    } = this.props;

    delete props.onAnimateOutEnd;
    delete props.index;

    let orderClassName, directionalClassName;

    if (direction === 'next') {
      orderClassName = `${bsPrefix}-next`;
      directionalClassName = `${bsPrefix}-left`;
    } else if (direction === 'prev') {
      orderClassName = `${bsPrefix}-prev`;
      directionalClassName = `${bsPrefix}-right`;
    }

    return (
      <Transition
        in={active}
        addEndListener={(node, done) => transition.end(node, done)}
        onExit={this.handleExit}
        onExited={this.handleExiting}
        onEnter={triggerBrowserReflow}
      >
        {state => (
          <div
            className={classNames(
              className,
              bsPrefix,
              isActive(state) && 'active',
              isTransitioning(state) && directionalClassName,
              ((state === 'exited' && active) || state === 'entering') &&
                orderClassName,
            )}
          >
            {children}
          </div>
        )}
      </Transition>
    );
  }
}

CarouselItem.propTypes = propTypes;
CarouselItem.defaultProps = defaultProps;

export default createBootstrapComponent(CarouselItem, 'carousel-item');
