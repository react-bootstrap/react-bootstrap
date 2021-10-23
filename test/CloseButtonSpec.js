import { mount } from 'enzyme';

import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    mount(<CloseButton />)
      .find('button')
      .should.have.length(1);
  });

  it('Should have type=button by default', () => {
    mount(<CloseButton />)
      .find('button')
      .getDOMNode()
      .getAttribute('type')
      .should.equal('button');
  });

  it('Should have class .btn-close', () => {
    mount(<CloseButton />).assertSingle('.btn-close');
  });

  it('Should call onClick callback', (done) => {
    mount(<CloseButton onClick={() => done()} />).simulate('click');
  });

  it('Should have a aria-label defaulted to "Close"', () => {
    mount(<CloseButton />)
      .find('button')
      .getDOMNode()
      .getAttribute('aria-label')
      .should.equal('Close');
  });

  it('Should allow override of aria-label', () => {
    mount(<CloseButton aria-label="My Close" />)
      .find('button')
      .getDOMNode()
      .getAttribute('aria-label')
      .should.equal('My Close');
  });
});
