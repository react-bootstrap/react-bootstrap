import { mount } from 'enzyme';

import Image from '../src/Image';

describe('Image', () => {
  it('should be an image', () => {
    mount(<Image />).assertSingle('img');
  });

  it('should provide src and alt prop', () => {
    mount(<Image src="image.jpg" alt="this is alt" />).assertSingle(
      'img[src="image.jpg"][alt="this is alt"]',
    );
  });

  it('should have correct class when fluid prop is set', () => {
    mount(<Image fluid />).assertSingle('.img-fluid');
  });

  it('should not override class when rounded prop is set', () => {
    mount(<Image rounded fluid />).assertSingle('.img-fluid.rounded');
  });

  it('should have correct class when rounded prop is set', () => {
    mount(<Image rounded />).assertSingle('.rounded');
  });

  it('should have correct class when roundedCircle prop is set', () => {
    mount(<Image roundedCircle />).assertSingle('.rounded-circle');
  });

  it('should have correct class when thumbnail prop is set', () => {
    mount(<Image thumbnail />).assertSingle('.img-thumbnail');
  });
});
