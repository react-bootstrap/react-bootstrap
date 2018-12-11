import * as React from 'react';
import Button from './Button';

<Button type="submit" />;

<Button as="a" href="/foo" />;

// $ExpectError
<Button as="a" type="submit" />;
