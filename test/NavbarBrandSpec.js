import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import NavbarBrand from '../src/NavbarBrand';

describe('NavbarBrand', () => {

  it('Should create NavbarBrand SPAN element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand>Brand</NavbarBrand>
    );

    let brand = ReactDOM.findDOMNode(instance);

    assert.equal(brand.nodeName, 'SPAN');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.innerText, 'Brand');
  });

  it('Should create NavbarBrand A (link) element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand><a href>BrandLink</a></NavbarBrand>
    );

    let brand = ReactDOM.findDOMNode(instance);

    assert.equal(brand.nodeName, 'A');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.innerText, 'BrandLink');
  });

});
