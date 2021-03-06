import PropTypes from 'prop-types';

import { css } from 'astroturf';

const styles = css`
  @import '../css/theme';

  .callout {
    border-left: 4px solid transparent;
    padding: 1.2rem 1.2rem 1.2rem calc(1rem - 4px);
    margin-left: -1rem;
    margin-bottom: 2rem;
  }

  .warning {
    composes: callout;
    background-color: transparentize($note, 0.7);
    border-left-color: $note;
  }
  .danger {
    composes: callout;
    background-color: transparentize($error, 0.7);
    border-left-color: $error;
  }
`;

const propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.oneOf(['danger', 'warning']),
};

function Callout({ title, children, theme }) {
  return (
    <aside role="note" className={styles[theme || 'warning']}>
      {title && <header className="h5">{title}</header>}
      <div>{children}</div>
    </aside>
  );
}

Callout.propTypes = propTypes;

export default Callout;
