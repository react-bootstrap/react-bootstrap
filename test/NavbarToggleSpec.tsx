import { render } from '@testing-library/react';

import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    const { getByTestId } = render(<NavbarToggle data-testid="test" />);
    getByTestId('test').tagName.toLowerCase().should.equal('button');
  });
});
