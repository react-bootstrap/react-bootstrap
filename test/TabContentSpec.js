import { mount } from 'enzyme';

import TabContent from '../src/TabContent';

describe('<TabContent>', () => {
  it('Should have div as default component', () => {
    mount(<TabContent />).assertSingle('div');
  });
});
