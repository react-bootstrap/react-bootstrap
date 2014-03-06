# React Bootstrap Documentation Website

This website is single page app built on [React](http://facebook.github.io/react/), with styles and structure taken from the [Bootstrap](http://getbootstrap.com/) docs website.
The app is statically generated to HTML via node and then hosted it by pushing HTML to [GitHub Pages](http://pages.github.com/).

## Installation

If you are working on the site, you will want to install and run a local copy of it.

### Dependencies

All dependencies are installed with npm, just:

```sh
$ cd react-bootstrap
$ npm install
```

### Instructions

The site uses React bootstrap components, so first make sure you've built the project (via `grunt`). Then:

```sh
$ cd react-bootstrap
$ grunt serveDocs
$ open http://localhost:4000/react-bootstrap/
```

After making any modifications you will need to regenerate the site. Like:

```sh
$ cd react-bootstrap
$ grunt watch:docs # Automatically compiles as needed
$ grunt build:docs # Single compile
```