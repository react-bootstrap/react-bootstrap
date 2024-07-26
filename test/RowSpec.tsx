import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../src';
import Row from '../src/Row';

describe('Row', () => {
  it('Should include "row" when there are no sizes', () => {
    render(<Row>Row</Row>);
    expect(screen.getByText('Row').classList).toContain('row');
  });

  it('Should include sizes', () => {
    render(
      <Row xs={4} md={8}>
        Row
      </Row>,
    );
    expect(screen.getByText('Row').classList).toContain('row-cols-md-8');
    expect(screen.getByText('Row').classList).toContain('row-cols-4');
  });

  it('Should allow sizes as objects', () => {
    render(
      <Row xs={{ cols: 4 }} md={{ cols: 8 }}>
        Row
      </Row>,
    );
    expect(screen.getByText('Row').classList).toContain('row-cols-md-8');
    expect(screen.getByText('Row').classList).toContain('row-cols-4');
  });

  it('Should allow auto as size', () => {
    render(
      <Row xs="auto" md="auto">
        Row
      </Row>,
    );
    expect(screen.getByText('Row').classList).toContain('row-cols-md-auto');
    expect(screen.getByText('Row').classList).toContain('row-cols-auto');
  });

  it('Should allow auto as size in object form', () => {
    render(
      <Row xs={{ cols: 'auto' }} md={{ cols: 'auto' }}>
        Row
      </Row>,
    );
    expect(screen.getByText('Row').classList).toContain('row-cols-md-auto');
    expect(screen.getByText('Row').classList).toContain('row-cols-auto');
  });

  it('uses "div" by default', () => {
    render(
      <Row className="custom-class">
        <strong>Children</strong>
      </Row>,
    );
    const wrapper = screen.getByText('Children').parentElement;
    expect(wrapper?.tagName).toEqual('DIV');
    expect(wrapper?.classList).toContain('row');
    expect(wrapper?.classList).toContain('custom-class');
    expect(screen.getByText('Children').tagName).toEqual('STRONG');
  });

  it('should allow custom elements instead of "div"', () => {
    render(<Row as="section">Row</Row>);
    expect(screen.getByText('Row').tagName).toEqual('SECTION');
    expect(screen.getByText('Row').classList).toContain('row');
  });

  it('should allow custom breakpoints', () => {
    render(
      <ThemeProvider breakpoints={['custom']}>
        <Row custom="3">test</Row>
      </ThemeProvider>,
    );
    expect(screen.getByText('test').classList).toContain('row-cols-custom-3');
  });

  it('should allow custom breakpoints smaller than default "xs"', () => {
    render(
      <ThemeProvider breakpoints={['xxs', 'xs']} minBreakpoint="xxs">
        <Row xxs="3" xs="2">
          test
        </Row>
      </ThemeProvider>,
    );

    expect(screen.getByText('test').classList).toContain('row-cols-3');
    expect(screen.getByText('test').classList).toContain('row-cols-xs-2');
  });
});
