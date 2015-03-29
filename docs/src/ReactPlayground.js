/* eslint-disable */
import React from 'react';
import classSet from 'classnames';
import Accordion from '../../src/Accordion';
import Alert from '../../src/Alert';
import Badge from '../../src/Badge';
import Button from '../../src/Button';
import ButtonGroup from '../../src/ButtonGroup';
import ButtonToolbar from '../../src/ButtonToolbar';
import CollapsableNav from '../../src/CollapsableNav';
import CollapsableMixin from '../../src/CollapsableMixin';
import Carousel from '../../src/Carousel';
import CarouselItem from '../../src/CarouselItem';
import Col from '../../src/Col';
import DropdownButton from '../../src/DropdownButton';
import Glyphicon from '../../src/Glyphicon';
import Grid from '../../src/Grid';
import Input from '../../src/Input';
import Jumbotron from '../../src/Jumbotron';
import Label from '../../src/Label';
import ListGroup from '../../src/ListGroup';
import ListGroupItem from '../../src/ListGroupItem';
import Nav from '../../src/Nav';
import Navbar from '../../src/Navbar';
import NavItem from '../../src/NavItem';
import MenuItem from '../../src/MenuItem';
import Modal from '../../src/Modal';
import ModalTrigger from '../../src/ModalTrigger';
import OverlayTrigger from '../../src/OverlayTrigger';
import OverlayMixin from '../../src/OverlayMixin';
import PageHeader from '../../src/PageHeader';
import PageItem from '../../src/PageItem';
import Pager from '../../src/Pager';
import Panel from '../../src/Panel';
import PanelGroup from '../../src/PanelGroup';
import Popover from '../../src/Popover';
import ProgressBar from '../../src/ProgressBar';
import Row from '../../src/Row';
import SplitButton from '../../src/SplitButton';
import TabbedArea from '../../src/TabbedArea';
import Table from '../../src/Table';
import TabPane from '../../src/TabPane';
import Tooltip from '../../src/Tooltip';
import Well from '../../src/Well';
/* eslint-enable */

import {CodeMirror, IS_NODE} from './CodeMirror';
import babel from 'babel/browser';

const IS_MOBILE = typeof navigator !== 'undefined' && (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  );

const CodeMirrorEditor = React.createClass({
  componentDidMount() {
    if (IS_MOBILE || IS_NODE) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: false,
      lineWrapping: false,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.handleChange);
  },

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  render() {
    // wrap in a div to fully contain CodeMirror
    let editor;

    if (IS_MOBILE) {
      let preStyles = {overflow: 'scroll'};
      editor = <pre style={preStyles}>{this.props.codeText}</pre>;
    } else {
      editor = <textarea ref='editor' defaultValue={this.props.codeText} />;
    }

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
      );
  }
});

const selfCleaningTimeout = {
  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  },

  setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }
};

const ReactPlayground = React.createClass({
  mixins: [selfCleaningTimeout],

  MODES: {JSX: 'JSX', JS: 'JS', NONE: null},

  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    transformer: React.PropTypes.func,
    renderCode: React.PropTypes.bool
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
      mode: this.MODES.NONE,
      code: this.props.codeText
    };
  },

  handleCodeChange(value) {
    this.setState({code: value});
    this.executeCode();
  },

  handleCodeModeSwitch(mode) {
    this.setState({mode: mode});
  },

  handleCodeModeToggle(e) {
    let mode;

    e.preventDefault();

    switch (this.state.mode) {
      case this.MODES.NONE:
        mode = this.MODES.JSX;
        break;
      case this.MODES.JSX:
      default:
        mode = this.MODES.NONE;
    }

    this.setState({mode: mode});
  },

  compileCode() {
    return this.props.transformer(this.state.code);
  },

  render() {
    let classes = {
      'bs-example': true
    };
    let toggleClasses = {
      'code-toggle': true
    };
    let editor;

    if (this.props.exampleClassName){
      classes[this.props.exampleClassName] = true;
    }

    if (this.state.mode !== this.MODES.NONE) {
       editor = (
           <CodeMirrorEditor
             key='jsx'
             onChange={this.handleCodeChange}
             className='highlight'
             codeText={this.state.code}/>
        );
       toggleClasses.open = true;
    }
    return (
      <div className='playground'>
        <div className={classSet(classes)}>
          <div ref='mount' />
        </div>
        {editor}
        <a className={classSet(toggleClasses)} onClick={this.handleCodeModeToggle} href='#'>{this.state.mode === this.MODES.NONE ? 'show code' : 'hide code'}</a>
      </div>
      );
  },

  componentDidMount() {
    this.executeCode();
  },

  componentWillUpdate(nextProps, nextState) {
    // execute code only when the state's not being updated by switching tab
    // this avoids re-displaying the error, which comes after a certain delay
    if (this.state.code !== nextState.code) {
      this.executeCode();
    }
  },

  componentWillUnmount() {
    let mountNode = this.refs.mount.getDOMNode();
    try {
      React.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e);
    }
  },

  executeCode() {
    let mountNode = this.refs.mount.getDOMNode();

    try {
      React.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e);
    }

    try {
      let compiledCode = this.compileCode();
      if (this.props.renderCode) {
        React.render(
          <CodeMirrorEditor codeText={compiledCode} readOnly={true} />,
          mountNode
        );
      } else {
        /* eslint-disable */
        eval(compiledCode);
        /* eslint-enable */
      }
    } catch (err) {
      this.setTimeout(() => {
        React.render(
          <Alert bsStyle='danger'>{err.toString()}</Alert>,
          mountNode
        );
      }, 500);
    }
  }
});

export default ReactPlayground;
