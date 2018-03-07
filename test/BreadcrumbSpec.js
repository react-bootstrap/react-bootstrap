import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should apply id to the wrapper ol element', () => {
    const instance = shallow(<Breadcrumb id="custom-id" />);
    assert.equal(instance.find('nav#custom-id').length, 1);
  });

  it('Should have breadcrumb class inside ol', () => {
    const instance = shallow(<Breadcrumb />);
    assert.equal(instance.find('ol.breadcrumb').length, 1);
  });

  it('Should have custom classes', () => {
    const instance = shallow(<Breadcrumb className="custom-one custom-two" />);

    assert.equal(instance.find('nav.custom-one').length, 1);
    assert.equal(instance.find('nav.custom-two').length, 1);
  });

  it('Should have a navigation role', () => {
    const instance = shallow(<Breadcrumb />);

    const node = instance.find('ol[role="navigation"]');
    assert.equal(node.length, 1);
  });

  it('Should have an aria-label in ol', () => {
    const instance = shallow(<Breadcrumb />);

    const node = instance.find('nav[aria-label="breadcrumbs"]');
    assert.equal(node.length, 1);
  });
});
