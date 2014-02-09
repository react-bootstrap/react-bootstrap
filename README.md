# react-bootstrap

[Bootstrap 3](http://getbootstrap.com) components built with [React](http://facebook.github.io/react/)

[![Build Status](https://travis-ci.org/stevoland/react-bootstrap.png)](https://travis-ci.org/stevoland/react-bootstrap)

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

NOTE: Requires the latest React: 0.9.0-alpha. Get the build from http://react.zpao.com/builds/master/latest or from my
build for npm `npm install git://github.com/stevoland/react-with-test-utils`

You can import the lib with as AMD modules, CommonJS modules as a global JS script.

First add the bootstrap CSS to your project then:

### AMD
```
bower install react-bootstrap

var Alert = require('react-bootstrap/amd/Alert');
// or
var Alert = require('react-bootstrap/amd').Alert;
```

### CommonJS
```
npm install git://github.com/stevoland/react-with-test-utils
npm install react-bootstrap

var Alert = require('react-bootstrap/cjs/Alert');
// or
var Alert = require('react-bootstrap').Alert;
```

### Browser globals
```
<script src="http://react.zpao.com/builds/master/latest/react.js"></script>
<script src="react-bootstrap/dist/react-bootstrap.min.js"></script>
<script>
    var Alert = ReactBootstrap.Alert;
</script>
```

## Currently implemented (but under active development)

- [Nav, NavItem](#Nav)
- [Button](#Button)
- [DropdownButton](#DropdownButton)
- [MenuItem](#MenuItem)
- [TabbedArea, TabPane](#Tabs)
- [Alert](#Alert)
- SplitButton

### <a name="Nav"></a>Nav

```
var Nav     = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

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
var Button = require('react-bootstrap/cjs/Button');

<Button onClick={handleClick}>Title</Button>
```

### <a name="DropdownButton"></a>DropdownButton

```
var DropdownButton = require('react-bootstrap/cjs/DropdownButton');
var MenuItem       = require('react-bootstrap/cjs/MenuItem');

function handleSelect (selectedKey) {
}

<DropdownButton title="Title" onSelect={handleSelect}>
  <MenuItem key="1">MenuItem 1 content</MenuItem>
  <MenuItem key="2">MenuItem 2 content</MenuItem>
</DropdownButton>
```

### <a name="Tabs"></a>Tabs

#### Controlled
```
var TabbedArea = require('react-bootstrap/cjs/TabbedArea');
var TabPane    = require('react-bootstrap/cjs/TabPane');

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
var TabbedArea = require('react-bootstrap/cjs/TabbedArea');
var TabPane    = require('react-bootstrap/cjs/TabPane');

<TabbedArea title="Title" initialActiveKey={1}>
  <TabPane tab="Tab 1" key={1}>TabPane 1 content</TabPane>
  <TabPane tab={<strong>Tab 2</strong>} key={2}>TabPane 2 content</TabPane>
</TabbedArea>
```

### <a name="Alert"></a>Alert

```
var Alert = require('react-bootstrap/cjs/Alert');

function handleDismiss () {
}

<Alert bsStyle="danger" onDismiss={handleDismiss} dismissAfter={5000}>
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</Alert>
```

### <a name="MenuItem"></a>MenuItem

```
var MenuItem = require('react-bootstrap/cjs/MenuItem');

function handleSelect (key) {
}

<MenuItem key={1} bsVariation="[divider|header]" onSelect={handleSelect}>Content</MenuItem>
```

## Up next

- Panel, PanelGroup
- Input
- Label
- Accordion
- Pagination, Pager
- Modal
