import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default class Page extends React.Component {
  render() {
    return (
        <div>
          <NavMain activePage="support" />

          <PageHeader
            title="Need help?"
            subTitle="Community resources for answering your React-Bootstrap questions." />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                  <p className="lead">Stay up to date on the development of React-Bootstrap and reach out to the community with these helpful resources.</p>

                  <h3>Stack Overflow</h3>
                  <p><a href="http://stackoverflow.com/questions/ask">Ask questions</a> about specific problems you have faced, including details about what exactly you are trying to do. Make sure you tag your question with <code className="js">react-bootstrap</code>. You can also read through <a href="http://stackoverflow.com/questions/tagged/react-bootstrap">existing React-Bootstrap questions</a>.</p>

                  <h3>Live help</h3>
                  <p>Bring your questions and pair with other react-bootstrap users in a <a href="http://start.thinkful.com/react/?utm_source=github&utm_medium=badge&utm_campaign=react-bootstrap">live Thinkful hangout</a>. Hear about the challenges other developers are running into, or screenshare your own code with the group for feedback.</p>

                  <h3>Chat rooms</h3>
                  <p>Discuss questions in the <code className="js">#react-bootstrap</code> channel on the <a href="http://www.reactiflux.com/">Reactiflux Slack</a> or on <a href="https://gitter.im/react-bootstrap/react-bootstrap">Gitter</a>.</p>

                  <h3>GitHub issues</h3>
                  <p>The issue tracker is the preferred channel for bug reports, features requests and submitting pull requests. See more about how we use issues in the <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md#issues">contribution guidelines</a>.</p>

                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  }

  shouldComponentUpdate() {
    return false;
  }
}
