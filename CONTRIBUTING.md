# Contributing

We welcome community support with both pull requests and reporting bugs. Please
don't hesitate to jump in.

## Review others' work

Check out the list of outstanding pull requests if there is something you might
be interested in. Maybe somebody is trying to fix that stupid bug that bothers
you. Review the PR. Do you have any better ideas how to fix this problem? Let us
know.

## Issues

The issue tracker is the preferred channel for bug reports, features requests
and submitting pull requests, but please respect the following restrictions:

- Please do not use the issue tracker for personal support requests. Stack Overflow ([react-bootstrap](http://stackoverflow.com/questions/tagged/react-bootstrap) tag), [Discord](https://discord.gg/0ZcbPKXt5bXLs9XK), or [Thinkful](http://start.thinkful.com/react/?utm_source=github&utm_medium=badge&utm_campaign=react-bootstrap) are better places to get help.
- Please do not open issues or pull requests regarding the code in React or Bootstrap (open them in their respective repositories).

_Note: Occasionally issues are opened that are unclear, or we cannot verify them. When the issue author has not responded to our questions for verification within 7 days then we will close the issue._

## Tests

All commits that fix bugs or add features need a test.

## Code Style

Please adhere to the current code styling. We have included an `.editorconfig`
at the repo's root to facilitate uniformity regardless of your editor. See the
[editor config site][editorconfig] for integration details.

We use [ESLint][eslint] for all JavaScript Linting. There should be no linting
errors and no new warnings for new work. You are welcome to configure your
editor to use ESLint or the `npm test` command will run unit tests and the
linter.

## Visual Changes

When making a visual change, if at all feasible please provide screenshots
and/or screencasts of the proposed change. This will help us to understand the
desired change easier.

## Docs

Please update the docs with any API changes, the code and docs should always be
in sync.

Component prop documentation is generated automatically from the React components
and their leading comments. Please make sure to provide comments for any `propTypes` you add
or change in a Component.

```js
propTypes: {
  /**
   * Sets the visibility of the Component
   */
  show: React.PropTypes.bool,

  /**
   * A callback fired when the visibility changes
   * @type {func}
   * @required
   */
  onHide: myCustomPropType
}
```

There are a few caveats to this format that differ from conventional JSDoc comments.

- Only specific doclets (the @ things) should be used, and only when the data cannot be parsed from the component itself
    - `@type`: Override the "type", use the same names as the default React PropTypes: string, func, bool, number, object. You can express enum and oneOfType types, Like `{("optionA"|"optionB")}`.
    - `@required`: to mark a prop as required (use the normal React isRequired if possible)
    - `@private`: Will hide the prop in the documentation
- All description text should be above the doclets.

## Implement additional components and features

This project is seeking parity with the core Bootstrap library.
Component by component to the extent it is possible.

Also Bootstrap mentions http://getbootstrap.com/getting-started/#examples
as examples of things you can do, but they are not part of the core library,
therefore this project is the wrong place to implement them.

## Breaking changes

Breaking changes should be accompanied with deprecations of removed functionality. Prior to the 1.0.0 release, we aim to follow React's example of taking two minor releases to break old functionality. As such, changes that intend to remove or change public APIs should be be submitted against the `next` branch, and should be accompanied with deprecation warnings on the old APIs. The deprecated APIs themselves should not be removed until the minor release after that.

## Notes for lodash functions usage in the code

You can use `lodash` but keep it to things where it actually needs it, i.e. don't use `lodash`'s `forEach` when `Array.prototype.forEach` is fine.

The full discussion about it at [#889](https://github.com/react-bootstrap/react-bootstrap/issues/889)

## Collaborators

Please see the [Maintaining](./MAINTAINING.md) documentation.

[huboard-badge]: https://img.shields.io/badge/Hu-Board-7965cc.svg
[huboard]: https://huboard.com/react-bootstrap/react-bootstrap

[issues]: https://github.com/react-bootstrap/react-bootstrap/issues

[editorconfig]: http://editorconfig.org
[eslint]: http://eslint.org
[commit-message]: http://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message
