
# Contributing bootstrap v4 support!

Thanks for helping out! Here are some general details that should help structure your PR.

Please build PR's off of the `v4-support` branch. We are working on getting it in some kind of order, but thats where the work is happening!

## Components

When working in the actual code base building components, there are a few good guidelines and practices for putting together a high quality PR that fits with the spirit and intent of the library.

### Depdencies and React

Use the latest React api's as of v`16.3.0`, It's gonna take some time to get all these in and released so let's make sure we don't have to immediately handle a bunch of React API deprecations. Practically that means:
  
  - Use new lifecycle hooks where needed i.e. `getDerivedStateFromProps`
  - Use the new Context api via `createContext` (first ask if context is necessary tho!)

React Bootstrap also makes heavy usage of `react-overlays` so for any overlay, modal, tooltip it's likely you'll need to coordinate PR's with that project as well (don't worry it's mostly the same folks)


### API 

Try and be consistent with the overall style and API of the library as a whole. Generally, we avoid monolithic or very high level component API's. React bootstrap is a toolbox! Prefer to split components out into "sub components" as they make sense. This is usually indicated by the bootstrap css classes, e.g. `.nav`, `.nav-item`, and `nav-link` translate into `<Nav>`, `<NavItem>`, and `<NavLink>` components.

Avoid unnecessary Higher Order Components (HOCs), unless they add a significant amount of value  or abstract way something that would otherwise complicate many components (like `uncontrollable`). It's not that HOC's are bad, but we want to try and keep these low level ui blocks as flat and straightforward as possible. Prefer to work explicitly in the component and avoid over optimization up front.

Components should not be stateless function components by default, folks often add `refs` to them so "stateful" class components are a better default for `react-bootstrap` components. Components should also **not** use `PureComponent` by default. For a variety of reasons the sort of components these are don't generally benefit from that optimization, and may cause bugs.

### Accessible by Default

React-bootstrap takes web accessibility seriously and we take advantage of the React component model to add better defaults that plain bootstrap can (being mostly css). Often this means, making sure the a11y details present in the [bootstrap docs](https://getbootstrap.com/) are added as defaults to components where possible. Usually this means handling `aria-selected`/`aria-controls` for tab like components or having a default label for an icon only button, or making it easier to apply `htmlFor` and `id` to form controls. **There are plently of cases where the correct a11y is only possible from the user** that's ok! We can't handle every case.
  
## Tests

Make sure the tests related to a component pass, you can run `npm run tdd MyComponentName` for component specific tests.

## Documentation

We want to update the documentation for each component as we upgrade them

  - Add or edit the `PropTypes` comments for the your component and sub-components (see https://github.com/react-bootstrap/react-bootstrap/blob/master/CONTRIBUTING.md#docs for more info)
  - Update usage in `www/src/examples` for the component, potentially removing or adding examples as needed (follow https://getbootstrap.com/)
  - Update documentation copy for the component, using https://getbootstrap.com/ as starting point for the component
  
