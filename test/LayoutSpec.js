import React from 'react';
import { shallow } from 'enzyme';

import Layout from '../src/Layout';

describe('<Layout>', () => {
  it('Should render plain <div> when no prop', () => {
    const component = shallow(<Layout />);
    component.find('div').should.have.length(1);
  });
  it('Should not has class name when no prop', () => {
    const component = shallow(<Layout />);
    component.find('div').prop('className').should.equal('');
  });
  it('Should have `invisible` class name when visible={false}', () => {
    const component = shallow(<Layout visible={false} />);
    component.find('div').hasClass('invisible').should.equal(true);
  });
  it('Should have print display class name when we pass print prop', () => {
    const component = shallow(<Layout print="block" />);
    component.find('div').hasClass('d-print-block').should.equal(true);
  });
  it('Should have display utility class name with breakpoint prop', () => {
    const component = shallow(<Layout sm={{ display: 'inline-block' }} />);
    component.find('div').hasClass('d-sm-inline-block').should.equal(true);
  });
  it('Should not add breakpoint in class name with xs breakpoint prop', () => {
    const component = shallow(<Layout xs={{ display: 'inline-block' }} />);
    component.find('div').hasClass('d-inline-block').should.equal(true);
  });
  it('Should have flex direction utility with flexDirection in breakpoint prop', () => {
    const component = shallow(<Layout sm={{ flexDirection: 'row-reverse' }} />);
    component.find('div').hasClass('flex-sm-row-reverse').should.equal(true);
  });
  it('Should have align item utility with alignItem in breakpoint prop', () => {
    const component = shallow(<Layout sm={{ alignItem: 'center' }} />);
    component.find('div').hasClass('align-item-sm-center').should.equal(true);
  });
  it('Should have order utility with order number in breakpoint prop', () => {
    const component = shallow(<Layout sm={{ order: 3 }} />);
    component.find('div').hasClass('order-sm-3').should.equal(true);
  });
  it('Should have custom class name with className prop', () => {
    const customClass = 'customClass';
    const component = shallow(
      <Layout sm={{ order: 3 }} className={customClass} />,
    );
    component.find('div').hasClass(customClass).should.equal(true);
  });
  it('Should have margin spacing class name with number prop', () => {
    const component = shallow(<Layout xs={{ m: 3 }} />);
    component.find('div').hasClass('m-3').should.equal(true);
  });
  it('Should have margin spacing class name with auto prop', () => {
    const component = shallow(<Layout sm={{ m: 'auto' }} />);
    component.find('div').hasClass('m-sm-auto').should.equal(true);
  });
  it('Should have margin spacing class name with object prop', () => {
    const component = shallow(<Layout sm={{ m: { x: 1, l: 'auto' } }} />);
    component.find('div').hasClass('mx-sm-1').should.equal(true);
    component.find('div').hasClass('ml-sm-auto').should.equal(true);
  });
  it('Should have margin spacing class name with `all` prop', () => {
    const component = shallow(<Layout sm={{ p: { all: 1 } }} />);
    component.find('div').hasClass('p-sm-1').should.equal(true);
  });
  it('Should handle multiple breakpoint props', () => {
    const component = shallow(
      <Layout sm={{ m: { x: 1, l: 'auto' } }} xs={{ m: { x: 0, l: 1 } }} />,
    );
    component.find('div').hasClass('mx-sm-1').should.equal(true);
    component.find('div').hasClass('ml-sm-auto').should.equal(true);
    component.find('div').hasClass('mx-0').should.equal(true);
    component.find('div').hasClass('ml-1').should.equal(true);
  });
});
