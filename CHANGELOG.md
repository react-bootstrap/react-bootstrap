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
