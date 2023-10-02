# Welcome to React-Bootstrap 👋

[![npm][npm-badge]][npm]
[![GitHub Actions CI status][gh-actions-badge]][gh-actions]
[![Travis CI Build status][travis-badge]][travis]
[![Codecov][codecov-badge]][codecov]
[![Netlify][netlify-badge]][netlify]
[![Discord][discord-badge]][discord]


## Overview

Our project's core offering consists of a versatile collection of React components, each encapsulating a specific Bootstrap 5 UI element or feature. These components are designed to be highly modular, allowing you to mix and match them to build your web application. Some of the key components included are:

* **Buttons**: Customize the style and functionality of buttons. <br>
* **Dropdowns**: Create dropdown menus with various options and styling. <br>
* **Collapse**: Add collapsible sections and accordions. <br>
* **Modals**: Implement pop-up modal dialogs with ease. <br>
* **Navbars**: Construct responsive navigation bars. <br>
* **And More**: Explore a wide array of additional components to address various aspects of your project.

If you're new to these frameworks, we recommend quickly going through the official **[React][react]** and **[Bootstrap 5][bootstrap]** documentation.

## Installation & compatibility

React-Bootstrap is compatible with various versions of Bootstrap. It's important to ensure that you are using the correct combination of versions for your project.

Please refer to the table below to find the compatible version of React-Bootstrap for your project. The provided links offer detailed instructions on how to install the required version.

| Bootstrap Version | React-Bootstrap Version | Documentation |
|:----------------:|:-----------------------:|:-------------:|
| v5.x             | 2.x                     | [Link][v5-documentation] |
| v4.x             | 1.x                     | [Link][v4-documentation] |
| v3.x             | 0.33.x (not maintained) | [Link][v3-documentation] |

## Migrating from previous versions

### Bootstrap 4 to Bootstrap 5

If you would like to update React-Bootstrap within an existing project to use *Bootstrap 5*, please read our documentation for <br> **[migrating to React-Bootstrap V2][v5-migration]**.

### Bootstrap 3 to Bootstrap 4

If you would like to update React-Bootstrap within an existing project to use *Bootstrap 4*, please read our documentation for <br> **[migrating to React-Bootstrap V1][v4-migration]**.

## Related modules

- [React-Router-Bootstrap][react-router-bootstrap] – Integration with [React Router][react-router]
- [Awesome React Bootstrap Components][awesome-react-bootstrap-components] - Additional components like off-canvas navbar, switch, and sliders.

## Local setup

We use Yarn as our preferred package manager. If you haven't already installed Yarn, please refer to the [setup instructions](https://yarnpkg.com/en/docs/install) to get started. Once Yarn is installed, you can run the command `yarn run bootstrap` to install all the necessary dependencies.

From there you can:

- Run the tests once with `yarn test` (Or run them in watch mode with `yarn run tdd`)
- Start a local copy of the docs site with `yarn start`
- Build a local copy of the library with `yarn run build`

<br>

*Note:* If you are using PowerShell in VS Code, you might encounter a 'yarn.ps1 cannot be loaded' error when running `yarn --version` to check if Yarn was installed correctly on your system. This error occurs due to disabled script execution on the system. To resolve this issue, consider either of the following options:

1. Use an Alternate Terminal: Try using Git Bash or Windows Terminal, which may not have the same script execution restrictions as PowerShell.

2. Change PowerShell Execution Policy: Refer to the [official documentation](https://go.microsoft.com/fwlink/?LinkID=135170) for guidance on changing the script execution policies in PowerShell.

## CodeSandbox Examples
Below, you'll find examples that demonstrate the code in action and showcase the resulting interface.

![codesandbox 1](https://github.com/tuyetbphan/react-bootstrap/assets/93013742/2e765509-17d3-4544-be8a-750982a8c0b4)

![codesandbox 2](https://github.com/tuyetbphan/react-bootstrap/assets/93013742/8cff7db5-d71b-4431-ab57-e7332a8f302e)

![codesandbox 3](https://github.com/tuyetbphan/react-bootstrap/assets/93013742/852dfdac-5983-4220-b466-d45e31a72578)

Click [here](https://github.com/react-bootstrap/code-sandbox-examples) to explore more of React-Bootstrap [CodeSandbox](https://codesandbox.io/) examples.

Click [here](https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic) to automatically open CodeSandbox with the React-Bootstrap [CodeSandbox Examples GitHub Repository](https://github.com/react-bootstrap/code-sandbox-examples) as a workspace.

## Contributions

Yes, please! Your input can help us improve and enhance the project. To get started, please take a moment to review our [guidelines][contributing], where you'll find detailed information on how to contribute, code of conduct, and other essential information. <br>

Thank you for considering contributing.

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
[official documentation]: https://go.microsoft.com/fwlink/?LinkID=135170
