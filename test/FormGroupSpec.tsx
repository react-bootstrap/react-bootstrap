import { render } from '@testing-library/react';

import FormControl from '../src/FormControl';
import FormLabel from '../src/FormLabel';
import FormGroup from '../src/FormGroup';

describe('<FormGroup>', () => {
  it('renders children', () => {
    const { getByTestId } = render(
      <FormGroup data-testid="test-id">
        <span className="child1" />
        <span className="child2" />
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    element.childElementCount.should.equal(2);

    const child1 = element.children[0];
    child1.tagName.toLowerCase().should.equal('span');
    child1.classList.length.should.equal(1);
    child1.classList.contains('child1').should.be.true;

    const child2 = element.children[1];
    child2.tagName.toLowerCase().should.equal('span');
    child2.classList.length.should.equal(1);
    child2.classList.contains('child2').should.be.true;
  });

  it('provided controlId to label and control', () => {
    const { getByTestId } = render(
      <FormGroup controlId="my-control" data-testid="test-id">
        <div>
          <FormLabel>label</FormLabel>
          <FormControl />
        </div>
      </FormGroup>,
    );

    const element = getByTestId('test-id');
    const label = element.getElementsByTagName('label');
    label.length.should.equal(1);
    label[0].getAttribute('for')!.should.equal('my-control');

    const input = element.getElementsByTagName('input');
    input.length.should.equal(1);
    input[0].id.should.be.equal('my-control');
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(<FormGroup data-testid="test-id" />);

    const element = getByTestId('test-id');
    element.tagName.toLowerCase().should.equal('div');
  });
});
