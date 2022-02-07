import { render } from '@testing-library/react';
import { expect } from 'chai';

import Figure from '../src/Figure';

describe('Figure', () => {
  describe('General', () => {
    it('should be a Figure', () => {
      const { getByTestId } = render(<Figure data-testid="test" />);

      getByTestId('test').tagName.toLowerCase().should.equal('figure');
    });
  });

  describe('Figure.Image', () => {
    it('should be an image', () => {
      const { getByTestId } = render(<Figure.Image data-testid="test" />);

      getByTestId('test').tagName.toLowerCase().should.equal('img');
    });

    it('should provide src and alt prop', () => {
      const { getByTestId } = render(
        <Figure.Image src="image.jpg" alt="this is alt" data-testid="test" />,
      );

      const image = getByTestId('test');
      expect(image.getAttribute('src')).to.be.equal('image.jpg');
      expect(image.getAttribute('alt')).to.be.equal('this is alt');
    });

    it('should have correct class when fluid prop is set', () => {
      const { getByTestId } = render(<Figure.Image fluid data-testid="test" />);

      getByTestId('test').classList.contains('img-fluid').should.be.true;
    });

    it('should not override class when rounded prop is set', () => {
      const { getByTestId } = render(
        <Figure.Image rounded fluid data-testid="test" />,
      );

      const image = getByTestId('test');
      image.classList.contains('figure-img').should.be.true;
      image.classList.contains('img-fluid').should.be.true;
      image.classList.contains('rounded').should.be.true;
    });

    it('should have correct class when rounded prop is set', () => {
      const { getByTestId } = render(
        <Figure.Image rounded data-testid="test" />,
      );

      getByTestId('test').classList.contains('rounded').should.be.true;
    });

    it('should have correct class when roundedCircle prop is set', () => {
      const { getByTestId } = render(
        <Figure.Image roundedCircle data-testid="test" />,
      );

      getByTestId('test').classList.contains('rounded-circle').should.be.true;
    });

    it('should have correct class when thumbnail prop is set', () => {
      const { getByTestId } = render(
        <Figure.Image thumbnail data-testid="test" />,
      );

      getByTestId('test').classList.contains('img-thumbnail').should.be.true;
    });
  });
});
