/** @jsx React.DOM */
var React = require('react');
var Button = require('../cjs/Button');
var DropdownButton = require('../cjs/DropdownButton');
var MenuItem = require('../cjs/MenuItem');
var Accordion = require('../cjs/Accordion');
var Panel = require('../cjs/Panel');
var ButtonToolbar = require('../cjs/ButtonToolbar');
var OverlayTrigger = require('../cjs/OverlayTrigger');
var Tooltip = require('../cjs/Tooltip');
var Alert = require('../cjs/Alert');
var TabbedArea = require('../cjs/TabbedArea');
var TabPane = require('../cjs/TabPane');
var Modal = require('../cjs/Modal');
var OverlayMixin = require('../cjs/OverlayMixin');
var Popover = require('../cjs/Popover');
var Carousel = require('../cjs/Carousel');
var CarouselItem = require('../cjs/CarouselItem');

var dropdownInstance = (
  <DropdownButton title="Dropdown">
    <MenuItem key="1">Item 1</MenuItem>
    <MenuItem key="2">Item 2</MenuItem>
  </DropdownButton>
);

var accordionInstance = (
  <Accordion>
    <Panel header="Collapsible Group Item #1" key={1}>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    </Panel>
    <Panel header="Collapsible Group Item #2" key={2}>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    </Panel>
    <Panel header="Collapsible Group Item #3" key={3}>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    </Panel>
  </Accordion>
);

var positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger placement="left" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement="top" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement="bottom" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement="right" overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

var popoverInstance = (
  <ButtonToolbar>
    <OverlayTrigger trigger="click" placement="left" overlay={<Popover title="Popover left"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="top" overlay={<Popover title="Popover top"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" placement="right" overlay={<Popover title="Popover right"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

var tabbedAreaInstance = (
  <TabbedArea defaultActiveKey={2}>
    <TabPane key={1} tab="Tab 1">TabPane 1 content</TabPane>
    <TabPane key={2} tab="Tab 2">TabPane 2 content</TabPane>
  </TabbedArea>
);

var AlertAutoDismissable = React.createClass({
  getInitialState: function() {
    return {
      alertVisible: false
    };
  },

  render: function() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} dismissAfter={2000}>
          <h4>Oh snap! You got an error!</h4>
          <p>But this will hide after 2 seconds.</p>
        </Alert>
        );
    }

    return (
      <Button onClick={this.handleAlertShow}>Show Alert</Button>
      );
  },

  handleAlertDismiss: function() {
    this.setState({alertVisible: false});
  },

  handleAlertShow: function() {
    this.setState({alertVisible: true});
  }
});

var CustomModalTrigger = React.createClass({
  mixins: [OverlayMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">Launch</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
        <Modal title="Modal heading" onRequestHide={this.handleToggle}>
          <div className="modal-body">
            This modal is controlled by our custom trigger component.
          </div>
          <div className="modal-footer">
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Modal>
      );
  }
});

var carouselInstance = (
  <Carousel style={{width: 900}}>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </CarouselItem>
  </Carousel>
);

var allTests = (
  <div>
    <h2>Dropdown</h2>
    {dropdownInstance}

    <h2>Tooltips</h2>
    {positionerInstance}

    <h2>Popovers</h2>
    {popoverInstance}

    <h2>Tabs</h2>
    {tabbedAreaInstance}

    <h2>Accordian</h2>
    {accordionInstance}

    <h2>Alert</h2>
    <AlertAutoDismissable />

    <h2>Modal</h2>
    <CustomModalTrigger />

    <h2>Carousel</h2>
    {carouselInstance}
  </div>
);

React.renderComponent(allTests, document.body);
