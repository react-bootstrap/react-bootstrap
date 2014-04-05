/** @jsx React.DOM */

'use strict';

var React = require('react');
var packageJSON = require('../../package.json');

var PageHeader = React.createClass({displayName: 'PageHeader',
  render: function () {
    return (
        React.DOM.footer( {className:"bs-docs-footer", role:"contentinfo"},
          React.DOM.div( {className:"container"},
            React.DOM.div( {className:"bs-docs-social"},
              React.DOM.ul( {className:"bs-docs-social-buttons"},
                React.DOM.li(null,
                  React.DOM.iframe( {className:"github-btn", src:'http://ghbtns.com/github-btn.html?user=stevoland&repo=react-bootstrap&type=watch&count=true', width:90, height:20, title:"Star on GitHub"} )
                ),
                React.DOM.li(null,
                  React.DOM.iframe( {className:"github-btn", src:'http://ghbtns.com/github-btn.html?user=stevoland&repo=react-bootstrap&type=fork&count=true', width:92, height:20, title:"Fork on GitHub"} )
                )
              )
            ),
            React.DOM.p(null, "Code licensed under ", React.DOM.a( {href:"https://github.com/stevoland/react-bootstrap/blob/master/LICENSE", target:"_blank"}, "MIT"),"."),
            React.DOM.ul( {className:"bs-docs-footer-links muted"},
              React.DOM.li(null, "Currently v",packageJSON.version),
              React.DOM.li(null, "·"),
              React.DOM.li(null, React.DOM.a( {href:"https://github.com/stevoland/react-bootstrap/"}, "GitHub")),
              React.DOM.li(null, "·"),
              React.DOM.li(null, React.DOM.a( {href:"https://github.com/stevoland/react-bootstrap/issues?state=open"}, "Issues")),
              React.DOM.li(null, "·"),
              React.DOM.li(null, React.DOM.a( {href:"https://github.com/stevoland/react-bootstrap/releases"}, "Releases"))
            )
          )
        )
      );
  }
});

module.exports = PageHeader;