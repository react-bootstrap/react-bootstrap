import { render } from '@testing-library/react';

import PlaceholderButton from '../src/PlaceholderButton';

describe('<PlaceholderButton>', () => {
  it('should render a placeholder', () => {
    const { container } = render(<PlaceholderButton />);
    container.firstElementChild!.className.should.contain('placeholder');
  });

  it('should render size', () => {
    const { container } = render(<PlaceholderButton size="lg" />);
    container.firstElementChild!.className.should.contain('placeholder-lg');
  });

  it('should render animation', () => {
    const { container } = render(<PlaceholderButton animation="glow" />);
    container.firstElementChild!.className.should.contain('placeholder-glow');
  });
});
