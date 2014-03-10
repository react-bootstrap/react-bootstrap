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
                  <h1 id="buttons" className="page-header">Buttons</h1>
                  <h2 id="buttons-options">Options</h2>
                  <p>Use any of the available button style types to quickly create a styled button. Just modify the <code>bsStyle</code> prop.</p>
                  <ReactPlayground codeText={ButtonTypesText} />

                  <h2 id="buttons-sizes">Sizes</h2>
                  <p>Fancy larger or smaller buttons? Add <code>bsSize="large"</code>, <code>bsSize="small"</code>, or <code>bsSize="xsmall"</code> for additional sizes.</p>
                  <ReactPlayground codeText={ButtonSizesText} />

                  <p>Create block level buttons—those that span the full width of a parent— by adding the <code>block</code> prop.</p>
                  <ReactPlayground codeText={ButtonBlockText} />

                  <h2 id="buttons-active">Active state</h2>
                  <p>To set a buttons active state simply set the components <code>active</code> prop.</p>
                  <ReactPlayground codeText={ButtonActiveText} />

                  <h2 id="buttons-disabled">Disabled state</h2>
                  <p>Make buttons look unclickable by fading them back 50%. To do this add the <code>disabled</code> attribute to buttons.</p>
                  <ReactPlayground codeText={ButtonDisabledText} />

                  <div className="bs-callout bs-callout-warning">
                    <h4>Event handler functionality not impacted</h4>
                    <p>This prop will only change the <code>{'<Button />'}</code>&#8217;s appearance, not its functionality. Use custom logic to disable the effect of the <code>onClick</code> handlers.</p>
                  </div>

                  <h2 id="buttons-tags">Button tags</h2>
                  <p>The DOM element tag is choosen automaticly for you based on the props you supply. Passing a <code>href</code> will result in the button using a <code>{'<a />'}</code> element otherwise a <code>{'<button />'}</code> element will be used.</p>
                  <ReactPlayground codeText={ButtonTagTypesText} />

                  <h2 id="buttons-tags">Button loading state</h2>
                  <p>When activating an asynchronous action from a button it is a good UX pattern to give the user feedback as to the loading state, this can easily be done by updating your <code>{'<Button />'}</code>&#8217;s props from a state change like below.</p>
                  <ReactPlayground codeText={ButtonLoadingText} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="bs-docs-sidebar hidden-print affix-top" role="complementary">
                  <ul className="nav bs-docs-sidenav">
                    <li>
                      <a href="#buttons">Buttons</a>
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