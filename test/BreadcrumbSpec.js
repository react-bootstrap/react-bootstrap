import { mount } from 'enzyme';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    mount(<Breadcrumb id="custom-id" />)
      .find('nav#custom-id')
      .should.have.length(1);
  });

  it('Should have breadcrumb class inside ol', () => {
    mount(<Breadcrumb />)
      .find('ol.breadcrumb')
      .should.have.length(1);
  });

  it('Should have custom classes', () => {
    mount(<Breadcrumb className="custom-one custom-two" />)
      .find('nav.custom-one.custom-two')
      .should.have.length(1);
  });

  it('Should not have a navigation role', () => {
    mount(<Breadcrumb className="custom-one custom-two" />)
      .find('ol[role="navigation"]')
      .should.have.length(0);
  });

  it('Should have an aria-label in ol', () => {
    mount(<Breadcrumb className="custom-one custom-two" />)
      .find('nav[aria-label="breadcrumb"]')
      .should.have.length(1);
  });

  it('Should have nav as default component', () => {
    mount(<Breadcrumb />).assertSingle('nav');
  });
});
