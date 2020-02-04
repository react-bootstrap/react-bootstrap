import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { css } from 'astroturf';

const styles = css`
  .wrapper {
    position: relative;
    display: inline-block;
    padding-right: 1em;
  }
  .anchor {
    font-size: 90%;
    position: absolute;
    right: 0.3em;
    padding-top: 0.1em;
    opacity: 0;

    &:focus,
    :global(.__heading):hover & {
      text-decoration: none;
      opacity: 0.5;
    }
  }
`;

class Anchor extends React.Component {
  static propTypes = {
    target: PropTypes.any.isRequired,
  };

  render() {
    const { as: Tag = 'span', className } = this.props;

    return (
      <Tag className={cn(className, styles.wrapper)}>
        {this.props.children}
        <a href={`#${this.props.target}`} className={styles.anchor} aria-hidden>
          <span aria-hidden>#</span>
        </a>
      </Tag>
    );
  }
}

export default Anchor;
