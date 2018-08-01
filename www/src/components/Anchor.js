import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { css } from 'css-literal-loader/styled';

const styles = css`
  .heading {
    position: relative;

    &:before {
      display: block;
      height: 6rem;
      margin-top: -6rem;
      visibility: hidden;
      content: '';
    }
  }

  .anchor {
    font-size: 90%;
    position: absolute;
    left: -0.9em;
    padding-top: 0.1em;
    padding-right: 0.4em;
    opacity: 0;

    &:focus,
    .heading:hover & {
      text-decoration: none;
      opacity: 0.5;
    }
  }
`;

class Anchor extends React.Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
  };

  render() {
    const { as: Tag = 'div', className } = this.props;

    return (
      <Tag className={cn(className, styles.heading)} id={this.props.id}>
        {this.props.children}
        <a href={`#${this.props.id}`} className={styles.anchor}>
          #
        </a>
      </Tag>
    );
  }
}

export default Anchor;
