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

const propTypes = {
  target: PropTypes.any.isRequired,
  as: PropTypes.elementType,
};

const defaultProps = {
  as: 'span',
};

const Anchor = ({ as: Tag, className, children, target }) => (
  <Tag className={cn(className, styles.wrapper)}>
    {children}
    <a href={`#${target}`} className={styles.anchor} aria-hidden>
      <span aria-hidden>#</span>
    </a>
  </Tag>
);

Anchor.propTypes = propTypes;
Anchor.defaultProps = defaultProps;

export default Anchor;
