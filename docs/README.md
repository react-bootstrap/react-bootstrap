# React Bootstrap Documentation Website

This website is single page app built on
[React](http://facebook.github.io/react/), with styles and structure taken from
the [Bootstrap](http://getbootstrap.com/) docs website.  The app is statically
generated to HTML via node and then hosted it by pushing HTML to [GitHub
Pages](http://pages.github.com/).

## Development

From the repository root run `npm run docs` and navigate your browser to
`http://localhost:4000`. This will start an express base node server with
webpack-dev middleware that will watch your file changes and recompile all the
static assets needed to generate the site. 

## Production

This site is statically published on github pages, to do this the static assets
need to be generated. You can simulate a similar experience with `npm run
docs-prod` and navigating your browser to `http://localhost:4000`
