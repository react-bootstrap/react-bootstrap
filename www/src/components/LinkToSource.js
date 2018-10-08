import React from 'react';
import { styled } from 'css-literal-loader/styled';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import { version } from '../../../package.json';

const Link = styled('a')`
  font-size: 1rem;
  padding: 0 0.5rem;
`;

export default props => {
  const { component } = props;
  const linkToComponentOnGitHub = `//github.com/react-bootstrap/react-bootstrap/tree/v${version}/src/${component}.js`;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip id={`view-${component}-source-tooltip`}>
          View source file
        </Tooltip>
      }
    >
      <Link href={linkToComponentOnGitHub} className="js-search-exclude">
        <i className="fas fa-code" />
        <span className="sr-only">view source file</span>
      </Link>
    </OverlayTrigger>
  );
};
