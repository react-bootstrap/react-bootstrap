# React-Bootstrap

> **[Bootstrap 5][bootstrap]** components built with [React][react].

[![GitHub Actions CI status][gh-actions-badge]][gh-actions]
[![Travis CI Build status][travis-badge]][travis]
[![npm][npm-badge]][npm]
[![Codecov][codecov-badge]][codecov]
[![Discord][discord-badge]][discord]
[![Netlify][netlify-badge]][netlify]

## Bootstrap compatibility

React-Bootstrap is compatible with various versions of Bootstrap.  As such, you need to ensure you are using the correct combination of versions.  

See the below table on which version of React-Bootstrap you should be using in your project.

| Bootstrap Version | React-Bootstrap Version | Documentation |
| ------------- |:-------------:| -----:|
| v5.x | 2.x | [Link][v5-documentation] |
| v4.x | 1.x | [Link][v4-documentation] |
| v3.x | 0.33.x (not maintained) | [Link][v3-documentation] |

## Migrating from previous versions

### Bootstrap 4 to Bootstrap 5

If you would like to update React-Bootstrap within an existing project to use Bootstrap 5, please read our docs for **[migrating to React-Bootstrap V2][v5-migration]**.

### Bootstrap 3 to Bootstrap 4

If you would like to update React-Bootstrap within an existing project to use Bootstrap 4, please read our docs for **[migrating to React-Bootstrap V1][v4-migration]**.

## Related modules

- [react-router-bootstrap][react-router-bootstrap] – Integration with [React Router][react-router]
- [Awesome React Bootstrap Components][awesome-react-bootstrap-components] - Additional components like off-canvas navbar, switch and sliders.

## Local setup

Yarn is our package manager of choice here. Check out setup
instructions [here](https://yarnpkg.com/en/docs/install) if you don't have it installed already.
After that you can run `yarn run bootstrap` to install all the needed dependencies.

From there you can:

- Run the tests once with `yarn test` (Or run them in watch mode with `yarn run tdd`).
- Start a local copy of the docs site with `yarn start`
- Or build a local copy of the library with `yarn run build`

## CodeSandbox Examples

[Click here](https://github.com/react-bootstrap/code-sandbox-examples) to explore some React-Bootstrap [CodeSandbox](https://codesandbox.io/) examples.

[Click here](https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic) to automatically open [CodeSandbox](https://codesandbox.io/) with the React-Bootstrap [CodeSandbox Examples GitHub Repository](https://github.com/react-bootstrap/code-sandbox-examples) as a workspace.

## Contributions

Yes please! See the [contributing guidelines][contributing] for details.

[bootstrap]: https://getbootstrap.com/
[react]: https://reactjs.org/
[v5-documentation]: https://react-bootstrap.github.io
[v5-migration]: https://react-bootstrap.github.io/docs/migrating
[v4-documentation]: https://react-bootstrap-v4.netlify.app
[v4-migration]: https://react-bootstrap-v4.netlify.app/migrating
[v3-documentation]: https://react-bootstrap-v3.netlify.app
[contributing]: CONTRIBUTING.md
[travis-badge]: https://travis-ci.org/react-bootstrap/react-bootstrap.svg?branch=master
[travis]: https://travis-ci.org/react-bootstrap/react-bootstrap
[npm-badge]: https://badge.fury.io/js/react-bootstrap.svg
[npm]: http://badge.fury.io/js/react-bootstrap
[react-router-bootstrap]: https://github.com/react-bootstrap/react-router-bootstrap
[react-router]: https://github.com/reactjs/react-router
[react-bootstrap-extended]: https://github.com/rbalicki2/react-bootstrap-extended
[awesome-react-bootstrap-components]: https://github.com/Hermanya/awesome-react-bootstrap-components
[codecov-badge]: https://img.shields.io/codecov/c/github/react-bootstrap/react-bootstrap/master.svg
[codecov]: https://codecov.io/gh/react-bootstrap/react-bootstrap
[discord-badge]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord]: https://discord.gg/AKfs9vpvRW
[netlify-badge]: https://api.netlify.com/api/v1/badges/f09d443f-11b2-4454-812b-0645aeaca824/deploy-status
[netlify]: https://app.netlify.com/sites/react-bootstrap/deploys
[gh-actions-badge]: https://github.com/react-bootstrap/react-bootstrap/workflows/CI/badge.svg
[gh-actions]: https://github.com/react-bootstrap/react-bootstrap/actions
