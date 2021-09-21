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
  it('Should have color utility', () => {
    const component = shallow(<Box color="danger" />);
    component.find('div').hasClass('text-danger').should.equal(true);
  });
  it('Should have background color utility', () => {
    const component = shallow(<Box bgColor="info" />);
    component.find('div').hasClass('bg-info').should.equal(true);
  });
  it('Should have background color gradient utility', () => {
    const component = shallow(<Box bgColorGradient="dark" />);
    component.find('div').hasClass('bg-dark').should.equal(true);
    component.find('div').hasClass('bg-gradient').should.equal(true);
  });
  it('Should have float left utility', () => {
    const component = shallow(<Box floatLeft />);
    component.find('div').hasClass('float-left').should.equal(true);
  });
  it('Should have float right utility', () => {
    const component = shallow(<Box floatRight="xxl" />);
    component.find('div').hasClass('float-xxl-right').should.equal(true);
  });
  it('Should have float none utility', () => {
    const component = shallow(<Box floatNone="sm" />);
    component.find('div').hasClass('float-sm-none').should.equal(true);
  });
  it('Should have text selection utility', () => {
    const component = shallow(<Box userSelect="none" />);
    component.find('div').hasClass('user-select-none').should.equal(true);
  });
  it('Should have pointer events utility', () => {
    const component = shallow(<Box pe="auto" />);
    component.find('div').hasClass('pe-auto').should.equal(true);
  });
  it('Should have overflow utility', () => {
    const component = shallow(<Box overflow="hidden" />);
    component.find('div').hasClass('overflow-hidden').should.equal(true);
  });
  it('Should have position utility', () => {
    const component = shallow(<Box position="absolute" />);
    component.find('div').hasClass('position-absolute').should.equal(true);
  });
  it('Should have position utility', () => {
    const component = shallow(<Box position="absolute" />);
    component.find('div').hasClass('position-absolute').should.equal(true);
  });
  it('Should have shadow utility', () => {
    const component = shallow(<Box shadow="sm" />);
    component.find('div').hasClass('shadow-sm').should.equal(true);
  });
  it('Should have align utility', () => {
    const component = shallow(<Box align="bottom" />);
    component.find('div').hasClass('align-bottom').should.equal(true);
  });
  it('Should have align text utility', () => {
    const component = shallow(<Box alignText="baseline" />);
    component.find('div').hasClass('align-text-baseline').should.equal(true);
  });
  it('Should have sizing utilities', () => {
    const component = shallow(<Box maxHeight minViewportWidth height="50" />);
    component.find('div').hasClass('mh-100').should.equal(true);
    component.find('div').hasClass('min-vw-100').should.equal(true);
    component.find('div').hasClass('h-50').should.equal(true);
  });
  it('Should have text align utilities', () => {
    const component = shallow(<Box textLeft="xl" textCenter="sm" textRight />);
    component.find('div').hasClass('text-xl-left').should.equal(true);
    component.find('div').hasClass('text-sm-center').should.equal(true);
    component.find('div').hasClass('text-right').should.equal(true);
  });
  it('Should have text wrap utilities', () => {
    const component = shallow(<Box textWrap textNoWrap />);
    component.find('div').hasClass('text-wrap').should.equal(true);
    component.find('div').hasClass('text-nowrap').should.equal(true);
  });
  it('Should have text break utility', () => {
    const component = shallow(<Box textBreak />);
    component.find('div').hasClass('text-break').should.equal(true);
  });
  it('Should have text transform utilities', () => {
    const component = shallow(<Box textTransform="uppercase" />);
    component.find('div').hasClass('text-uppercase').should.equal(true);
  });
  it('Should have font weight utilities', () => {
    const component = shallow(<Box fontWeight="lighter" />);
    component.find('div').hasClass('font-weight-lighter').should.equal(true);
  });
  it('Should have font style utilities', () => {
    const component = shallow(<Box fontStyle="italic" />);
    component.find('div').hasClass('font-italic').should.equal(true);
  });
  it('Should have line height utilities', () => {
    const component = shallow(<Box lineHeight="base" />);
    component.find('div').hasClass('lh-base').should.equal(true);
  });
  it('Should have monospace utility', () => {
    const component = shallow(<Box fontMonospace />);
    component.find('div').hasClass('font-monospace').should.equal(true);
  });
  it('Should have text reset utility', () => {
    const component = shallow(<Box textReset />);
    component.find('div').hasClass('text-reset').should.equal(true);
  });
  it('Should have text decoration utilities', () => {
    const component = shallow(<Box textDecoration="none" />);
    component.find('div').hasClass('text-decoration-none').should.equal(true);
  });
  it('Should have margin utilities', () => {
    const component = shallow(
      <Box marginAuto="xxl" marginBottomFour="sm" marginRightThree />,
    );
    component.find('div').hasClass('m-xxl-auto').should.equal(true);
    component.find('div').hasClass('mb-sm-4').should.equal(true);
    component.find('div').hasClass('mr-3').should.equal(true);
  });
  it('Should have padding utilities', () => {
    const component = shallow(
      <Box paddingLeftTwo="md" paddingXAuto paddingFive="lg" />,
    );
    component.find('div').hasClass('pl-md-2').should.equal(true);
    component.find('div').hasClass('px-auto').should.equal(true);
    component.find('div').hasClass('p-lg-5').should.equal(true);
  });
});
