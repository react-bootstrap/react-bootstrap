import { mount } from 'enzyme';

import PageItem, { First } from '../src/PageItem';

describe('<PageItem>', () => {
  describe('<First>', () => {
    it('should have expected default innerText', () => {
      const inner = mount(<First />).find(
        '.page-link>span[aria-hidden="true"]',
      );
      expect(inner.text()).to.equal('«');
    });
    it('should have expected custom innerText', () => {
      const innerHTML = 'custom';
      const inner = mount(<First>{innerHTML}</First>).find(
        '.page-link>span[aria-hidden="true"]',
      );
      expect(inner.text()).to.equal(innerHTML);
    });

    it('should render a span if active is true', () => {
      mount(<PageItem active />).assertSingle('span.page-link');
    });

    it('should render a span if disabled is true', () => {
      mount(<PageItem disabled />).assertSingle('span.page-link');
    });
  });
});
