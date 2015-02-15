# Contributing

We welcome community support with both pull requests and reporting bugs. Please
don't hesitate to jump in.

## Tests

All commits that fix bugs or add features need a test.

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
check out these [5 useful tips for a better commit
message](http://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)

## Docs

Please update the docs with any API changes, the code and docs should always be
in sync.
