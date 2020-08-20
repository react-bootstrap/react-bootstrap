import React from 'react';
import { shallow } from 'enzyme';

import Box from '../src/Box';

describe('<Box>', () => {
  it('Should have custom class name', () => {
    const customClass = 'customClass';
    const component = shallow(<Box className={customClass} />);
    component.find('div').hasClass(customClass).should.equal(true);
  });
  it('Should render plain <div> when given no props', () => {
    const component = shallow(<Box />);
    component.find('div').should.have.length(1);
  });
  it('Should not have class name when given no props', () => {
    const component = shallow(<Box />);
    component.find('div').prop('className').should.equal('');
  });
  it('Should have `invisible` class name when visible={false}', () => {
    const component = shallow(<Box visible={false} />);
    component.find('div').hasClass('invisible').should.equal(true);
  });
  it('Should have print display class name when we pass print prop', () => {
    const component = shallow(<Box print="block" />);
    component.find('div').hasClass('d-print-block').should.equal(true);
  });
  it('Should have display utility class name with breakpoint prop', () => {
    const component = shallow(<Box displayInlineBlock="sm" />);
    component.find('div').hasClass('d-sm-inline-block').should.equal(true);
  });
  it('Should not add breakpoint in class name', () => {
    const component = shallow(<Box displayInlineBlock />);
    component.find('div').hasClass('d-inline-block').should.equal(true);
  });
  it('Should have flex direction utility with flexDirection', () => {
    const component = shallow(<Box flexDirectionRowReverse />);
    component.find('div').hasClass('flex-row-reverse').should.equal(true);
  });
  it('Should have align item utility with flexDirection and breakpoint prop', () => {
    const component = shallow(<Box flexDirectionRow="sm" />);
    component.find('div').hasClass('flex-sm-row').should.equal(true);
  });
  it('Should have align items utility', () => {
    const component = shallow(<Box alignItemsStart="md" />);
    component.find('div').hasClass('align-items-md-start').should.equal(true);
  });
  it('Should have align self utility', () => {
    const component = shallow(<Box alignSelfCenter="lg" />);
    component.find('div').hasClass('align-self-lg-center').should.equal(true);
  });
  it('Should have flex fill utility', () => {
    const component = shallow(<Box flexFill="xxl" />);
    component.find('div').hasClass('flex-xxl-fill').should.equal(true);
  });
  it('Should have flex wrap utility', () => {
    const component = shallow(<Box flexWrapReverse />);
    component.find('div').hasClass('flex-wrap-reverse').should.equal(true);
  });
  it('Should have justify content utility', () => {
    const component = shallow(<Box justifyContentEvenly="xxl" />);
    component
      .find('div')
      .hasClass('justify-content-xxl-evenly')
      .should.equal(true);
  });
  it('Should have flex grow utility', () => {
    const component = shallow(<Box flexGrowZero />);
    component.find('div').hasClass('flex-grow-0').should.equal(true);
  });
  it('Should have flex shrink utility', () => {
    const component = shallow(<Box flexShrinkOne="lg" />);
    component.find('div').hasClass('flex-lg-shrink-1').should.equal(true);
  });
  it('Should have order utility', () => {
    const component = shallow(<Box orderThree="xl" />);
    component.find('div').hasClass('order-xl-3').should.equal(true);
  });
  it('Should have border utility', () => {
    const component = shallow(<Box border />);
    component.find('div').hasClass('border').should.equal(true);
  });
  it('Should have border zero utility', () => {
    const component = shallow(<Box borderZero="right" />);
    component.find('div').hasClass('border-right-0').should.equal(true);
  });
  it('Should have border color utility', () => {
    const component = shallow(<Box borderColor="warning" />);
    component.find('div').hasClass('border-warning').should.equal(true);
  });
  it('Should have border radius utility', () => {
    const component = shallow(<Box borderRadius="lg" />);
    component.find('div').hasClass('rounded-lg').should.equal(true);
  });
});
