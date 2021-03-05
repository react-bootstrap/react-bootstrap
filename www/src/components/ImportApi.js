import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'astroturf';
import copy from 'copy-text-to-clipboard';
import { useCallback, useMemo, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Link = styled('span')`
  font-size: 1rem;
  padding: 0 0.5rem;
  cursor: pointer;
`;

const Keyword = styled('span')`
  color: #a626a4;
`;

const Code = styled('code')`
  padding: 0;
  display: inline-block;
  color: #50a14f;
  background-color: transparent;
  margin-bottom: 1rem;
`;

const COPY_IMPORT_TEXT = 'Copy import code';
const COPIED_IMPORT_TEXT = 'Copied!';

const CopyImport = ({ name }) => {
  const [text, setText] = useState(COPY_IMPORT_TEXT);
  const textToCopy = useMemo(
    () => `import ${name} from 'react-bootstrap/${name}'`,
    [name],
  );

  const handleCopy = useCallback(() => {
    copy(textToCopy);
    setText(COPIED_IMPORT_TEXT);
    setTimeout(() => setText(COPY_IMPORT_TEXT), 2000);
  }, [textToCopy]);

  return (
    <OverlayTrigger
      overlay={<Tooltip id={`copy-${name}-import-tooltip`}>{text}</Tooltip>}
    >
      <Link onClick={handleCopy} className="js-search-exclude">
        <FontAwesomeIcon icon={faCopy} />
        <span className="visually-hidden">{`Copy import code for the ${name} component`}</span>
      </Link>
    </OverlayTrigger>
  );
};

export default ({ name }) => (
  <>
    <Code aria-label={`Import code for the ${name} component`}>
      <Keyword>import</Keyword> {name} <Keyword>from</Keyword> 'react-bootstrap/
      {name}'
    </Code>
    <CopyImport name={name} />
  </>
);
