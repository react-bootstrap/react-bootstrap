/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

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
                <div className="bs-docs-section">
                  <h1 className="page-header">Example Components <small>Example</small></h1>
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