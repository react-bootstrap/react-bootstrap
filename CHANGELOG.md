# [1.0.0-beta.10](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2019-07-15)


### Bug Fixes

* **FormText:** 'muted' prop bug in <FormText />. ([#3901](https://github.com/react-bootstrap/react-bootstrap/issues/3901)) ([0bb8a6f](https://github.com/react-bootstrap/react-bootstrap/commit/0bb8a6f))
* even more explicit arguments for callback function ([e4e85a3](https://github.com/react-bootstrap/react-bootstrap/commit/e4e85a3))
* **TabPane:** wrong assigned Transition event(unmountOnExit) ([b3c44c2](https://github.com/react-bootstrap/react-bootstrap/commit/b3c44c2))
* **types:** Alert and Badge ref typing ([d11cfed](https://github.com/react-bootstrap/react-bootstrap/commit/d11cfed))
* **types:** type clean up for eventKey and removal of some unneeded type helpers ([6742c05](https://github.com/react-bootstrap/react-bootstrap/commit/6742c05))
* build step due execa version bump (fix [#3964](https://github.com/react-bootstrap/react-bootstrap/issues/3964)) ([63d9a8b](https://github.com/react-bootstrap/react-bootstrap/commit/63d9a8b))
* enzyme not properly firing event handlers during testing ([085f862](https://github.com/react-bootstrap/react-bootstrap/commit/085f862))
* explicit arguments for function callback of ToggleButtonGroup ([c037abc](https://github.com/react-bootstrap/react-bootstrap/commit/c037abc))
* more explicit argument syntax for ToggleButtonGroup callback ([20eb49d](https://github.com/react-bootstrap/react-bootstrap/commit/20eb49d))
* Popover placement prop-types to correct list of props ([7c0c490](https://github.com/react-bootstrap/react-bootstrap/commit/7c0c490))
* revert ignore linting error issue and add bindings for global ([22895f0](https://github.com/react-bootstrap/react-bootstrap/commit/22895f0))
* separate state variables for Controlled example of Carousel ([f53405f](https://github.com/react-bootstrap/react-bootstrap/commit/f53405f))
* Use `useRef` rather than `useState` for DOM references ([1877431](https://github.com/react-bootstrap/react-bootstrap/commit/1877431))


### Features

* Add a swipe threshold as per the upstream implementation ([3fc2ce5](https://github.com/react-bootstrap/react-bootstrap/commit/3fc2ce5))
* Add Carousel touch support via Hammer.js ([0b6a4fa](https://github.com/react-bootstrap/react-bootstrap/commit/0b6a4fa))
* Add useAccordionToggle hook ([140ddf7](https://github.com/react-bootstrap/react-bootstrap/commit/140ddf7))
* modulate Popover Components ([#3811](https://github.com/react-bootstrap/react-bootstrap/issues/3811)) ([f608c42](https://github.com/react-bootstrap/react-bootstrap/commit/f608c42))
* Re-implement touch functionality for Carousel natively ([b0d2297](https://github.com/react-bootstrap/react-bootstrap/commit/b0d2297))


### BREAKING CHANGES

* Popovers now expose sub components Content, Title for building up popovers



# [1.0.0-beta.9](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2019-05-30)


### Bug Fixes

* **Collapse:** remove 0px menu height on resize and expand/collapse ([#3687](https://github.com/react-bootstrap/react-bootstrap/issues/3687)) ([787a19e](https://github.com/react-bootstrap/react-bootstrap/commit/787a19e))
* Accordion Component not collapsing when toggled twice ([cd842f7](https://github.com/react-bootstrap/react-bootstrap/commit/cd842f7)), closes [#3726](https://github.com/react-bootstrap/react-bootstrap/issues/3726)
* ran prettier to fix CI ([#3678](https://github.com/react-bootstrap/react-bootstrap/issues/3678)) ([1719da5](https://github.com/react-bootstrap/react-bootstrap/commit/1719da5))
* **types:** add bootstrap sizes for Form.Label as column ([#3731](https://github.com/react-bootstrap/react-bootstrap/issues/3731)) ([cdb7b6b](https://github.com/react-bootstrap/react-bootstrap/commit/cdb7b6b)), closes [#3481](https://github.com/react-bootstrap/react-bootstrap/issues/3481)
* **types:** add scrollable to ModalProps interface to match component ([#3742](https://github.com/react-bootstrap/react-bootstrap/issues/3742)) ([57e7bf4](https://github.com/react-bootstrap/react-bootstrap/commit/57e7bf4))
* **types:** alignRight type ([#3828](https://github.com/react-bootstrap/react-bootstrap/issues/3828)) ([1dd21eb](https://github.com/react-bootstrap/react-bootstrap/commit/1dd21eb))


### Features

* **docs:** optimized style and script loading ([#3713](https://github.com/react-bootstrap/react-bootstrap/issues/3713)) ([4b362a3](https://github.com/react-bootstrap/react-bootstrap/commit/4b362a3))



# [1.0.0-beta.8](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2019-04-12)



# [1.0.0-beta.7](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2019-04-12)


### Bug Fixes

* DropDownItem prop-types active prop (fix: [#3598](https://github.com/react-bootstrap/react-bootstrap/issues/3598)) ([#3608](https://github.com/react-bootstrap/react-bootstrap/issues/3608)) ([cf13d90](https://github.com/react-bootstrap/react-bootstrap/commit/cf13d90))
* Fix Babel config for Google WRS support ([#3622](https://github.com/react-bootstrap/react-bootstrap/issues/3622)) ([5e2cd00](https://github.com/react-bootstrap/react-bootstrap/commit/5e2cd00))
* Fix up accordions a bit ([#3615](https://github.com/react-bootstrap/react-bootstrap/issues/3615)) ([511e566](https://github.com/react-bootstrap/react-bootstrap/commit/511e566))
* modal dialog scrollable ([#3566](https://github.com/react-bootstrap/react-bootstrap/issues/3566)) ([e45597d](https://github.com/react-bootstrap/react-bootstrap/commit/e45597d))
* Update dependencies ([#3578](https://github.com/react-bootstrap/react-bootstrap/issues/3578)) ([a2c0c9d](https://github.com/react-bootstrap/react-bootstrap/commit/a2c0c9d))
* Value typing for Checkbox ToggleButtonGroup ([#3584](https://github.com/react-bootstrap/react-bootstrap/issues/3584)) ([7a27c07](https://github.com/react-bootstrap/react-bootstrap/commit/7a27c07))
* **Modal:** set display block always, fixes [#3399](https://github.com/react-bootstrap/react-bootstrap/issues/3399) ([#3571](https://github.com/react-bootstrap/react-bootstrap/issues/3571)) ([0cd1c30](https://github.com/react-bootstrap/react-bootstrap/commit/0cd1c30))
* **types:** defaultActiveKey to NavProps in Nav.d.ts ([#3638](https://github.com/react-bootstrap/react-bootstrap/issues/3638)) ([8819727](https://github.com/react-bootstrap/react-bootstrap/commit/8819727))


### Features

* enhanced Alert dismissible example ([#3599](https://github.com/react-bootstrap/react-bootstrap/issues/3599)) ([#3602](https://github.com/react-bootstrap/react-bootstrap/issues/3602)) ([be17781](https://github.com/react-bootstrap/react-bootstrap/commit/be17781))



# [1.0.0-beta.6](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2019-03-21)


### Bug Fixes

* add missing props to Navbar.Collapse ([#3519](https://github.com/react-bootstrap/react-bootstrap/issues/3519)) ([dd75d22](https://github.com/react-bootstrap/react-bootstrap/commit/dd75d22))
* added 'onSlideEnd' to Carousel (fix: [#3405](https://github.com/react-bootstrap/react-bootstrap/issues/3405)) ([#3515](https://github.com/react-bootstrap/react-bootstrap/issues/3515)) ([b836c9c](https://github.com/react-bootstrap/react-bootstrap/commit/b836c9c))
* Do not pass through undefined child bsPrefix in Dropdown.Toggle ([#3507](https://github.com/react-bootstrap/react-bootstrap/issues/3507)) ([e7bf8db](https://github.com/react-bootstrap/react-bootstrap/commit/e7bf8db)), closes [#3456](https://github.com/react-bootstrap/react-bootstrap/issues/3456)
* Fix clean method to return Promise always ([#3501](https://github.com/react-bootstrap/react-bootstrap/issues/3501)) ([6f03223](https://github.com/react-bootstrap/react-bootstrap/commit/6f03223))
* Fix typo with alignRight prop ([#3488](https://github.com/react-bootstrap/react-bootstrap/issues/3488)) ([08510be](https://github.com/react-bootstrap/react-bootstrap/commit/08510be)), closes [#3487](https://github.com/react-bootstrap/react-bootstrap/issues/3487)
* fix unmountOnExit prop ([#3498](https://github.com/react-bootstrap/react-bootstrap/issues/3498)) ([e8b24be](https://github.com/react-bootstrap/react-bootstrap/commit/e8b24be))
* form validation example (fix: [#3485](https://github.com/react-bootstrap/react-bootstrap/issues/3485)) ([#3516](https://github.com/react-bootstrap/react-bootstrap/issues/3516)) ([9b8627f](https://github.com/react-bootstrap/react-bootstrap/commit/9b8627f))


### Features

* add scrollable prop to Modal ([#3469](https://github.com/react-bootstrap/react-bootstrap/issues/3469)) ([a7e800e](https://github.com/react-bootstrap/react-bootstrap/commit/a7e800e))
* add support for Spinners ([#3541](https://github.com/react-bootstrap/react-bootstrap/issues/3541)) ([2adb7c6](https://github.com/react-bootstrap/react-bootstrap/commit/2adb7c6))
* add support for table-borderless, fixes react-bootstrap/react-bootstrap[#3470](https://github.com/react-bootstrap/react-bootstrap/issues/3470) ([#3473](https://github.com/react-bootstrap/react-bootstrap/issues/3473)) ([22e9316](https://github.com/react-bootstrap/react-bootstrap/commit/22e9316))
* added 'as' prop to Carousel (fix: [#3509](https://github.com/react-bootstrap/react-bootstrap/issues/3509)) ([#3514](https://github.com/react-bootstrap/react-bootstrap/issues/3514)) ([a25d03c](https://github.com/react-bootstrap/react-bootstrap/commit/a25d03c))
* support `focusFirstItemOnShow` prop on Dropdowns ([c614940](https://github.com/react-bootstrap/react-bootstrap/commit/c614940))



# [1.0.0-beta.5](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2019-01-25)


### chore

* **build:** clean up build tooling ([e71fa89](https://github.com/react-bootstrap/react-bootstrap/commit/e71fa89))


### BREAKING CHANGES

* **build:** remove bower build, use npm
* **build:** cherry picked imports no longer have to specify `lib` in the import



# [1.0.0-beta.4](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2019-01-18)

### Bug Fixes

- pass modal manager down ([2980ac6](https://github.com/react-bootstrap/react-bootstrap/commit/2980ac6))
- remove navigation role from breadcrumb ([#3380](https://github.com/react-bootstrap/react-bootstrap/issues/3380)) ([1ac53ad](https://github.com/react-bootstrap/react-bootstrap/commit/1ac53ad))

### Features

- first pass of typescript types for everything ([#3411](https://github.com/react-bootstrap/react-bootstrap/issues/3411)) ([2079b22](https://github.com/react-bootstrap/react-bootstrap/commit/2079b22))

# [1.0.0-beta.3](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-11-14)

### Bug Fixes

- send Context instead of Context.Consumer react-context-toolbox ([#3368](https://github.com/react-bootstrap/react-bootstrap/issues/3368)) ([8ead371](https://github.com/react-bootstrap/react-bootstrap/commit/8ead371)), closes [4Catalyzer/react-context-toolbox#9](https://github.com/4Catalyzer/react-context-toolbox/issues/9)

### Features

- add suppoprt for custom checkboxes and radios ([#3343](https://github.com/react-bootstrap/react-bootstrap/issues/3343)) ([97a5b2f](https://github.com/react-bootstrap/react-bootstrap/commit/97a5b2f))

# [1.0.0-beta.2](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-11-07)

### Bug Fixes

- add flip and forward popperConfig to DropdownMenu ([#3318](https://github.com/react-bootstrap/react-bootstrap/issues/3318)) ([0aa2de2](https://github.com/react-bootstrap/react-bootstrap/commit/0aa2de2))
- right alignment in navbar ([#3338](https://github.com/react-bootstrap/react-bootstrap/issues/3338)) ([84ef393](https://github.com/react-bootstrap/react-bootstrap/commit/84ef393))
- typo in module reference for react-overlay ([#3331](https://github.com/react-bootstrap/react-bootstrap/issues/3331)) ([34515fc](https://github.com/react-bootstrap/react-bootstrap/commit/34515fc))

### Features

- change default Nav components to non ul/li ([#3339](https://github.com/react-bootstrap/react-bootstrap/issues/3339)) ([59127e6](https://github.com/react-bootstrap/react-bootstrap/commit/59127e6))

### BREAKING CHANGES

- components no longer default to a list

- more

- fix docs

# [1.0.0-beta.1](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2018-09-14)

### Bug Fixes

- build command ([a680f84](https://github.com/react-bootstrap/react-bootstrap/commit/a680f84))

# [1.0.0-beta.0](https://github.com/react-bootstrap/react-bootstrap/compare/v0.32.4...v1.0.0-beta.0) (2018-09-13)
