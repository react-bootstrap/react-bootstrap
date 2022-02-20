import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import AccordionButton from '../src/AccordionButton';

describe('<AccordionButton>', () => {
  it('Should have button as default component', () => {
    const { getByTestId } = render(
      <AccordionButton data-testid="test-accordion-button" />,
    );
    getByTestId('test-accordion-button')
      .tagName.toLowerCase()
      .should.equal('button');
    getByTestId('test-accordion-button')
      .getAttribute('type')!
      .should.equal('button');
  });

  it('Should allow rendering as different component', () => {
    const { getByTestId } = render(
      <AccordionButton data-testid="test-accordion-button" as="div" />,
    );
    getByTestId('test-accordion-button')
      .tagName.toLowerCase()
      .should.equal('div');
  });

  it('Should call onClick', () => {
    const onClickSpy = sinon.spy();
    const { getByTestId } = render(
      <AccordionButton data-testid="btn" onClick={onClickSpy} />,
    );
    fireEvent.click(getByTestId('btn'));

    onClickSpy.should.be.calledOnce;
  });
});
