import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Container from '../src/Container';

describe('<Container>', () => {
  it('should render props correctly', () => {
    render(<Container className="whatever">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('whatever');
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    render(<Container fluid>Container</Container>);
    expect(screen.getByText('Container').classList).toContain(
      'container-fluid',
    );
  });

  it('Should include size breakpoint class when fluid is set to sm, md, lg or xl', () => {
    render(<Container fluid="sm">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('container-sm');
  });

  it('allows custom elements instead of "div"', () => {
    render(<Container as="section">Container</Container>);
    expect(screen.getByText('Container').classList).toContain('container');
    expect(screen.getByText('Container').tagName).toEqual('SECTION');
  });

  it('Should have div as default component', () => {
    render(<Container>Container</Container>);
    expect(screen.getByText('Container').tagName).toEqual('DIV');
  });

  it('should allow custom breakpoints', () => {
    render(<Container fluid="custom">test</Container>);
    expect(screen.getByText('test').classList).toContain('container-custom');
  });
});
