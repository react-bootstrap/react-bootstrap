import { render } from '@testing-library/react';

import Stack from '../src/Stack';

describe('<Stack>', () => {
  it('should render a vertical stack by default', () => {
    const { container } = render(<Stack />);
    container.firstElementChild!.className.should.contain('vstack');
  });

  it('should render direction', () => {
    const { container } = render(<Stack direction="horizontal" />);
    container.firstElementChild!.className.should.contain('hstack');
  });

  it('should render gap', () => {
    const { container } = render(<Stack gap={2} />);
    container.firstElementChild!.classList.contains('gap-2').should.be.true;
  });

  it('should render responsive gap', () => {
    const { container } = render(<Stack gap={{ md: 2 }} />);
    container.firstElementChild!.classList.contains('gap-md-2').should.be.true;
  });
});
