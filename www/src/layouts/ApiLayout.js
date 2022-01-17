import PropTypes from 'prop-types';

import Main from '../components/Main';
import Default from './index';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function ComponentsLayout({ children, ...props }) {
  return (
    <Default {...props}>
      <Main location={props.location}>{children}</Main>
    </Default>
  );
}

ComponentsLayout.propTypes = propTypes;

export default ComponentsLayout;
