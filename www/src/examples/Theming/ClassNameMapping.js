/* eslint-disable no-undef */
// import globalStyles from './globalStyles.css';
// import buttonStyles from './buttonStyles.css';

<>
  {/* Hint: inspect the markup to see how the classes differ */}
  <ThemeProvider classNameMap={globalStyles}>
    <Button variant="primary">Blue Button</Button>
  </ThemeProvider>{' '}
  <Button variant="primary" classNameMap={buttonStyles}>
    Orchid button
  </Button>
</>;
