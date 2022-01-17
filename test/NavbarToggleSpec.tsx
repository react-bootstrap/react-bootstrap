import { render } from '@testing-library/react';

import NavbarToggle from '../src/NavbarToggle';

describe('<NavbarToggle>', () => {
  it('Should have button as default component', () => {
    const { container } = render(<NavbarToggle />);
    container.firstElementChild!.tagName.toLowerCase().should.equal('button');
  });
});
