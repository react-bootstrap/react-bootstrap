import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../src';
import Col from '../src/Col';

describe('Col', () => {
  it('Should include "col" when there are no sizes', () => {
    render(<Col>Column</Col>);
    expect(screen.getByText('Column').classList).toContain('col');
  });

  it('Should include "col" when xs is true', () => {
    render(<Col xs>Column</Col>);
    expect(screen.getByText('Column').classList).toContain('col');

    render(<Col xs={{ span: true }}>Column2</Col>);
    expect(screen.getByText('Column2').classList).toContain('col');
  });

  it('Should include sizes', () => {
    render(
      <Col xs={4} md={8} lg={{ span: 12 }}>
        Column
      </Col>,
    );
    expect(screen.getByText('Column').classList).toHaveLength(3);
    expect(screen.getByText('Column').classList).toContain('col-4');
    expect(screen.getByText('Column').classList).toContain('col-md-8');
    expect(screen.getByText('Column').classList).toContain('col-lg-12');
  });

  it('Should include offsets', () => {
    render(
      <Col
        xs={{ span: 4, offset: 1 }}
        md={{ span: 8, order: 1 }}
        lg={{ order: 'last' }}
      >
        Column
      </Col>,
    );
    expect(screen.getByText('Column').classList).toHaveLength(5);
    expect(screen.getByText('Column').classList).toContain('col-md-8');
    expect(screen.getByText('Column').classList).toContain('order-md-1');
    expect(screen.getByText('Column').classList).toContain('col-4');
    expect(screen.getByText('Column').classList).toContain('offset-1');
    expect(screen.getByText('Column').classList).toContain('order-lg-last');
  });

  it('Should allow span to be null', () => {
    render(
      // @ts-ignore
      <Col xs="6" md={{ span: null, order: 1 }}>
        Column
      </Col>,
    );
    expect(screen.getByText('Column').classList).toContain('col-6');
    expect(screen.getByText('Column').classList).toContain('order-md-1');
    expect(screen.getByText('Column').classList).not.toContain('col-md');
  });

  it('Should allow span to be false', () => {
    render(
      <Col xs="6" md={{ span: false, order: 1 }}>
        Column
      </Col>,
    );
    expect(screen.getByText('Column').classList).toContain('col-6');
    expect(screen.getByText('Column').classList).toContain('order-md-1');
    expect(screen.getByText('Column').classList).not.toContain('col-md');
  });

  it('Should allow span to be auto', () => {
    render(
      <Col md="auto" lg={{ span: 'auto' }}>
        Column
      </Col>,
    );
    expect(screen.getByText('Column').classList).toContain('col-md-auto');
    expect(screen.getByText('Column').classList).toContain('col-lg-auto');
  });

  it('Should have div as default component', () => {
    render(<Col>Column</Col>);
    expect(screen.getByText('Column').tagName).toEqual('DIV');
  });

  it('should allow custom breakpoints', () => {
    render(
      <ThemeProvider breakpoints={['custom']}>
        <Col custom="3">test</Col>
      </ThemeProvider>,
    );
    expect(screen.getByText('test').classList).toContain('col-custom-3');
  });

  it('should allow custom breakpoints smaller than default "xs"', () => {
    render(
      <ThemeProvider breakpoints={['xxs', 'xs']} minBreakpoint="xxs">
        <Col xxs="3" xs="2">
          test
        </Col>
      </ThemeProvider>,
    );

    expect(screen.getByText('test').classList).toContain('col-3');
    expect(screen.getByText('test').classList).toContain('col-xs-2');
  });
});
