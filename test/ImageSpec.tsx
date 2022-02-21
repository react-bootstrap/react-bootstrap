import { render } from '@testing-library/react';

import Image from '../src/Image';

describe('Image', () => {
  it('should be an image', () => {
    const { getByTestId } = render(<Image data-testid="test-image" />);
    getByTestId('test-image').tagName.toLowerCase().should.equal('img');
  });

  it('should provide src and alt prop', () => {
    const { getByTestId } = render(
      <Image data-testid="test-image" src="image.jpg" alt="this is alt" />,
    );
    getByTestId('test-image').getAttribute('src')!.should.equal('image.jpg');
    getByTestId('test-image').getAttribute('alt')!.should.equal('this is alt');
  });

  it('should have correct class when fluid prop is set', () => {
    const { getByTestId } = render(<Image data-testid="test-image" fluid />);
    getByTestId('test-image').classList.contains('img-fluid').should.be.true;
  });

  it('should not override class when rounded prop is set', () => {
    const { getByTestId } = render(
      <Image data-testid="test-image" fluid rounded />,
    );
    getByTestId('test-image').classList.contains('img-fluid').should.be.true;
    getByTestId('test-image').classList.contains('rounded').should.be.true;
  });

  it('should have correct class when rounded prop is set', () => {
    const { getByTestId } = render(<Image data-testid="test-image" rounded />);
    getByTestId('test-image').classList.contains('rounded').should.be.true;
  });

  it('should have correct class when roundedCircle prop is set', () => {
    const { getByTestId } = render(
      <Image data-testid="test-image" roundedCircle />,
    );
    getByTestId('test-image').classList.contains('rounded-circle').should.be
      .true;
  });

  it('should have correct class when thumbnail prop is set', () => {
    const { getByTestId } = render(
      <Image data-testid="test-image" thumbnail />,
    );
    getByTestId('test-image').classList.contains('img-thumbnail').should.be
      .true;
  });
});
