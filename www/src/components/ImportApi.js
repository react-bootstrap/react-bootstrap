import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'astroturf';
import copy from 'copy-text-to-clipboard';
import { useState, forwardRef, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import useEventCallback from '@restart/hooks/useEventCallback';

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

const CopyTooltip = forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Tooltip ref={ref} {...props}>
        {children}
      </Tooltip>
    );
  },
);

const CopyImport = ({ name }) => {
  const [text, setText] = useState(COPY_IMPORT_TEXT);

  const handleCopy = useEventCallback(() => {
    const toBeCopied = `import ${name} from 'react-bootstrap/${name}'`;
    copy(toBeCopied);
    setText(COPIED_IMPORT_TEXT);
  });

  const handleTooltipExited = useEventCallback(() => {
    setText(COPY_IMPORT_TEXT);
  });

  return (
    <OverlayTrigger
      onExited={handleTooltipExited}
      trigger={['hover', 'focus']}
      overlay={
        <CopyTooltip id={`copy-${name}-import-tooltip`}>{text}</CopyTooltip>
      }
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
