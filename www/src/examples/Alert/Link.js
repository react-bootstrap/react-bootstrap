[
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
].map((variant, idx) => (
  <Alert key={idx} variant={variant}>
    This is a {variant} alert with{' '}
    <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like.
  </Alert>
));
