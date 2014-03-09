# react-bootstrap

[Bootstrap 3](http://getbootstrap.com) components built with [React](http://facebook.github.io/react/)

[![Build Status](https://travis-ci.org/stevoland/react-bootstrap.png)](https://travis-ci.org/stevoland/react-bootstrap) [![NPM version](https://badge.fury.io/js/react-bootstrap.png)](http://badge.fury.io/js/react-bootstrap) [![Bower version](https://badge.fury.io/bo/react-bootstrap.png)](http://badge.fury.io/bo/react-bootstrap)

Under active development - APIs will change.

## Contributors

- Huge contributions from [syllog1sm](https://github.com/syllog1sm) ([blog](http://clozeit.wordpress.com/))
- [Pieter Vanderwerff](https://github.com/pieterv)

## Contributions

Yes please!

- Run `npm install`, `npm run test-watch` to run tests while you develop (however this hides any build errors, you can see these with `grunt build`)
- Add tests for any new or changed functionality
- See [issues](https://github.com/stevoland/react-bootstrap/issues) for some ideas
- Follow exisitng style

## Getting started

You can import the lib with as AMD modules, CommonJS modules as a global JS script.

First add the bootstrap CSS to your project then:

### AMD
```
bower install react#v0.9.0
bower install react-bootstrap

var Alert = require('react-bootstrap/amd/Alert');
// or
var Alert = require('react-bootstrap/amd').Alert;
```

### CommonJS
```
npm install react@v0.9.0
npm install react-bootstrap

var Alert = require('react-bootstrap/Alert');
// or
var Alert = require('react-bootstrap').Alert;
```

### Browser globals
```
<script src="http://fb.me/react-0.9.0.js"></script>
<script src="react-bootstrap/dist/react-bootstrap.min.js"></script>
<script>
    var Alert = ReactBootstrap.Alert;
</script>
```

## Currently implemented (but under active development)

- [Nav, NavItem](#Nav)
- [Button](#Button)
- [DropdownButton](#DropdownButton)
- [SplitButton](#SplitButton)
- [MenuItem](#MenuItem)
- [TabbedArea, TabPane](#Tabs)
- [Alert](#Alert)
- [Panel, PanelGroup, Accordion](#Panel)
- [Modal, OverlayTrigger](#Modal)
- [ProgressBar](#ProgressBar)

## Up next

- Pagination, Pager
- Input

## Examples

### <a name="Nav"></a>Nav

```
var Nav     = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');

var key = 1;

function handleSelect (selectedKey) {
  key = selectedKey;
}

<Nav bsStyle="[tabs|pills]" bsVariation="[stacked|justified]" activeKey={key} onSelect={handleSelect}>
  <NavItem key={1} href="/home">NavItem 1 content</NavItem>
  <NavItem key={2} title="Item">NavItem 2 content</NavItem>
  <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>
</Nav>
```

### <a name="Button"></a>Button

```
var Button = require('react-bootstrap/Button');

<Button onClick={handleClick}>Title</Button>
```

### <a name="DropdownButton"></a>DropdownButton

```
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem       = require('react-bootstrap/MenuItem');

function handleSelect (selectedKey) {
}

<DropdownButton title="Title" onSelect={handleSelect}>
  <MenuItem key="1">MenuItem 1 content</MenuItem>
  <MenuItem key="2">MenuItem 2 content</MenuItem>
</DropdownButton>
```

### <a name="SplitButton"></a>SplitButton

```
var SplitButton = require('react-bootstrap/SplitButton');
var MenuItem    = require('react-bootstrap/MenuItem');

function handleSelect (selectedKey) {
}

<SplitButton title="Title" onSelect={handleSelect} onClick={}>
  <MenuItem key="1">MenuItem 1 content</MenuItem>
  <MenuItem key="2">MenuItem 2 content</MenuItem>
</SplitButton>
```

### <a name="MenuItem"></a>MenuItem

```
var MenuItem = require('react-bootstrap/MenuItem');

function handleSelect (key) {
}

<MenuItem key={1} bsVariation="[divider|header]" onSelect={handleSelect}>Content</MenuItem>
```

### <a name="Tabs"></a>Tabs

#### Controlled
```
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane    = require('react-bootstrap/TabPane');

var key = 1;

function handleSelect (selectedKey) {
  key = selectedKey;
}

<TabbedArea title="Title" activeKey={key} onSelect={handleSelect}>
  <TabPane tab="Tab 1" key={1}>TabPane 1 content</TabPane>
  <TabPane tab={<strong>Tab 2</strong>} key={2}>TabPane 2 content</TabPane>
</TabbedArea>
```

#### Uncontrolled
```
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane    = require('react-bootstrap/TabPane');

<TabbedArea title="Title" initialActiveKey={1}>
  <TabPane tab="Tab 1" key={1}>TabPane 1 content</TabPane>
  <TabPane tab={<strong>Tab 2</strong>} key={2}>TabPane 2 content</TabPane>
</TabbedArea>
```

### <a name="Alert"></a>Alert

```
var Alert = require('react-bootstrap/Alert');

function handleDismiss () {
}

<Alert bsStyle="danger" onDismiss={handleDismiss} dismissAfter={5000}>
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</Alert>
```

### <a name="Panel"></a>Panel

#### Controlled
```
var PanelGroup = require('react-bootstrap/PanelGroup');
var Panel    = require('react-bootstrap/Panel');

var key = 1;

function handleSelect (selectedKey) {
  key = selectedKey;
}

<PanelGroup title="Title" activeKey={key} onSelect={handleSelect} isAccordion={true}>
  <Panel header="Panel 1" key={1}>TabPane 1 content</Panel>
  <Panel header={<strong>Panel 2</strong>} key={2}>TabPane 2 content</Panel>
</PanelGroup>
```

#### Uncontrolled
```
var PanelGroup = require('react-bootstrap/PanelGroup');
var Panel    = require('react-bootstrap/Panel');

<PanelGroup title="Title" initialActiveKey={1} isAccordion={true}>
  <Panel header="Panel 1" key={1}>Panel 1 content</Panel>
  <Panel header={<strong>Panel 2</strong>} key={2}>Panel 2 content</Panel>
</PanelGroup>
```

`<Accordion></Accordion>` is an alias of `<PanelGroup isAccordion={true}><PanelGroup>`

### <a name="Modal"></a>Modal

Overlays require the overlay instance itself and a 'trigger' component which controls whether the
overlay is visible or not.

```
var Modal = require('react-bootstrap/Modal');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');

var modalInstance = (
  <Modal title="Modal title" animation={true} backdrop={true} keyboard={true}>
    <div className="modal-body">
        Content
    </div>
    <div className="modal-footer">
    </div>
  </Modal>
);

var trigger = (
  <OverlayTrigger overlay={modalInstance} trigger="click|hover|focus|manual">
    <button>Open</button>
  </OverlayTrigger>
);
```

You can make a custom trigger component like this:

```
var OverlayTriggerMixin = require('react-bootstrap/OverlayTriggerMixin');
var CustomTrigger = React.createClass({
  mixins: [OverlayTriggerMixin],

  getInitialState: function() {
    return {
      isOverlayShown: false
    };
  },

  toggleOverlay: function () {
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },

  // This is called by `OverlayTriggerMixin` whenever the component renders
  // and the return value is appended to `document.body`
  renderOverlay: function() {
    if (!this.state.isOverlayShown) {
      return <span />;
    }

    return (
      <Modal title="Modal title" onRequestHide={this.toggleOverlay}>
        <div className="modal-body">
            Content
        </div>
      </Modal>
    );
  },

  render: function() {
    return (
      <button onClick={this.toggleOverlay}>
        Toggle modal
      </button>
    );
  }
});
```

### <a name="ProgressBar"></a>ProgressBar

```
var ProgressBar = require('react-bootstrap/ProgressBar');

<ProgressBar
  min={0}
  max={100}
  now={20}
  bsStyle="danger"
  bsVariation="[striped|active]"
  text="%(percent)s% complete (%(bsStyle)s)"
/>
```

