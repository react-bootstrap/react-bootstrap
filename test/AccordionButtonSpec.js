import { mount } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import AccordionButton from '../src/AccordionButton';

describe('<AccordionButton>', () => {
  it('Should have button as default component', () => {
    mount(<AccordionButton />).assertSingle('button[type="button"]');
  });

  it('Should allow rendering as different component', () => {
    mount(<AccordionButton as="div" />).assertSingle('div.accordion-button');
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
