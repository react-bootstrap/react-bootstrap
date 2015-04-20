# Contributing

We welcome community support with both pull requests and reporting bugs. Please
don't hesitate to jump in.

## Review others work

Check out the list of outstanding pull requests if there is something you might
be interested in. Maybe somebody is trying to fix that stupid bug that bothers
you. Review the PR. Do you have any better ideas how to fix this problem? Let us
know...

## Current Issues

[![HuBoard][huboard-badge]][huboard]

We use HuBoard to triage issues and prioritize the backlog for the core dev
team. Feel free to tackle any currently open [issue][issues]. The issues tagged
with "help wanted" and especially those high in the backlog are fair game.

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

## Commit Subjects for Public API Changes

If your patch **changes the API or fixes a bug** please use one of the following
prefixes in your commit subject:

- `[fixed] ...`
- `[changed] ...`
- `[added] ...`
- `[removed] ...`

That ensures the subject line of your commit makes it into the auto-generated
changelog. Do not use these tags if your change doesn't fix a bug and doesn't
change the public API.

### When using `[changed]` or `[removed]`...

Please include an upgrade path with example code in the commit message.  If it
doesn't make sense to do this, then it doesn't make sense to use `[changed]` or
`[removed]` :). For further reading on writing a well formed commit message,
check out these [5 useful tips for a better commit message][commit-message]

## Docs

Please update the docs with any API changes, the code and docs should always be
in sync.

## Collaborators

Please see the [Maintaining](./MAINTAINING.md) documentation.

[huboard-badge]: https://img.shields.io/badge/Hu-Board-7965cc.svg
[huboard]: https://huboard.com/react-bootstrap/react-bootstrap

[issues]: https://github.com/react-bootstrap/react-bootstrap/issues

[editorconfig]: http://editorconfig.org
[eslint]: http://eslint.org
[commit-message]: http://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message
