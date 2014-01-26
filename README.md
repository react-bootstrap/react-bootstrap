# react-bootstrap

[Bootstrap 3](http://getbootstrap.com) components built with [React](http://facebook.github.io/react/)

[![Build Status](https://travis-ci.org/stevoland/react-bootstrap.png)](https://travis-ci.org/stevoland/react-bootstrap)

## Contributors

- Huge contributions from [syllog1sm](https://github.com/syllog1sm) ([blog](http://clozeit.wordpress.com/))
- [Pieter Vanderwerff](https://github.com/pieter-vanderwerff)

## Currently implemented (but under active development)

- [Button](#Button)
- [DropdownButton](#DropdownButton)
- [MenuItem](#MenuItem)
- [TabbedArea, TabPane, Tab](#Tabs)
- [CollapsePanel](#CollapsePanel)
- [Alert](#Alert)
- SplitButton

### <a name="Button"></a>Button

```
var Button = require('react-bootstrap/lib/Button');

<Button onClick={handleClick}>Title</Button>
```

### <a name="DropdownButton"></a>DropdownButton

```
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem       = require('react-bootstrap/lib/MenuItem');

function handleSelect (selectedIndex) {
}

<DropdownButton title="Title" onSelect={handleSelect}>
  <MenuItem key="1">MenuItem 1 content</MenuItem>
  <MenuItem key="2">MenuItem 2 content</MenuItem>
</DropdownButton>
```

### <a name="Tabs"></a>Tabs

#### Controlled
```
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane    = require('react-bootstrap/lib/TabPane');

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
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane    = require('react-bootstrap/lib/TabPane');

<TabbedArea title="Title" initialActiveKey={1}>
  <TabPane tab="Tab 1" key={1}>TabPane 1 content</TabPane>
  <TabPane tab={<strong>Tab 2</strong>} key={2}>TabPane 2 content</TabPane>
</TabbedArea>
```

### <a name="Alert"></a>Alert

```
var Alert = require('react-bootstrap/lib/Alert');

function handleDismiss () {
}

<Alert bsStyle="danger" onDismiss={handleDismiss} dismissAfter={5000}>
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</Alert>
```

### <a name="CollapsePanel"></a>CollapsePanel

`var CollapsePanel = require('react-bootstrap/lib/CollapsePanel')`

TODO docs

### <a name="MenuItem"></a>MenuItem

```
var MenuItem = require('react-bootstrap/lib/MenuItem');

function handleSelect (key) {
}

<MenuItem key={1} bsVariation="[divider|header]" onSelect={handleSelect}>Content</MenuItem>
```

## Up next

- Label
- Accordion
- Nav, NavItem
- Pagination, Pager
- Modal
