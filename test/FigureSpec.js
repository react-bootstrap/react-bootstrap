import { mount } from 'enzyme';

import Figure from '../src/Figure';

describe('Figure', () => {
  describe('General', () => {
    it('should be a Figure', () => {
      mount(<Figure />).assertSingle('figure');
    });
  });

  describe('Figure.Image', () => {
    it('should be an image', () => {
      mount(<Figure.Image />).assertSingle('img');
    });

    it('should provide src and alt prop', () => {
      mount(<Figure.Image src="image.jpg" alt="this is alt" />).assertSingle(
        'img[src="image.jpg"][alt="this is alt"]',
      );
    });

    it('should have correct class when fluid prop is set', () => {
      mount(<Figure.Image fluid />).assertSingle('.img-fluid');
    });

    it('should not override class when rounded prop is set', () => {
      mount(<Figure.Image rounded fluid />).assertSingle(
        '.figure-img.img-fluid.rounded',
      );
    });

    it('should have correct class when rounded prop is set', () => {
      mount(<Figure.Image rounded />).assertSingle('.rounded');
    });

    it('should have correct class when roundedCircle prop is set', () => {
      mount(<Figure.Image roundedCircle />).assertSingle('.rounded-circle');
    });

    it('should have correct class when thumbnail prop is set', () => {
      mount(<Figure.Image thumbnail />).assertSingle('.img-thumbnail');
    });
  });
});
