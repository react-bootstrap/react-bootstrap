import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';

const HomePage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="home" />

          <main className="bs-docs-masthead" id="content" role="main">
            <div className="container">
              <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
              <p className="lead">The most popular front-end framework, rebuilt for React.</p>
            </div>
          </main>

          <PageFooter />
        </div>
      );
  }
});

export default HomePage;
