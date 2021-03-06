import { mount } from 'enzyme';

import Figure from '../src/Figure';

describe('<Figure.Caption>', () => {
  it('uses "figcaption" by default', () => {
    mount(<Figure.Caption />).assertSingle('figcaption');
  });

  it('has "figure-caption" class', () => {
    mount(<Figure.Caption>FigureCaption content</Figure.Caption>).assertSingle(
      '.figure-caption',
    );
  });

  it('Should merge additional classes passed in', () => {
    mount(<Figure.Caption className="bob" />).assertSingle(
      '.bob.figure-caption',
    );
  });

  it('allows custom elements instead of "figcaption"', () => {
    mount(<Figure.Caption as="section" />).assertSingle('section');
  });
});
