import { mount } from 'enzyme';

import Feedback from '../src/Feedback';

describe('<Feedback>', () => {
  it('Should have div as default component', () => {
    mount(<Feedback />).assertSingle('div');
  });

  it('Should render valid feedback', () => {
    mount(<Feedback type="valid" />).assertSingle('.valid-feedback');
  });

  it('Should render invalid feedback', () => {
    mount(<Feedback type="invalid" />).assertSingle('.invalid-feedback');
  });

  it('Should render valid feedback tooltip', () => {
    mount(<Feedback type="valid" tooltip />).assertSingle('.valid-tooltip');
  });

  it('Should render invalid feedback tooltip', () => {
    mount(<Feedback type="invalid" tooltip />).assertSingle('.invalid-tooltip');
  });
});
