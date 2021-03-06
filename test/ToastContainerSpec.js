import { mount } from 'enzyme';

import ToastContainer from '../src/ToastContainer';

const expectedClasses = {
  'top-start': '.position-absolute.top-0.start-0',
  'top-center': '.position-absolute.top-0.start-50.translate-middle-x',
  'top-end': '.position-absolute.top-0.end-0',
  'middle-start': '.position-absolute.top-50.start-0.translate-middle-y',
  'middle-center': '.position-absolute.top-50.start-50.translate-middle',
  'middle-end': '.position-absolute.top-50.end-0.translate-middle-y',
  'bottom-start': '.position-absolute.bottom-0.start-0',
  'bottom-center': '.position-absolute.bottom-0.start-50.translate-middle-x',
  'bottom-end': '.position-absolute.bottom-0.end-0',
};

describe('ToastContainer', () => {
  it('should render a basic toast container', () => {
    mount(<ToastContainer />).assertSingle('.toast-container');
  });

  Object.keys(expectedClasses).forEach((position) => {
    it(`should render position=${position}`, () => {
      mount(<ToastContainer position={position} />).assertSingle(
        expectedClasses[position],
      );
    });
  });
});
