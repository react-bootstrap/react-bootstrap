import * as React from 'react';
import { useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';
import ModalManager from '@restart/ui/ModalManager';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Offcanvas from '../src/Offcanvas';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('<Offcanvas>', () => {
  it('Should render the modal content', () => {
    render(
      <Offcanvas show onHide={noop}>
        <strong data-testid="test">Message</strong>
      </Offcanvas>,
    );
    const strongElem = screen.getByTestId('test');
    expect(strongElem.tagName).toEqual('STRONG');
    expect(strongElem.textContent).toEqual('Message');
  });

  it('Should set `visibility: visible` to `offcanvas`', () => {
    render(
      <Offcanvas data-testid="test" show>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');

    expect(offcanvasElem.tagName).toEqual('DIV');
    expect(offcanvasElem.classList).toContain('offcanvas');
    expect(offcanvasElem.style.visibility).toEqual('visible');
  });

  it('Should close the offcanvas when the modal close button is clicked', async () => {
    const onHideSpy = vi.fn();

    render(
      <Offcanvas show onHide={onHideSpy}>
        <Offcanvas.Header closeButton />
        <strong>Message</strong>
      </Offcanvas>,
    );
    const buttonElem = document.getElementsByClassName('btn-close')[0];

    expect(buttonElem.classList).toContain('btn-close');

    fireEvent.click(buttonElem);

    await waitFor(() => expect(onHideSpy).toHaveBeenCalled());
  });

  it('Should pass className to the offcanvas', () => {
    render(
      <Offcanvas show className="myoffcanvas" onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('myoffcanvas');
  });

  it('Should pass backdropClassName to the backdrop', () => {
    render(
      <Offcanvas show backdropClassName="custom-backdrop" onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];
    expect(backdropElem.classList).toContain('custom-backdrop');
  });

  it('Should pass style to the offcanvas', () => {
    render(
      <Offcanvas show style={{ color: 'red' }} onHide={noop} data-testid="test">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.style.color).toEqual('red');
  });

  it('Should pass transition callbacks to Transition', async () => {
    const increment = vi.fn();
    const Elem = () => {
      const [show, setShow] = React.useState(true);
      return (
        <Offcanvas
          show={show}
          onHide={noop}
          onExit={increment}
          onExiting={increment}
          onExited={increment}
          onEnter={increment}
          onEntering={increment}
          onEntered={() => {
            increment();
            setShow(false);
          }}
        >
          <strong>Message</strong>
        </Offcanvas>
      );
    };

    render(<Elem />);

    await waitFor(() => expect(increment).toHaveBeenCalledTimes(6));
  });

  it('Should close when backdrop clicked', () => {
    const onHideSpy = vi.fn();
    render(
      <Offcanvas show onHide={onHideSpy}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];

    fireEvent.click(backdropElem);

    expect(onHideSpy).toHaveBeenCalled();
  });

  it('should not close when static backdrop is clicked', () => {
    const onHideSpy = vi.fn();
    render(
      <Offcanvas show onHide={onHideSpy} backdrop="static">
        <strong>Message</strong>
      </Offcanvas>,
    );
    const backdropElem =
      document.getElementsByClassName('offcanvas-backdrop')[0];

    fireEvent.click(backdropElem);

    expect(onHideSpy).not.toHaveBeenCalled();
  });

  // TODO: unsure if we need this, since it seems like Offcanvas is still undergoing some
  // changes upstream.
  // it('Should close when anything outside offcanvas clicked and backdrop=false', () => {
  //   const onHideSpy = vi.fn();
  //   render(
  //     <>
  //       <Offcanvas show onHide={onHideSpy} backdrop={false}>
  //         <strong>Message</strong>
  //       </Offcanvas>
  //       <button type="button" id="mybutton">
  //         my button
  //       </button>
  //     </>,
  //   );

  //   fireEvent.click(document.body);

  //   onHideSpy).toHaveBeenCalled()
  // });

  it('Should not call onHide if the click target comes from inside the offcanvas', () => {
    const onHideSpy = vi.fn();
    render(
      <>
        <Offcanvas show onHide={onHideSpy} data-testid="test">
          <strong>Message</strong>
        </Offcanvas>
        <div id="outside">outside</div>
      </>,
    );
    const offcanvasElem = screen.getByTestId('test');
    fireEvent.click(offcanvasElem);

    expect(onHideSpy).not.toHaveBeenCalled();
  });

  it('Should set aria-labelledby to the role="dialog" element if aria-labelledby set', () => {
    render(
      <Offcanvas
        show
        onHide={noop}
        aria-labelledby="offcanvas-title"
        data-testid="test"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvas-title">
            Offcanvas heading
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('show');
    expect(offcanvasElem.getAttribute('role')).toEqual('dialog');
    expect(offcanvasElem.getAttribute('aria-labelledby')).toEqual(
      'offcanvas-title',
    );
  });

  it('Should call onEscapeKeyDown when keyboard is true', () => {
    const onEscapeKeyDownSpy = vi.fn();
    render(
      <Offcanvas
        show
        onHide={noop}
        keyboard
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onEscapeKeyDownSpy).toHaveBeenCalled();
  });

  it('Should not call onEscapeKeyDown when keyboard is false', () => {
    const onEscapeKeyDownSpy = vi.fn();
    render(
      <Offcanvas
        show
        onHide={noop}
        keyboard={false}
        onEscapeKeyDown={onEscapeKeyDownSpy}
      >
        <strong>Message</strong>
      </Offcanvas>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onEscapeKeyDownSpy).not.toHaveBeenCalled();
  });

  it('Should use custom props manager if specified', async () => {
    const addSpy = vi.fn();

    class MyModalManager extends ModalManager {
      // @ts-ignore
      add() {
        addSpy();
      }
    }

    const managerRef = React.createRef<any>();
    (managerRef as any).current = new MyModalManager();

    render(
      <Offcanvas show onHide={noop} manager={managerRef.current}>
        <strong>Message</strong>
      </Offcanvas>,
    );

    await waitFor(() => expect(addSpy).toHaveBeenCalled());
  });

  it('should not change overflow style when scroll=true', () => {
    const containerRef = React.createRef<any>();

    render(
      <div ref={containerRef} style={{ height: '2000px', overflow: 'scroll' }}>
        <Offcanvas show onHide={noop} container={containerRef} scroll>
          <strong>Message</strong>
        </Offcanvas>
      </div>,
    );

    expect(containerRef.current.style.overflow).toEqual('scroll');
  });

  it('should set responsive class', () => {
    render(
      <Offcanvas data-testid="test" responsive="lg" show onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.classList).toContain('offcanvas-lg');
  });

  it('should render offcanvas when show=false', () => {
    render(
      <Offcanvas data-testid="test" responsive="lg" onHide={noop}>
        <strong>Message</strong>
      </Offcanvas>,
    );
    const offcanvasElem = screen.getByTestId('test');
    expect(offcanvasElem.getAttribute('role')).to.not.exist;
  });

  it('should not mount, unmount and mount content on show', () => {
    const InnerComponent = ({ onMount, onUnmount }) => {
      useEffect(() => {
        onMount();
        return () => {
          onUnmount();
        };
      }, []);

      return <div>Content</div>;
    };

    const onMountSpy = vi.fn();
    const onUnmountSpy = vi.fn();

    const { unmount } = render(
      <Offcanvas data-testid="test" onHide={noop} show>
        <InnerComponent onMount={onMountSpy} onUnmount={onUnmountSpy} />
      </Offcanvas>,
    );

    expect(onMountSpy).toHaveBeenCalledOnce();

    unmount();

    expect(onUnmountSpy).toHaveBeenCalledOnce();
  });
});
