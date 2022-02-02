import * as React from 'react';
import { Transition } from 'react-transition-group';
import { render, RenderResult } from '@testing-library/react';
import sinon from 'sinon';
import { expect } from 'chai';

import Collapse, { CollapseProps } from '../src/Collapse';

describe('<Collapse>', () => {
  class Component extends React.Component<
    React.PropsWithChildren<Omit<CollapseProps, 'children'>>
  > {
    collapse: Transition<HTMLElement> | null = null;

    render() {
      const { children, ...props } = this.props;

      return (
        <Collapse
          ref={(r) => (this.collapse = r)}
          getDimensionValue={() => 15}
          data-testid="collapse-component"
          {...props}
          {...this.state}
        >
          <div>
            <span data-testid={props.in ? 'status-show' : 'status-hide'} />
            {children}
          </div>
        </Collapse>
      );
    }
  }

  it('should not throw an error with StrictMode', () => {
    render(
      <React.StrictMode>
        <Component in>Panel content</Component>
      </React.StrictMode>,
    );
  });

  it('should work with a class component as children', () => {
    class InnerComponent extends React.Component {
      render() {
        return <div {...this.props}>Inner</div>;
      }
    }

    const onEnteringSpy = sinon.spy();

    const { rerender } = render(
      <Collapse onEntering={onEnteringSpy}>
        <InnerComponent />
      </Collapse>,
    );

    rerender(
      <Collapse in onEntering={onEnteringSpy}>
        <InnerComponent />
      </Collapse>,
    );

    onEnteringSpy.should.have.been.calledOnce;
  });

  it('Should default to collapsed', () => {
    const { getByTestId } = render(
      <Component data-testid="test">Panel content</Component>,
    );

    getByTestId('test').classList.contains('show').should.be.false;
    getByTestId('status-hide').should.exist;
  });

  it('Should have collapse class', () => {
    const { getByTestId } = render(<Component>Panel content</Component>);

    getByTestId('collapse-component').classList.contains('collapse');
  });

  describe('from collapsed to expanded', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<Component>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      renderResult.rerender(<Component in>Panel content</Component>);

      renderResult
        .getByTestId('collapse-component')
        .classList.contains('collapsing');
    });

    it('Should set initial 0px height', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(
        <Component
          in
          onEnter={() => {
            expect(node.style.height).to.be.equal('0px');
            done();
          }}
        >
          Panel content
        </Component>,
      );
    });

    it('Should set node to height', () => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(<Component in>Panel content</Component>);

      expect(node.style.height).to.be.equal(`${node.scrollHeight}px`);
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      renderResult.rerender(
        <Component
          in
          onEntered={() => {
            node.classList.contains('collapse').should.be.true;
            node.classList.contains('show').should.be.true;
            done();
          }}
        >
          Panel content
        </Component>,
      );

      node.classList.contains('collapsing').should.be.true;
    });

    it('Should clear height after transition complete', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(
        <Component
          in
          onEntered={() => {
            expect(node.style.height).to.be.equal('');
            done();
          }}
        >
          Panel content
        </Component>,
      );

      expect(node.style.height).to.be.equal(`${node.scrollHeight}px`);
    });
  });

  describe('from expanded to collapsed', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(<Component in>Panel content</Component>);
    });

    it('Should have collapsing class', () => {
      renderResult.rerender(<Component in={false}>Panel content</Component>);

      const node = renderResult.getByTestId('collapse-component');
      node.classList.contains('collapsing').should.be.true;
    });

    it('Should set initial height', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(
        <Component
          in={false}
          onExit={() => {
            expect(node.style.height).to.be.equal('15px');
            done();
          }}
        >
          Panel content
        </Component>,
      );
    });

    it('Should set node to height', () => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(<Component in={false}>Panel content</Component>);

      expect(node.style.height).to.be.equal('');
    });

    it('Should transition from collapsing to not collapsing', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      renderResult.rerender(
        <Component
          in={false}
          onExited={() => {
            node.classList.contains('collapse').should.be.true;
            done();
          }}
        >
          Panel content
        </Component>,
      );

      node.classList.contains('collapsing').should.be.true;
    });

    it('Should have no height after transition complete', (done) => {
      const node = renderResult.getByTestId('collapse-component');

      expect(node.style.height).to.be.equal('');

      renderResult.rerender(
        <Component
          in={false}
          onExited={() => {
            expect(node.style.height).to.be.equal('');
            done();
          }}
        >
          Panel content
        </Component>,
      );
    });
  });

  describe('expanded', () => {
    it('Should have collapse and in class', () => {
      const { getByTestId } = render(<Component in>Panel content</Component>);

      const node = getByTestId('collapse-component');
      node.classList.contains('collapse').should.be.true;
      node.classList.contains('show').should.be.true;
    });
  });

  describe('dimension', () => {
    it('Should not have width in class', () => {
      const { getByTestId } = render(<Component>Panel content</Component>);

      const node = getByTestId('collapse-component');
      node.className.includes('width').should.be.false;
    });

    it('Should have collapse-horizontal in class', () => {
      const { getByTestId } = render(
        <Component dimension={() => 'width'}>Panel content</Component>,
      );

      const node = getByTestId('collapse-component');
      node.classList.contains('collapse-horizontal').should.be.true;
    });
  });

  describe('with a role', () => {
    it('sets aria-expanded true when expanded', () => {
      const { getByRole } = render(
        <Component role="menuitem" in>
          Panel content
        </Component>,
      );

      getByRole('menuitem', { expanded: true }).should.exist;
    });

    it('sets aria-expanded false when collapsed', () => {
      const { getByRole } = render(
        <Component role="menuitem" in={false}>
          Panel content
        </Component>,
      );

      getByRole('menuitem', { expanded: false }).should.exist;
    });
  });
});
