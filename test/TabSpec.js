import { mount } from 'enzyme';

import TabPane from '../src/TabPane';

describe('<TabPane>', () => {
  it('Should have class', () => {
    mount(<TabPane>Item content</TabPane>)
      .assertSingle('div.tab-pane[aria-hidden=true][role="tabpanel"]')
      .assertNone('.active');
  });

  it('Should add active class', () => {
    mount(<TabPane active>Item content</TabPane>).assertSingle(
      'div.tab-pane.active[aria-hidden=false]',
    );
  });
});
