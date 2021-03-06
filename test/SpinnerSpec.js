import { mount } from 'enzyme';

import Spinner from '../src/Spinner';

describe('<Spinner>', () => {
  it('Should render a basic spinner correctly', () => {
    mount(<Spinner animation="border" />).assertSingle('div.spinner-border');
  });

  it('Should render a spinner with a custom element, variant and size ', () => {
    mount(
      <Spinner as="span" animation="grow" variant="primary" size="sm" />,
    ).assertSingle('span.spinner-grow.spinner-grow-sm.text-primary');
  });

  it('Should render a spinner with other properties', () => {
    mount(<Spinner animation="grow" role="status" />).assertSingle(
      'div.spinner-grow[role="status"]',
    );
  });

  it('Should render child elements', () => {
    mount(
      <Spinner animation="grow">
        <span id="testChild" />
      </Spinner>,
    ).assertSingle('div.spinner-grow span#testChild');
  });

  it('Should have div as default component', () => {
    mount(<Spinner animation="border" />).assertSingle('div');
  });
});
