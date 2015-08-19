import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
// import Navbar from '../src/Navbar';
import NavBrand from '../src/NavBrand';

describe('Navbrand', () => {

  it('Should create navbrand SPAN element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavBrand>Brand</NavBrand>
    );

    let brand = React.findDOMNode(instance);

    assert.equal(brand.nodeName, 'SPAN');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.innerText, 'Brand');
  });

  it('Should create navbrand A (link) element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavBrand><a href>BrandLink</a></NavBrand>
    );

    let brand = React.findDOMNode(instance);

    assert.equal(brand.nodeName, 'A');
    assert.ok(brand.className.match(/\bnavbar-brand\b/));
    assert.equal(brand.innerText, 'BrandLink');
  });

});
