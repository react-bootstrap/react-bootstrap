# Maintaining React-Bootstrap

This document is for people working on React-Bootstrap. It describes common
tasks such as triaging or merging pull requests.

If you are interested in contributing to React-Bootstrap, you should check out
the [Contributing Guide](./CONTRIBUTING.md).

## Triaging Issues

New issues pop up every day. We need to identify urgent issues (such as nobody
can use a component, or install React-Bootstrap), close and link duplicates,
answer questions, etc. Please alert the
[gitter/react-bootstrap](https://gitter.im/react-bootstrap/react-bootstrap) chat
room of the urgent issues. We are using
[HuBoard](https://huboard.com/react-bootstrap/react-bootstrap) which is a kanban
style board to track and prioritize issues.

## Merging a pull request

Please, make sure: 

- Travis build is green
- At least one collaborator (other than you) approves the PR
  - Commenting "LGTM" (Looks good to me) or something of similar sorts is
    sufficient.
  - If it's a simple docs change or a typo fix, feel free to skip this step.
- Commits follow the convention prescribed in the [Contributing
  Guide](./CONTRIBUTING.md).
  - This is very important, because the release process uses this to generate
    the [changelog](./CHANGELOG.md).
  - Commits are squashed. Each change is a single commit.
    - e.g. if the PR contains two changes such as `[fixed] Some Bug` and then
      `[fixed] Some other unrelated bug` it should be two separate changes.
    - e.g. if the first commit is `[fixed] Some bug` and the second commit is
      `[fixed] failing tests for previous commit`, you should squash them into a
      single commit
  - It's alright to ask the author of the pull request to fix any of the above.

## Becoming a maintainer

If you are interested in becoming a react-bootstrap maintainer, start by
reviewing issues and pull requests. Answer questions for those in need of
troubleshooting. Join us in the
[gitter/react-bootstrap](https://gitter.im/react-bootstrap/react-bootstrap) chat
room. Once we see you helping, either we will reach out and ask you if you want
to join or you can ask one of the [organization
owners](https://github.com/orgs/react-bootstrap/teams/owners) to add you. We
will try our best to be proactive in reaching out to those that are already
helping out.

GitHub by default does not publicly state that you are a member of the
organization. Please feel free to change that setting for yourself so others
will know who's helping out. That can be configured on [organization
list](https://github.com/orgs/react-bootstrap/people) page.

Being a maintainer is not an obligation. You can help when you have time and be
less active when you don't. If you get a new job and get busy, that's alright.

## Releases

Releases should include documentation, git tag, bower package preparation and
finally the actual npm module publish. We have all of this automated by running
`./tools/release` from the root of the repository. __PLEASE DO NOT RUN `npm
publish` BY ITSELF__. The release script will do that. We want to prevent issues
like [#325](https://github.com/react-bootstrap/react-bootstrap/issues/325) and
[#218](https://github.com/react-bootstrap/react-bootstrap/issues/218) from ever
happening again. In order to run the release script you will need permission to
publish to the package to npm. Those with this permission are in the [publishers
team](https://github.com/orgs/react-bootstrap/teams/publishers)

Example usages of the release script:

```bash
$ ./tools/release patch
$ ./tools/release minor
$ ./tools/release major
$ ./tools/release minor --pre beta
```

Note that the above commands will bump the [semver](http://semver.org) version
programmatically so you don't need to. Please be mindful to ensure that semver
guidelines are followed. If it is discovered that we have pushed a release in
violation of semver, than a patch release reverting the offending change should
be pushed as soon as possible to correct the error. The offending change can
then be re-applied and released with the proper version bump.
