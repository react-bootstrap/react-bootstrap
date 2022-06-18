import { render } from '@testing-library/react';
import { ThemeProvider } from '../src';

import Col from '../src/Col';

describe('Col', () => {
  it('Should include "col" when there are no sizes', () => {
    const { getByText } = render(<Col>Column</Col>);
    getByText('Column').classList.contains('col').should.be.true;
  });

  it('Should include "col" when xs is true', () => {
    const { getByText } = render(<Col xs>Column</Col>);
    getByText('Column').classList.contains('col').should.be.true;

    render(<Col xs={{ span: true }}>Column2</Col>);
    getByText('Column2').classList.contains('col').should.be.true;
  });

  it('Should include sizes', () => {
    const { getByText } = render(
      <Col xs={4} md={8} lg={{ span: 12 }}>
        Column
      </Col>,
    );
    getByText('Column').classList.length.should.equal(3);
    getByText('Column').classList.contains('col-4').should.be.true;
    getByText('Column').classList.contains('col-md-8').should.be.true;
    getByText('Column').classList.contains('col-lg-12').should.be.true;
  });

  it('Should include offsets', () => {
    const { getByText } = render(
      <Col
        xs={{ span: 4, offset: 1 }}
        md={{ span: 8, order: 1 }}
        lg={{ order: 'last' }}
      >
        Column
      </Col>,
    );
    getByText('Column').classList.length.should.equal(5);
    getByText('Column').classList.contains('col-md-8').should.be.true;
    getByText('Column').classList.contains('order-md-1').should.be.true;
    getByText('Column').classList.contains('col-4').should.be.true;
    getByText('Column').classList.contains('offset-1').should.be.true;
    getByText('Column').classList.contains('order-lg-last').should.be.true;
  });

  it('Should allow span to be null', () => {
    const { getByText } = render(
      // @ts-ignore
      <Col xs="6" md={{ span: null, order: 1 }}>
        Column
      </Col>,
    );
    getByText('Column').classList.contains('col-6').should.be.true;
    getByText('Column').classList.contains('order-md-1').should.be.true;
    getByText('Column').classList.contains('col-md').should.equal(false);
  });

  it('Should allow span to be false', () => {
    const { getByText } = render(
      <Col xs="6" md={{ span: false, order: 1 }}>
        Column
      </Col>,
    );
    getByText('Column').classList.contains('col-6').should.be.true;
    getByText('Column').classList.contains('order-md-1').should.be.true;
    getByText('Column').classList.contains('col-md').should.equal(false);
  });

  it('Should allow span to be auto', () => {
    const { getByText } = render(
      <Col md="auto" lg={{ span: 'auto' }}>
        Column
      </Col>,
    );
    getByText('Column').classList.contains('col-md-auto').should.be.true;
    getByText('Column').classList.contains('col-lg-auto').should.be.true;
  });

  it('Should have div as default component', () => {
    const { getByText } = render(<Col>Column</Col>);
    getByText('Column').tagName.toLowerCase().should.equal('div');
  });

  it('should allow custom breakpoints', () => {
    const { getByText } = render(
      <ThemeProvider breakpoints={['custom']}>
        <Col custom="3">test</Col>
      </ThemeProvider>,
    );
    getByText('test').classList.contains('col-custom-3').should.be.true;
  });

  it('should allow custom breakpoints smaller than default "xs"', () => {
    const { getByText } = render(
      <ThemeProvider breakpoints={['xxs', 'xs']} minBreakpoint="xxs">
        <Col xxs="3" xs="2">
          test
        </Col>
      </ThemeProvider>,
    );

    getByText('test').classList.contains('col-3').should.be.true;
    getByText('test').classList.contains('col-xs-2').should.be.true;
  });
});
