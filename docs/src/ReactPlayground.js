// These do not use ES6 imports, because the evaluated code requires un-mangled
// variable names.

/* eslint-disable */
const classNames = require('classnames');
const React = require('react');
const ReactDOM = require('react-dom');

// Keep these in sync with src/index.js.
const Accordion = require('../../src/Accordion').default;
const Alert = require('../../src/Alert').default;
const Badge = require('../../src/Badge').default;
const Breadcrumb = require('../../src/Breadcrumb').default;
const Button = require('../../src/Button').default;
const ButtonGroup = require('../../src/ButtonGroup').default;
const ButtonToolbar = require('../../src/ButtonToolbar').default;
const Carousel = require('../../src/Carousel').default;
const CarouselItem = require('../../src/CarouselItem').default;
const Checkbox = require('../../src/Checkbox').default;
const Clearfix = require('../../src/Clearfix').default;
const Col = require('../../src/Col').default;
const Collapse = require('../../src/Collapse').default;
const ControlLabel = require('../../src/ControlLabel').default;
const Dropdown = require('../../src/Dropdown').default;
const DropdownButton = require('../../src/DropdownButton').default;
const Fade = require('../../src/Fade').default;
const Form = require('../../src/Form').default;
const FormControl = require('../../src/FormControl').default;
const FormGroup = require('../../src/FormGroup').default;
const Glyphicon = require('../../src/Glyphicon').default;
const Grid = require('../../src/Grid').default;
const HelpBlock = require('../../src/HelpBlock').default;
const Image = require('../../src/Image').default;
const InputGroup = require('../../src/InputGroup').default;
const Jumbotron = require('../../src/Jumbotron').default;
const Label = require('../../src/Label').default;
const ListGroup = require('../../src/ListGroup').default;
const ListGroupItem = require('../../src/ListGroupItem').default;
const Media = require('../../src/Media').default;
const MenuItem = require('../../src/MenuItem').default;
const Modal = require('../../src/Modal').default;
const Nav = require('../../src/Nav').default;
const Navbar = require('../../src/Navbar').default;
const NavbarBrand = require('../../src/NavbarBrand').default;
const NavDropdown = require('../../src/NavDropdown').default;
const NavItem = require('../../src/NavItem').default;
const Overlay = require('../../src/Overlay').default;
const OverlayTrigger = require('../../src/OverlayTrigger').default;
const PageHeader = require('../../src/PageHeader').default;
const Pager = require('../../src/Pager').default;
const Pagination = require('../../src/Pagination').default;
const Panel = require('../../src/Panel').default;
const PanelGroup = require('../../src/PanelGroup').default;
const Popover = require('../../src/Popover').default;
const ProgressBar = require('../../src/ProgressBar').default;
const Radio = require('../../src/Radio').default;
const ResponsiveEmbed = require('../../src/ResponsiveEmbed').default;
const Row = require('../../src/Row').default;
const SafeAnchor = require('../../src/SafeAnchor').default;
const SplitButton = require('../../src/SplitButton').default;
const Tab = require('../../src/Tab').default;
const TabContainer = require('../../src/TabContainer').default;
const TabContent = require('../../src/TabContent').default;
const Table = require('../../src/Table').default;
const TabPane = require('../../src/TabPane').default;
const Tabs = require('../../src/Tabs').default;
const Thumbnail = require('../../src/Thumbnail').default;
const Tooltip = require('../../src/Tooltip').default;
const Well = require('../../src/Well').default;

const bootstrapUtils = require('../../src/utils/bootstrapUtils');

/* eslint-enable */

import {transform} from 'babel-standalone';
import CodeExample from './CodeExample';

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
      mode: 'jsx',
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
          mode="jsx"
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

const ReactPlayground = React.createClass({
  mixins: [selfCleaningTimeout],

  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    transformer: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transformer(code) {
        return transform(code, {
          presets: ['es2015-loose', 'react', 'stage-1']
        }).code;
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
  }
});

export default ReactPlayground;
