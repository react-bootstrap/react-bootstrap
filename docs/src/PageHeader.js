import React from 'react';

const PageHeader = React.createClass({
  render() {
    return (
      <div className="bs-docs-header" id="content">
        <div className="container">
          <h1>{this.props.title}</h1>
          <p>{this.props.subTitle}</p>
        </div>
      </div>
    );
  }
});

export default PageHeader;
