## General

* `bsStyle` -> `variant`
* `bsClass` -> `bsPrefix`
* `componentClass` -> `as`

## Navbar

* removed `Navbar.Header`
* removed Navbar.Form (TBD)
* `inverse` removed and replaced with `variant="dark"`
* `fluid` now defaults to `true`, set to false to add an inner `container`
* positioning props have been consolidated into `fixed={top|bottom}` and `sticky={top|bottom}`, staticTop has been removed

### NavbarHeader

* removed, not present in v4

### NavbarToggle -> NavbarToggler

* name changed

### NavbarBrand

* Renders a `<a>` when an `href` is provided
* The presence of `children` does not skip the wrapping `span`, use `as` along with `children` for custom rendering

## Nav

* `activeHref` is removed (only activeKey now)
* `bsStyle` renamed to `variant`
* NavLink hrefs will be used as `eventKey`s when `eventKey` is absent
* Local `onSelect` handlers are ignored when in the context of a TabContainer or Navbar (MAYBE ADD BACK?)

### NavItem

* No longer renders an `<a>` tag inside the `<li>`, nest a `NavLink` inside
* `active` prop removed and moved to NavLink

### NavLink

### Grid

* renamed to Container

#### Col

* removed visibility props
* consolidated col `span`, `offset`, and `order` into an object value prop per breakpoint.

### InputGroup

* removed InputGroupButton, and InputGroupAddon
* added InputGroup.Prepend, InputGroup.Append, InputGroup.Text, InputGroup.Checkbox, InputGroup.Radio

### Badge & Label

* removed Label (replaced with just) badge
* `bsStyle` renamed to `variant`

## Panel

* removed, replaced with Card and Card components
* add

## Dropdown

* Removed the `disabled` prop on Dropdown, pass it directly to Dropdown.Toggle
* Removed bsRole, use function children to render custom Toggles or Menus
* Removed SplitButton.toggle (replaced with a `split` prop on the basic Toggle)
* `noCaret` is removed because it's not optional with the styles anymore
* bsPrefixes are not passed from the parent Dropdown anymore
* onSelect behavior is now passed to Menu and Toggle via the Context api

### DropdownButton/SplitButton/NavButton

* Extra props are passed to the underlying Dropdown component, not the Toggle.

### DropdownItem

* renamed from MenuItem to match upstream


## Alert

- `onDismiss` renamed to `onClose`
