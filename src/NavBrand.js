import NavbarBrand from './NavbarBrand';
import deprecationWarning from './utils/deprecationWarning';

export default deprecationWarning.wrapper(NavbarBrand, {
  message:
    'The `NavBrand` component has been renamed to: `NavbarBrand`. ' +
    'Please use that component instead; this alias will be removed in an upcoming release'
});
