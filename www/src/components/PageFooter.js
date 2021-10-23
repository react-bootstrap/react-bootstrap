import * as React from 'react';
import packageJSON from '../../../package.json';

let { version } = packageJSON;

if (/docs/.test(version)) {
  version = version.split('-')[0];
}

class PageFooter extends React.Component {
  render() {
    return (
      <footer className="bs-docs-footer" role="contentinfo">
        <div className="container">
          <div className="bs-docs-social">
            <ul className="bs-docs-social-buttons">
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=react-bootstrap&repo=react-bootstrap&type=watch&count=true"
                  width={95}
                  height={20}
                  title="Star on GitHub"
                />
              </li>
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=react-bootstrap&repo=react-bootstrap&type=fork&count=true"
                  width={92}
                  height={20}
                  title="Fork on GitHub"
                />
              </li>
              <li>
                <iframe
                  src="https://platform.twitter.com/widgets/follow_button.html?screen_name=react_bootstrap&show_screen_name=true"
                  width={230}
                  height={20}
                  title="twitter"
                  frameBorder="0"
                  scrolling="no"
                />
              </li>
            </ul>
          </div>
          <p>
            Code licensed under{' '}
            <a
              href="https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE"
              rel="noopener noreferrer"
              target="_blank"
            >
              MIT
            </a>
            . Documentation based, in part, on{' '}
            <a
              href="https://getbootstrap.com/docs/3.3/"
              rel="noopener noreferrer"
              target="_blank"
            >
              bootstrap
            </a>
            ; licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC BY 3.0
            </a>
          </p>
          <ul className="bs-docs-footer-links muted">
            <li>Currently v{version}</li>
            <li>·</li>
            <li>
              <a href="https://github.com/react-bootstrap/react-bootstrap/">
                GitHub
              </a>
            </li>
            <li>·</li>
            <li>
              <a href="https://github.com/react-bootstrap/react-bootstrap/issues?state=open">
                Issues
              </a>
            </li>
            <li>·</li>
            <li>
              <a href="https://github.com/react-bootstrap/react-bootstrap/releases">
                Releases
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default PageFooter;
