import React from 'react';
import { version } from '../../../package.json';

export default props => {
  const { component } = props;
  const linkToComponentOnGitHub = `//github.com/react-bootstrap/react-bootstrap/tree/v${version}/src/${component}.js`;
  return (
    <a
      className="link-to-source"
      href={linkToComponentOnGitHub}
      alt={`View source code for ${component}`}
    >
      [source]
    </a>
  );
};
