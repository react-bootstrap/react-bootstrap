import React from 'react';
import { styled } from 'css-literal-loader/styled';
import { version } from '../../../package.json';

const Link = styled('a')`
  font-size: 1rem;
  padding: 0 0.5rem;
`;

export default props => {
  const { component } = props;
  const linkToComponentOnGitHub = `//github.com/react-bootstrap/react-bootstrap/tree/v${version}/src/${component}.js`;

  return (
    <Link href={linkToComponentOnGitHub} title="view source file">
      <i className="fas fa-code" />
      <span className="sr-only">view source file</span>
    </Link>
  );
};
