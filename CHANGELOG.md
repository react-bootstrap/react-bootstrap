# [1.0.0-beta.17](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2020-02-28)


### Bug Fixes

* **Alert:** forward ref to the alert dom element ([#5010](https://github.com/react-bootstrap/react-bootstrap/issues/5010)) ([fb79f2a](https://github.com/react-bootstrap/react-bootstrap/commit/fb79f2a4f951de38fbd6617d5bf8e752433db9de))
* **Container:** fluid breakpoint typings  ([#5011](https://github.com/react-bootstrap/react-bootstrap/issues/5011)) ([f4dde13](https://github.com/react-bootstrap/react-bootstrap/commit/f4dde1389558c286c81695c048439528d2bbdb15))
* add displayName to Row ([#4919](https://github.com/react-bootstrap/react-bootstrap/issues/4919)) ([a1e54a2](https://github.com/react-bootstrap/react-bootstrap/commit/a1e54a23e95d662a23ca363504f010f2ce012e47))
* don't construct ModalManager while document.body may still be null ([#4982](https://github.com/react-bootstrap/react-bootstrap/issues/4982)) ([5aa2be1](https://github.com/react-bootstrap/react-bootstrap/commit/5aa2be1cca89af8b2b1fb44fab11c6eadeace8d0))
* fix small typo in description of eventKey ([4ec9d79](https://github.com/react-bootstrap/react-bootstrap/commit/4ec9d79899c2edf387e235018f8f8a0e96d65845))
* **tooltip:** prevent `non-boolean attribute` warning when passing `show` to Tooltip ([#4858](https://github.com/react-bootstrap/react-bootstrap/issues/4858)) ([2505cb7](https://github.com/react-bootstrap/react-bootstrap/commit/2505cb7d9ddd7984031cb3492a8de0b1cb2c584b))
* **types:** fix type of Overlay's onHide prop ([#4857](https://github.com/react-bootstrap/react-bootstrap/issues/4857)) ([d616175](https://github.com/react-bootstrap/react-bootstrap/commit/d6161758053c4c4a1930d12c2b6fe2faccbadbf8))


### Features

* add size prop for FormLabel component - Fixes [#4886](https://github.com/react-bootstrap/react-bootstrap/issues/4886) ([#4893](https://github.com/react-bootstrap/react-bootstrap/issues/4893)) ([0ae281c](https://github.com/react-bootstrap/react-bootstrap/commit/0ae281cc63a23fbaf498627540cfc926fb4e253b))
* add responsive Containers - Fixes [#4884](https://github.com/react-bootstrap/react-bootstrap/issues/4884) ([0ae281c](https://github.com/react-bootstrap/react-bootstrap/commit/fc271389aed7f55b36cdfc358c25c623e7c9776b))


# [1.0.0-beta.16](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2019-11-20)


### Bug Fixes

* dom-helper api change ([#4848](https://github.com/react-bootstrap/react-bootstrap/issues/4848)) ([f84b1b2](https://github.com/react-bootstrap/react-bootstrap/commit/f84b1b21ed702a85d3afa304dacdeeadbf3b3994))



# [1.0.0-beta.15](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2019-11-18)


### Bug Fixes

* **FormControl:** onChange and innerRef ts decls ([#3583](https://github.com/react-bootstrap/react-bootstrap/issues/3583),[#3568](https://github.com/react-bootstrap/react-bootstrap/issues/3568),[#2781](https://github.com/react-bootstrap/react-bootstrap/issues/2781)) ([#4435](https://github.com/react-bootstrap/react-bootstrap/issues/4435)) ([74a36bc](https://github.com/react-bootstrap/react-bootstrap/commit/74a36bcf8cc2d355efd420674b31ed22c14e2893))
* added eslint pragma for ignoring dangerouslySetInnerHTML ([ce7a4bd](https://github.com/react-bootstrap/react-bootstrap/commit/ce7a4bd9473c2e7368836c09ea476cacbba863cb))
* cleanup ([210799d](https://github.com/react-bootstrap/react-bootstrap/commit/210799d0f5ca735cec2bcf095e06a298a6899b93))
* duplicate class "carousel-item" ([#4609](https://github.com/react-bootstrap/react-bootstrap/issues/4609)) ([34e3905](https://github.com/react-bootstrap/react-bootstrap/commit/34e39053272ee9bc73b4b92d4fbd2281dc840588))
* ordering of propTypes ([e7efa8f](https://github.com/react-bootstrap/react-bootstrap/commit/e7efa8f9c9a06e19b30c35ea39f72d031b61d75d))
* removed sponsorship section ([cee3efa](https://github.com/react-bootstrap/react-bootstrap/commit/cee3efa2136f43441313cbb8b25a2ea3a1e8c09f))
* updated Overlay Trigger to support flip property ([#4660](https://github.com/react-bootstrap/react-bootstrap/issues/4660)) ([ed77ae7](https://github.com/react-bootstrap/react-bootstrap/commit/ed77ae72a7a0fae825a008adb76136b83b46e063))
* **Pagination:** support for ref attribute ([#4593](https://github.com/react-bootstrap/react-bootstrap/issues/4593)) ([e5caa0f](https://github.com/react-bootstrap/react-bootstrap/commit/e5caa0f545a3397e51ae7a0a74904235b19ff4ac))
* **Popover:** support for ref attribute ([0ad84a8](https://github.com/react-bootstrap/react-bootstrap/commit/0ad84a8431425a2c5d46264a25d0f40b718f2dce))
* **ResponsiveEmbed:** support for ref attribute ([4da7ef6](https://github.com/react-bootstrap/react-bootstrap/commit/4da7ef6f4021c1782b403faca7b9128168ebf979))
* **TabContent:** support for ref attribute ([334ff8d](https://github.com/react-bootstrap/react-bootstrap/commit/334ff8d91201bdddb849369053532f14d6b11a1f))
* **Table:** allow passed in refs to be properly forwarded ([#4592](https://github.com/react-bootstrap/react-bootstrap/issues/4592)) ([0e10671](https://github.com/react-bootstrap/react-bootstrap/commit/0e106711331b05d5685fde31c46114621995fc5c))
* **toggle-button-group:** migrate to be ref forwarder ([ba45a53](https://github.com/react-bootstrap/react-bootstrap/commit/ba45a53c94abf9b5d857cc037b296ac6c70e55eb)), closes [#4194](https://github.com/react-bootstrap/react-bootstrap/issues/4194)
* tests ([d21f42a](https://github.com/react-bootstrap/react-bootstrap/commit/d21f42ab1227f52fa830f79c07b08641a9de55ca))
* use normal function instead arrow ([e3a28cb](https://github.com/react-bootstrap/react-bootstrap/commit/e3a28cb86e70fcd9ed80fe4382d9e31fa7ceb2e2))


### chore

* update react overlays ([#4661](https://github.com/react-bootstrap/react-bootstrap/issues/4661)) ([50a3714](https://github.com/react-bootstrap/react-bootstrap/commit/50a37146cb372fe708efe11815d3ee9f468518ca))


### Features

* add ref Forwarding to NavDropdown ([#4626](https://github.com/react-bootstrap/react-bootstrap/issues/4626)) ([be52005](https://github.com/react-bootstrap/react-bootstrap/commit/be520054f484adb79c87b7a6888d91db3636eb9d))
* have Page item forward ref ([#4664](https://github.com/react-bootstrap/react-bootstrap/issues/4664)) ([1baf794](https://github.com/react-bootstrap/react-bootstrap/commit/1baf794aba1170c8cbe1911c30e6c33cb91614ea)), closes [#4194](https://github.com/react-bootstrap/react-bootstrap/issues/4194) [#4194](https://github.com/react-bootstrap/react-bootstrap/issues/4194)


### BREAKING CHANGES

* custom Dropdown Menu's and Toggles can no longer be class components unless they are wrapped in forwardRef()



# [1.0.0-beta.14](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2019-10-04)


### Bug Fixes

* Fix main and module ([4f49265](https://github.com/react-bootstrap/react-bootstrap/commit/4f49265e0db4e2cf7cb8ab42ffee8c22ee64859f))



# [1.0.0-beta.13](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2019-10-03)


### Bug Fixes

* **types:** add missing Popover and Modal props. ([#4464](https://github.com/react-bootstrap/react-bootstrap/issues/4464)) ([b0ad147](https://github.com/react-bootstrap/react-bootstrap/commit/b0ad1479a924fef709374810951f33f7b322687f))
* linting issue ([9b5a8be](https://github.com/react-bootstrap/react-bootstrap/commit/9b5a8befe65c161544bd37930da979450a4c8ee8))
* navbar toggle correct 'collapsed' className when collapsed ([#4412](https://github.com/react-bootstrap/react-bootstrap/issues/4412)) ([bcb0c8e](https://github.com/react-bootstrap/react-bootstrap/commit/bcb0c8e039d5fa1d6d8e6f107d7495b5b126744c))
* **TabContainer:** Resolve lifecycle deprecation ([#4370](https://github.com/react-bootstrap/react-bootstrap/issues/4370)) ([8103448](https://github.com/react-bootstrap/react-bootstrap/commit/8103448522be91f243219fbe76e5566fb85de1c8))
* navs have the wrong role, as well as tabs navigation visual glitch ([#4372](https://github.com/react-bootstrap/react-bootstrap/issues/4372)) ([5e1668a](https://github.com/react-bootstrap/react-bootstrap/commit/5e1668a441cef8c5ddf93c51815dc16a16efa762)), closes [#4371](https://github.com/react-bootstrap/react-bootstrap/issues/4371)
* **AbstractNav:** Re-add role attribute to abstract nav ([#4331](https://github.com/react-bootstrap/react-bootstrap/issues/4331)) ([6c2dd84](https://github.com/react-bootstrap/react-bootstrap/commit/6c2dd84db0a021edda3d3dd50f3a54d6b4781aba))
* **form:** remove unused default props definition (fix: [#4335](https://github.com/react-bootstrap/react-bootstrap/issues/4335)) ([#4349](https://github.com/react-bootstrap/react-bootstrap/issues/4349)) ([b813842](https://github.com/react-bootstrap/react-bootstrap/commit/b8138426482cb30c2462dd96a33abb03f31ec94d))
* **progress-bar:** cleanup implementation to be closer to previous ([355fe42](https://github.com/react-bootstrap/react-bootstrap/commit/355fe42fce9718b54a97755fb9c95bc99e9c3de3))


### Features

* **hooks:** migrate useAccordionToggle to be named export ([a978ebb](https://github.com/react-bootstrap/react-bootstrap/commit/a978ebb3ef7d5d31d5bc61c7c7dd0c51469d3aa5))
* **refs:** migrate more components to properly forward their refs ([7d5eef1](https://github.com/react-bootstrap/react-bootstrap/commit/7d5eef10c5dbfc9a45388cb7fe033b0d96fba6f4)), closes [#4194](https://github.com/react-bootstrap/react-bootstrap/issues/4194)
* add Switches ([#4268](https://github.com/react-bootstrap/react-bootstrap/issues/4268)) ([98297c6](https://github.com/react-bootstrap/react-bootstrap/commit/98297c6f6a542e2beffae3f63d48c3758f3cb5ef))
* Add the as prop to Badge to support actionable badges ([#4295](https://github.com/react-bootstrap/react-bootstrap/issues/4295)) ([db09dc0](https://github.com/react-bootstrap/react-bootstrap/commit/db09dc0c8b19b2e7d2d63e2c9cd9cdaf3a5ded32)), closes [#4227](https://github.com/react-bootstrap/react-bootstrap/issues/4227)
* **types:** add useAccordionToggle types ([714066d](https://github.com/react-bootstrap/react-bootstrap/commit/714066d74595fc27ba0ecd724aebb3371c23fb90)), closes [#4191](https://github.com/react-bootstrap/react-bootstrap/issues/4191)


### BREAKING CHANGES

* **hooks:** useAccordionToggle is now being exported from
`AccordionToggle` rather than `useAccordionToggle`. It also needs
to be imported as a named import, rather than an unnamed import.



# [1.0.0-beta.12](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2019-08-16)


### Bug Fixes

* Export declared classes ([0822533](https://github.com/react-bootstrap/react-bootstrap/commit/0822533))
* **navbar:** context linking issues due to incorrect name ([ab49a83](https://github.com/react-bootstrap/react-bootstrap/commit/ab49a83))
* **navbar:** resolve lifecycle warning issue ([7dacfaf](https://github.com/react-bootstrap/react-bootstrap/commit/7dacfaf)), closes [#4240](https://github.com/react-bootstrap/react-bootstrap/issues/4240)
* **types:** Toast component ([#4246](https://github.com/react-bootstrap/react-bootstrap/issues/4246)) ([c30e131](https://github.com/react-bootstrap/react-bootstrap/commit/c30e131))


### Performance Improvements

* **navbar:** memoize callback function ([dd0003d](https://github.com/react-bootstrap/react-bootstrap/commit/dd0003d))
* **navbar:** memoize context provider value ([41f32e1](https://github.com/react-bootstrap/react-bootstrap/commit/41f32e1))



# [1.0.0-beta.11](https://github.com/react-bootstrap/react-bootstrap/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2019-08-09)


### Bug Fixes

* **AbstractNav:** allow passed in refs to be properly forwarded ([#4031](https://github.com/react-bootstrap/react-bootstrap/issues/4031)) ([bda567f](https://github.com/react-bootstrap/react-bootstrap/commit/bda567f))
* Fix DropdownToggleProps ([686629d](https://github.com/react-bootstrap/react-bootstrap/commit/686629d))
* **Modal:** directly show backdrop if no animation (fix: [#4190](https://github.com/react-bootstrap/react-bootstrap/issues/4190)) ([#4192](https://github.com/react-bootstrap/react-bootstrap/issues/4192)) ([0d02bf6](https://github.com/react-bootstrap/react-bootstrap/commit/0d02bf6))
* Apply suggestions from code review ([c3fab88](https://github.com/react-bootstrap/react-bootstrap/commit/c3fab88))
* **Button:** not pass type prop to custom comp (fix: [#3340](https://github.com/react-bootstrap/react-bootstrap/issues/3340)) ([#4173](https://github.com/react-bootstrap/react-bootstrap/issues/4173)) ([5725f65](https://github.com/react-bootstrap/react-bootstrap/commit/5725f65))
* **Carousel:** fixes [#4136](https://github.com/react-bootstrap/react-bootstrap/issues/4136) - reverse carousel slide navigation direction for touch ([#4137](https://github.com/react-bootstrap/react-bootstrap/issues/4137)) ([5be68b7](https://github.com/react-bootstrap/react-bootstrap/commit/5be68b7))
* Input and List Group components not properly forwarding refs ([8c0cf4a](https://github.com/react-bootstrap/react-bootstrap/commit/8c0cf4a)), closes [#4012](https://github.com/react-bootstrap/react-bootstrap/issues/4012) [#4031](https://github.com/react-bootstrap/react-bootstrap/issues/4031)
* Remove assertions that test implementation details ([44d5e28](https://github.com/react-bootstrap/react-bootstrap/commit/44d5e28))


### Features

* Add simple Popover type test ([#4103](https://github.com/react-bootstrap/react-bootstrap/issues/4103)) ([7715513](https://github.com/react-bootstrap/react-bootstrap/commit/7715513)), closes [#4093](https://github.com/react-bootstrap/react-bootstrap/issues/4093)
* Migrate Fade and Jumbotron to be ref forwarders ([9240fe0](https://github.com/react-bootstrap/react-bootstrap/commit/9240fe0))
* Migrate SafeAnchor to be a ref forwarder ([fc41617](https://github.com/react-bootstrap/react-bootstrap/commit/fc41617))
* Migrate Spinner and SplitButton to be ref forwarders ([8cb7306](https://github.com/react-bootstrap/react-bootstrap/commit/8cb7306))
* Migrate Tabs to be a ref forwarder ([f16d29b](https://github.com/react-bootstrap/react-bootstrap/commit/f16d29b))
* Migrate Toast and ToastHeader to be ref forwarders ([7fa9489](https://github.com/react-bootstrap/react-bootstrap/commit/7fa9489))
* Migrate Tooltip to be a ref forwarder ([df29001](https://github.com/react-bootstrap/react-bootstrap/commit/df29001))



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
