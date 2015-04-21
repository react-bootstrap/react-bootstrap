v0.21.0 - Tue, 21 Apr 2015 13:38:38 GMT
---------------------------------------

- [e92a64b](../../commit/e92a64b) [fixed] Handle multiple children in Badge
- [c1b189f](../../commit/c1b189f) [changed] Updated babel* tools. dev-dependency
- [a58eab5](../../commit/a58eab5) [fixed] Fix 'import from' => 'import'
- [276c2bc](../../commit/276c2bc) [fixed] ProgressBar percentage issue when stacked
- [e1c95b3](../../commit/e1c95b3) [changed] Renamed constants to styleMaps and added styleMaps.addStyle()
- [20b608f](../../commit/20b608f) [fixed] Add missed semicolons.
- [2111799](../../commit/2111799) [fixed] Remove unused variables.
- [0e6b62a](../../commit/0e6b62a) [fixed] typo
- [0c87128](../../commit/0c87128) [fixed] ListGroup outputs <ul> or <div> depending on ListGroupItem (defaults to <ul> if no ListGroupItem). ListGroupItem outputs <li> or <a> if href prop is set.


v0.20.3 - Fri, 10 Apr 2015 19:50:22 GMT
---------------------------------------

- [3ecd393](../../commit/3ecd393) [fixed] Missing PropType Validations
- [8a9e95c](../../commit/8a9e95c) [fixed] Include missing PropType validations
- [6dfcf36](../../commit/6dfcf36) [changed] Internal variables classSet to classNames


v0.20.2 - Tue, 07 Apr 2015 01:51:55 GMT
---------------------------------------

- [723ee4d](../../commit/723ee4d) [fixed] Release scripts usage of rimraf
- [7175431](../../commit/7175431) [fixed] Don't try to access .ownerDocument on null
- [a58cff9](../../commit/a58cff9) [fixed] Numerous ESlint warnings (Removes 145 warnings)
- [c6c4108](../../commit/c6c4108) [added] Twitter follow link to docs page footer
- [20472b9](../../commit/20472b9) [fixed] Windows build


v0.20.1 - Sat, 04 Apr 2015 14:22:18 GMT
---------------------------------------

- [a060fbc](../../commit/a060fbc) [fixed] Re-add missing constants to public API


v0.20.0 - Tue, 31 Mar 2015 13:04:40 GMT
---------------------------------------

- [f1438b5](../../commit/f1438b5) [changed] Updated eslint-plugin-react dev-dependency
- [c8dda3f](../../commit/c8dda3f) [added] HuBoard badge and link
- [ee0382e](../../commit/ee0382e) [fixed] Use .ownerDocument instead of root document
- [182344a](../../commit/182344a) [changed] Updated express dev-dependency
- [6edadbd](../../commit/6edadbd) [changed] Updated mocha dev-dependency
- [64ac86d](../../commit/64ac86d) [changed] React dependency from 0.13.0 -> 0.13.1
- [367b870](../../commit/367b870) [changed] Updated karma-chai dev-dependency
- [1956d2a](../../commit/1956d2a) [changed] Updated style-loader dev-dependency
- [76c87bf](../../commit/76c87bf) [changed] Updated ESLint dev-dependency
- [84b9113](../../commit/84b9113) [changed] Update Bootstrap to 3.3.4
- [bfb3e6c](../../commit/bfb3e6c) [added] `standalone` prop to Input, which will not render the `form-group` class
- [721aacc](../../commit/721aacc) [fixed] Documentation on react install
- [6907e03](../../commit/6907e03) [changed] Renamed src/main.js -> src/index.js
- [5118b42](../../commit/5118b42) [added] Test for carousel control behaviour with wrap=true
- [ea479db](../../commit/ea479db) [fixed] show carousel controls if wrap is enabled


v0.19.1 - Thu, 26 Mar 2015 19:37:01 GMT
---------------------------------------

- [2b7d235](../../commit/2b7d235) [fixed] Re-added CollapsableNav to public API


v0.19.0 - Wed, 25 Mar 2015 21:25:57 GMT
---------------------------------------

- [98ee978](../../commit/98ee978) [changed] Source to ES6 using Babel and Webpack


v0.18.0 - Tue, 24 Mar 2015 02:56:15 GMT
---------------------------------------

- [728c2b0](../../commit/728c2b0) [fixed] docs CodeMirror scroll height too big
- [d282621](../../commit/d282621) [fixed] Split buttons with React 0.13
- [549da6e](../../commit/549da6e) [added] react-router dependency for docs
- [804c24a](../../commit/804c24a) [added] Support for React 0.13.x
- [4c26075](../../commit/4c26075) [fixed] Build status badge
- [70f8596](../../commit/70f8596) [added] Travis CI Optimization


v0.17.0 - Tue, 17 Mar 2015 15:03:27 GMT
---------------------------------------

- [4fae871](../../commit/4fae871) [added] CollapsableNav implements bootstrap markup for navbar-collapse
- [befed83](../../commit/befed83) [fixed] All panel-* classes dynamic based on bsStyle prop
- [de6f7dd](../../commit/de6f7dd) [fixed] CollapsableMixin fixed size
- [7cc4747](../../commit/7cc4747) [fixed] Added role="button" to NavItem for aria compliance.
- [3b6ba7a](../../commit/3b6ba7a) [fixed] Col Offset/Pull/Push of zero. Fixes #406
- [66c439f](../../commit/66c439f) [fixed] OverlayTrigger improvement related to #353 . Helps reduce browser reflows for lots of multiple OverlayTriggers being rendered at once. Before: http://i.imgur.com/e4UZ5l6.png , http://i.imgur.com/Tw39F9t.png After: http://i.imgur.com/bU0f7VY.png


v0.16.1 - Tue, 03 Mar 2015 23:04:19 GMT
---------------------------------------

- [71ff264](../../commit/71ff264) [added] bsSize prop to Input, supporting input groups


v0.16.0 - Fri, 27 Feb 2015 14:01:37 GMT
---------------------------------------

- [25b4143](../../commit/25b4143) [fixed] Define toggleNavKey in the propTypes
- [1a4ae1d](../../commit/1a4ae1d) [fixed] Fix rendering Navbar header when toggleNavKey is 0
- [13f395d](../../commit/13f395d) [added] bsStyle prop support for Modal to set the header color
- [c822837](../../commit/c822837) [removed] non-standard onClick props for ListGroup and ListGroupItem
- [1556e63](../../commit/1556e63) [added] Example for collapsable Navbar in docs.


v0.15.1 - Tue, 17 Feb 2015 14:30:54 GMT
---------------------------------------

- [587a34f](../../commit/587a34f) [fixed] Include .npmignore so compile lib dir is published


v0.15.0 - Mon, 16 Feb 2015 02:41:59 GMT
---------------------------------------

- [1ef51cb](../../commit/1ef51cb) [added] Changelog generation from commit messages
- [13baeaa](../../commit/13baeaa) [added] Release task to push and tag docs and bower repos
- [0193046](../../commit/0193046) [changed] Move built components to lib directory
