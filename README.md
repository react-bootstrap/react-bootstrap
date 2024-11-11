Here’s the updated `README.md` content with all your names replaced with the original links:


# React-Bootstrap

> **[Bootstrap 5][bootstrap]** components seamlessly integrated with [React][react], empowering developers to create stunning user interfaces with ease.

[![GitHub Actions CI status][gh-actions-badge]][gh-actions]
[![Travis CI Build status][travis-badge]][travis]
[![npm][npm-badge]][npm]
[![Codecov][codecov-badge]][codecov]
[![Discord][discord-badge]][discord]
[![Netlify][netlify-badge]][netlify]

---

## 🚀 Getting Started

React-Bootstrap makes it easy to create responsive, mobile-first projects on the web. This library provides a set of components that follow the Bootstrap framework while being fully compatible with React, allowing for seamless integration and customization.

### Why React-Bootstrap?

- **Simplicity**: Use Bootstrap components as React components.
- **Customization**: Easy to override Bootstrap styles using CSS-in-JS.
- **Maintainability**: React-Bootstrap components make your code cleaner and more maintainable.

---

## 📦 Bootstrap Compatibility

React-Bootstrap is compatible with various versions of Bootstrap. It’s crucial to ensure you are using the correct combination of versions for your project.

| Bootstrap Version | React-Bootstrap Version | Documentation |
| ----------------- |:----------------------:| --------------|
| v5.x              | 2.x                     | [Link][v5-documentation] |
| v4.x              | 1.x (not maintained)    | [Link][v4-documentation] |
| v3.x              | 0.33.x (not maintained) | [Link][v3-documentation] |

---

## 🔄 Migrating from Previous Versions

### From Bootstrap 4 to Bootstrap 5

If you're looking to update React-Bootstrap within an existing project to leverage the features of Bootstrap 5, refer to our comprehensive guide on **[migrating to React-Bootstrap V2][v5-migration]**.

### From Bootstrap 3 to Bootstrap 4

To transition from Bootstrap 3 to Bootstrap 4 within your project, please consult our detailed documentation on **[migrating to React-Bootstrap V1][v4-migration]**.

---

## 🔗 Related Modules

Enhance your React-Bootstrap experience with these related modules:

- [react-router-bootstrap][react-router-bootstrap] – Effortless integration with [React Router][react-router] for dynamic routing.
- [Awesome React Bootstrap Components][awesome-react-bootstrap-components] – A collection of additional components, including off-canvas navbar, switches, and sliders.

---

## 🛠️ Local Setup

Yarn is the recommended package manager for this project. If you don’t have it installed, you can follow the setup instructions [here](https://yarnpkg.com/en/docs/install).

Once Yarn is set up, run the following command to install all required dependencies:

```bash
yarn run bootstrap
```

### Available Scripts

Once you've installed the dependencies, you can utilize the following scripts:

- **Run Tests**: Execute tests once with:
  ```bash
  yarn test
  ```
  Or run them in watch mode:
  ```bash
  yarn run tdd
  ```

- **Start Local Documentation Site**: Launch a local instance of the documentation site:
  ```bash
  yarn start
  ```

- **Build the Library**: Compile a local version of the library with:
  ```bash
  yarn run build
  ```

---

## 💻 CodeSandbox Examples

Explore some React-Bootstrap [CodeSandbox](https://codesandbox.io/) examples:

- [Browse Examples](https://github.com/react-bootstrap/code-sandbox-examples) – View various example implementations.
- [Open in CodeSandbox](https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic) – Automatically launch a workspace with the React-Bootstrap examples.

---

## 🙌 Contributions

Contributions are warmly welcomed! If you want to contribute to this project, please review our [contributing guidelines][contributing] for detailed instructions.

---

## 🌟 Live Demo

Check out the live demo of React-Bootstrap components in action! Visit our [Netlify deployment][netlify].

---

## 📞 Get in Touch

Join our community on Discord! Engage with other developers, ask questions, and share your projects: [Join Discord][discord].

---

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
[awesome-react-bootstrap-components]: https://github.com/Hermanya/awesome-react-bootstrap-components
[codecov-badge]: https://img.shields.io/codecov/c/github/react-bootstrap/react-bootstrap/master.svg
[codecov]: https://codecov.io/gh/react-bootstrap/react-bootstrap
[discord-badge]: https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg
[discord]: https://discord.gg/AKfs9vpvRW
[netlify-badge]: https://api.netlify.com/api/v1/badges/f09d443f-11b2-4454-812b-0645aeaca824/deploy-status
[netlify]: https://app.netlify.com/sites/react-bootstrap/deploys
[gh-actions-badge]: https://github.com/react-bootstrap/react-bootstrap/workflows/CI/badge.svg
[gh-actions]: https://github.com/react-bootstrap/react-bootstrap/actions
