// These do not use ES6 imports, because the evaluated code requires un-mangled
// variable names.

/* eslint-disable */
const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const createReactClass = require('create-react-class');
const ReactDOM = require('react-dom');

const Accordion = require('../../src/Accordion');
const Alert = require('../../src/Alert');
const Badge = require('../../src/Badge');
const Breadcrumb = require('../../src/Breadcrumb');
const Button = require('../../src/Button');
const ButtonGroup = require('../../src/ButtonGroup');
const ButtonInput = require('../../src/ButtonInput');
const ButtonToolbar = require('../../src/ButtonToolbar');
const Carousel = require('../../src/Carousel');
const CarouselItem = require('../../src/CarouselItem');
const Clearfix = require('../../src/Clearfix');
const Col = require('../../src/Col');
const Collapse = require('../../src/Collapse');
const CollapsibleNav = require('../../src/CollapsibleNav');
const Dropdown = require('../../src/Dropdown');
const DropdownButton = require('../../src/DropdownButton');
const DropdownMenu = require('../../src/DropdownMenu');
const Fade = require('../../src/Fade');
const FormControls = require('../../src/FormControls');
const Glyphicon = require('../../src/Glyphicon');
const Grid = require('../../src/Grid');
const Input = require('../../src/Input');
const Image = require('../../src/Image');
const Jumbotron = require('../../src/Jumbotron');
const Label = require('../../src/Label');
const ListGroup = require('../../src/ListGroup');
const ListGroupItem = require('../../src/ListGroupItem');
const Media = require('../../src/Media');
const MenuItem = require('../../src/MenuItem');
const Modal = require('../../src/Modal');
const Nav = require('../../src/Nav');
const Navbar = require('../../src/Navbar');
const NavItem = require('../../src/NavItem');
const NavDropdown = require('../../src/NavDropdown');
const Overlay = require('../../src/Overlay');
const OverlayTrigger = require('../../src/OverlayTrigger');
const PageHeader = require('../../src/PageHeader');
const PageItem = require('../../src/PageItem');
const Pager = require('../../src/Pager');
const Pagination = require('../../src/Pagination');
const Panel = require('../../src/Panel');
const PanelGroup = require('../../src/PanelGroup');
const Popover = require('../../src/Popover');
const ProgressBar = require('../../src/ProgressBar');
const ResponsiveEmbed = require('../../src/ResponsiveEmbed');
const Row = require('../../src/Row');
const SplitButton = require('../../src/SplitButton');
const Tab = require('../../src/Tab');
const Table = require('../../src/Table');
const Tabs = require('../../src/Tabs');
const Thumbnail = require('../../src/Thumbnail');
const Tooltip = require('../../src/Tooltip');
const Well = require('../../src/Well');
/* eslint-enable */

import babel from 'babel-core/browser';
import CodeExample from './CodeExample';

// This is only used for the ReactPlayground component, not for any of the
// examples, so it's fine to import like this.
import SafeAnchor from '../../src/SafeAnchor';

const IS_MOBILE = typeof navigator !== 'undefined' && (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  );

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (IS_MOBILE || CodeMirror === undefined) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'text/jsx',
      lineNumbers: false,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    // wrap in a div to fully contain CodeMirror
    let editor;

    if (IS_MOBILE) {
      editor = (
        <CodeExample
          mode="javascript"
          codeText={this.props.codeText}
        />
      );
    } else {
      editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
    }

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
      );
  }
}

const selfCleaningTimeout = {
  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  },

  updateTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }
};

const ReactPlayground = createReactClass({
  displayName: 'ReactPlayground',
  mixins: [selfCleaningTimeout],

  propTypes: {
    codeText: PropTypes.string.isRequired,
    transformer: PropTypes.func
  },

  getDefaultProps() {
    return {
      transformer(code) {
        return babel.transform(code).code;
      }
    };
  },

  getInitialState() {
    return {
      code: this.props.codeText,
      codeChanged: false,
      showCode: false
    };
  },

  componentWillMount() {
    // For the initial render, we can hijack React.render to intercept the
    // example element and render it normally. This is safe because it's code
    // that we supply, so we can ensure ahead of time that it won't throw an
    // exception while rendering.
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this._initialExample = element;

    // Stub out mountNode for the example code.
    const mountNode = null;  // eslint-disable-line no-unused-vars

    try {
      const compiledCode = this.props.transformer(this.props.codeText);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } finally {
      ReactDOM.render = originalRender;
    }
  },

  componentWillUnmount() {
    this.clearExample();
  },

  handleCodeChange(value) {
    this.setState(
      {code: value, codeChanged: true},
      this.executeCode
    );
  },

  handleCodeModeToggle() {
    this.setState({
      showCode: !this.state.showCode
    });
  },

  render() {
    return (
      <div className="playground">
        {this.renderExample()}

        {this.renderEditor()}
        {this.renderToggle()}
      </div>
    );
  },

  renderExample() {
    let example;
    if (this.state.codeChanged) {
      example = (
        <div ref="mount" />
      );
    } else {
      example = (
        <div>{this._initialExample}</div>
      );
    }

    return (
      <div className={classNames('bs-example', this.props.exampleClassName)}>
        {example}
      </div>
    );
  },

  renderEditor() {
    if (!this.state.showCode) {
      return null;
    }

    return (
      <CodeMirrorEditor
        key="jsx"
        onChange={this.handleCodeChange}
        className="highlight"
        codeText={this.state.code}
      />
    );
  },

  renderToggle() {
    return (
      <SafeAnchor
        className={classNames('code-toggle', {'open': this.state.showCode})}
        onClick={this.handleCodeModeToggle}
      >
        {this.state.showCode ? 'hide code' : 'show code'}
      </SafeAnchor>
    );
  },

  clearExample() {
    if (!this.state.codeChanged) {
      return null;
    }

    const mountNode = this.refs.mount;
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    return mountNode;
  },

  executeCode() {
    const mountNode = this.clearExample();

    let compiledCode = null;
    try {
      compiledCode = this.props.transformer(this.state.code);

      /* eslint-disable */
      eval(compiledCode);
      /* eslint-enable */
    } catch (err) {
      if (compiledCode !== null) {
        console.log(err, compiledCode); // eslint-disable-line no-console
      } else {
        console.log(err); // eslint-disable-line no-console
      }

      this.updateTimeout(
        () => {
          ReactDOM.render(
            <Alert bsStyle="danger">
              {err.toString()}
            </Alert>,
            mountNode
          );
        },
        500
      );
    }
  },
});

export default ReactPlayground;
