import styled from 'astroturf';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';

import { version } from '../../../package.json';

const Link = styled('a')`
  font-size: 1rem;
  padding: 0 0.5rem;
`;

export default (props) => {
  const { component } = props;
  const linkToComponentOnGitHub = `//github.com/react-bootstrap/react-bootstrap/tree/v${version}/src/${component}.tsx`;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip id={`view-${component}-source-tooltip`}>
          View source file
        </Tooltip>
      }
    >
      <Link href={linkToComponentOnGitHub} className="js-search-exclude">
        <FontAwesomeIcon icon={faCode} />
        <span className="visually-hidden">view source file</span>
      </Link>
    </OverlayTrigger>
  );
};
