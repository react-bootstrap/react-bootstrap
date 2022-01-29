import { render } from '@testing-library/react';

import TabContent from '../src/TabContent';

describe('<TabContent>', () => {
  it('Should have div as default component', () => {
    const { container } = render(<TabContent />);

    container.tagName.toLowerCase().should.equal('div');
  });
});
