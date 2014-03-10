/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var ButtonTypesText = fs.readFileSync(__dirname + '/../examples/ButtonTypes.js', {encoding: 'utf8'});
var ButtonSizesText = fs.readFileSync(__dirname + '/../examples/ButtonSizes.js', {encoding: 'utf8'});
var ButtonBlockText = fs.readFileSync(__dirname + '/../examples/ButtonBlock.js', {encoding: 'utf8'});
var ButtonActiveText = fs.readFileSync(__dirname + '/../examples/ButtonActive.js', {encoding: 'utf8'});
var ButtonDisabledText = fs.readFileSync(__dirname + '/../examples/ButtonDisabled.js', {encoding: 'utf8'});
var ButtonTagTypesText = fs.readFileSync(__dirname + '/../examples/ButtonTagTypes.js', {encoding: 'utf8'});
var ButtonLoadingText = fs.readFileSync(__dirname + '/../examples/ButtonLoading.js', {encoding: 'utf8'});
var ButtonGroupBasicText = fs.readFileSync(__dirname + '/../examples/ButtonGroupBasic.js', {encoding: 'utf8'});
var ButtonToolbarBasicText = fs.readFileSync(__dirname + '/../examples/ButtonToolbarBasic.js', {encoding: 'utf8'});
var ButtonGroupSizesText = fs.readFileSync(__dirname + '/../examples/ButtonGroupSizes.js', {encoding: 'utf8'});
var ButtonGroupNestedText = fs.readFileSync(__dirname + '/../examples/ButtonGroupNested.js', {encoding: 'utf8'});
var ButtonGroupVerticalText = fs.readFileSync(__dirname + '/../examples/ButtonGroupVertical.js', {encoding: 'utf8'});
var ButtonGroupJustifiedText = fs.readFileSync(__dirname + '/../examples/ButtonGroupJustified.js', {encoding: 'utf8'});

var ComponentsPage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="components" />

          <PageHeader
            title="Components"
            subTitle="" />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">

                {/* Buttons */}
                <div className="bs-docs-section">
                  <h1 id="buttons" className="page-header">Buttons <small>Button</small></h1>
                  <h2 id="buttons-options">Options</h2>
                  <p>Use any of the available button style types to quickly create a styled button. Just modify the
                    <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={ButtonTypesText} />

                  <h2 id="buttons-sizes">Sizes</h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={ButtonSizesText} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the
                      <code>block</code> prop.</p>
                  <ReactPlayground codeText={ButtonBlockText} />

                  <h2 id="buttons-active">Active state</h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={ButtonActiveText} />

                  <h2 id="buttons-disabled">Disabled state</h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code>
                    attribute to buttons.</p>
                  <ReactPlayground codeText={ButtonDisabledText} />

                  <div className="bs-callout bs-callout-warning">
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{'<Button />'}</code>&#8217;s appearance, not its
                      functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2 id="buttons-tags">Button tags</h2>
                  <p>The DOM element tag is choosen automaticly for you based on the props you supply. Passing a
                    <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise a
                    <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={ButtonTagTypesText} />

                  <h2 id="buttons-tags">Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user
                    feedback as to the loading state, this can easily be done by updating your
                    <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={ButtonLoadingText} />
                </div>

                {/* Button Groups */}
                <div className="bs-docs-section">
                  <h1 id="btn-groups" className="page-header">Button groups <small>ButtonGroup, ButtonToolbar</small></h1>
                  <p className="lead">Group a series of buttons together on a single line with the button group.</p>

                  <h3 id="btn-groups-single">Basic example</h3>
                  <p>Wrap a series of <code>{'<Button />'}</code>&#8217;s in a <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupBasicText} />

                  <h3 id="btn-groups-toolbar">Button toolbar</h3>
                  <p>Combine sets of <code>{'<ButtonGroup />'}</code>&#8217;s into a <code>{'<ButtonToolbar />'}</code>
                    for more complex components.</p>
                  <ReactPlayground codeText={ButtonToolbarBasicText} />

                  <h3 id="btn-groups-sizing">Sizing</h3>
                  <p>Instead of applying button sizing props to every button in a group, just add <code>bsSize</code>
                    prop to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupSizesText} />

                  <h3 id="btn-groups-nested">Nesting</h3>
                  <p>You can place other button types within the <code>{'<ButtonGroup />'}</code> like
                    <code>{'<DropdownButton />'}</code>&#8217;s.</p>
                  <ReactPlayground codeText={ButtonGroupNestedText} />

                  <h3 id="btn-groups-vertical">Vertical variation</h3>
                  <p>Make a set of buttons appear vertically stacked rather than horizontally.
                    <strong className="text-danger">Split button dropdowns are not supported here.</strong></p>
                  <p>Just add <code>vertical</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupVerticalText} />

                  <h3 id="btn-groups-justified">Justified button groups</h3>
                  <p>Make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.</p>
                  <div className="bs-callout bs-callout-warning">
                    <h4>Style issues</h4>
                    <p>There are some issues and workarounds required when using this property, please see <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap&#8217;s button group docs</a> for more specifics.</p>
                  </div>
                  <p>Just add <code>justified</code> to the <code>{'<ButtonGroup />'}</code>.</p>
                  <ReactPlayground codeText={ButtonGroupJustifiedText} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="bs-docs-sidebar hidden-print affix-top" role="complementary">
                  <ul className="nav bs-docs-sidenav">
                    <li>
                      <a href="#buttons">Buttons</a>
                    </li>
                    <li>
                      <a href="#btn-groups">Button groups</a>
                    </li>
                  </ul>
                  <a className="back-to-top" href="#top">
                  Back to top
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  }
});

module.exports = ComponentsPage;