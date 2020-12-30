/* eslint-disable no-undef */
// import globalStyles from './globalStyles.css';

<>
  {/* If your css-loader is configured to use `camelCaseOnly`, then you can
   use the `classNameConverter` to convert the hypenated class names used by
   react-bootstrap to be camelCase before they are looked up in the
   `classNameMap` In this example the `btn-danger` class will be converted to
   `btnDanger` before being looked up in the `classNameMap`. */}
  <ThemeProvider
    classNameMap={globalStyles}
    classNameConverter={value =>
      value.replace(/-([a-z])/gi, g => g[1].toUpperCase())
    }
  >
    <Button variant="danger">Red Button</Button>
  </ThemeProvider>
</>;
