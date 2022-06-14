require('bootstrap/dist/css/bootstrap.min.css');
// require('bootstrap/dist/css/bootstrap.rtl.min.css');

const React = require('react');
const { MDXProvider } = require('@mdx-js/react');

const Heading = require('./components/Heading');
const CodeBlock = require('./components/CodeBlock');
const LinkedHeading = require('./components/LinkedHeading');
const PageHeader = require('./components/PageHeader');

const getMode = (className = '') => {
  const [, mode] = className.match(/language-(\w+)/) || [];
  return mode;
};

const components = {
  wrapper: (props) => <React.Fragment {...props} />,
  h1: (props) => <Heading h="1" {...props} />,
  h2: (props) => <LinkedHeading h="2" {...props} />,
  h3: (props) => <LinkedHeading h="3" {...props} />,
  h4: (props) => <LinkedHeading h="4" {...props} />,
  h5: (props) => <LinkedHeading h="5" {...props} />,
  pre: (props) =>
    React.isValidElement(props.children) ? (
      <CodeBlock
        codeText={props.children.props.children}
        mode={getMode(props.children.props.className)}
      />
    ) : (
      <pre {...props} />
    ),
  PageHeader,
};

module.exports = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
