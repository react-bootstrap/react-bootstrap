import { render } from '@testing-library/react';

import Container from '../src/Container';

describe('<Container>', () => {
  it('should render props correctly', () => {
    const { getByText } = render(
      <Container className="whatever">Container</Container>,
    );
    getByText('Container').classList.contains('whatever').should.be.true;
  });

  it('turns grid into "full-width" layout via "fluid" property set', () => {
    const { getByText } = render(<Container fluid>Container</Container>);
    getByText('Container').classList.contains('container-fluid').should.be.true;
  });

  it('Should include size breakpoint class when fluid is set to sm, md, lg or xl', () => {
    const { getByText } = render(<Container fluid="sm">Container</Container>);
    getByText('Container').classList.contains('container-sm').should.be.true;
  });

  it('allows custom elements instead of "div"', () => {
    const { getByText } = render(<Container as="section">Container</Container>);
    getByText('Container').classList.contains('container').should.be.true;
    getByText('Container').tagName.toLowerCase().should.equal('section');
  });

  it('Should have div as default component', () => {
    const { getByText } = render(<Container>Container</Container>);
    getByText('Container').tagName.toLowerCase().should.equal('div');
  });

  it('should allow custom breakpoints', () => {
    const { getByText } = render(<Container fluid="custom">test</Container>);
    getByText('test').classList.contains('container-custom').should.be.true;
  });
});
