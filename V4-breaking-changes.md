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
* The presence of `children` does not skip the wrapping `span`, use `componentClass` along with `children` for custom rendering

## Nav

* `activeHref` is removed (only activeKey now)
* `bsStyle` renamed to `variant`
* NavLink hrefs will be used as `eventKey`s when `eventKey` is absent
* Local `onSelect` handlers are ignored when in the context of a TabContainer or Navbar (MAYBE ADD BACK?)

### NavItem

* No longer renders an `<a>` tag inside the `<li>`, nest a `NavLink` inside
* `active` prop removed and moved to NavLink

### NavLink

* add
