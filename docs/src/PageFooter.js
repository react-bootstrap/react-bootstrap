'use strict';

var React = require('react');
var packageJSON = require('../../package.json');

var PageHeader = React.createClass({
  render: function () {
    return (
        <footer className="bs-docs-footer" role="contentinfo">
          <div className="container">
            <div className="bs-docs-social">
              <ul className="bs-docs-social-buttons">
                <li>
                  <iframe className="github-btn" src={'http://ghbtns.com/github-btn.html?user=react-bootstrap&repo=react-bootstrap&type=watch&count=true'} width={95} height={20} title="Star on GitHub" />
                </li>
                <li>
                  <iframe className="github-btn" src={'http://ghbtns.com/github-btn.html?user=react-bootstrap&repo=react-bootstrap&type=fork&count=true'} width={92} height={20} title="Fork on GitHub" />
                </li>
              </ul>
            </div>
            <p>Code licensed under <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE" target="_blank">MIT</a>.</p>
            <ul className="bs-docs-footer-links muted">
              <li>Currently v{packageJSON.version}</li>
              <li>·</li>
              <li><a href="https://github.com/react-bootstrap/react-bootstrap/">GitHub</a></li>
              <li>·</li>
              <li><a href="https://github.com/react-bootstrap/react-bootstrap/issues?state=open">Issues</a></li>
              <li>·</li>
              <li><a href="https://github.com/react-bootstrap/react-bootstrap/releases">Releases</a></li>
            </ul>
          </div>
        </footer>
      );
  }
});

module.exports = PageHeader;