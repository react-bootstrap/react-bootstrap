import addClass from 'dom-helpers/addClass';
import css from 'dom-helpers/css';
import qsa from 'dom-helpers/querySelectorAll';
import removeClass from 'dom-helpers/removeClass';
import ModalManager, {
  ContainerState,
  ModalManagerOptions,
} from '@restart/ui/ModalManager';

const Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler',
};

class BootstrapModalManager extends ModalManager {
  private adjustAndStore<T extends keyof CSSStyleDeclaration>(
    prop: T,
    element: HTMLElement,
    adjust: number,
  ) {
    const actual = element.style[prop];
    // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore
    element.dataset[prop] = actual;
    css(element, {
      [prop]: `${parseFloat(css(element, prop as any)) + adjust}px`,
    });
  }

  private restore<T extends keyof CSSStyleDeclaration>(
    prop: T,
    element: HTMLElement,
  ) {
    const value = element.dataset[prop];
    if (value !== undefined) {
      delete element.dataset[prop];
      css(element, { [prop]: value });
    }
  }

  setContainerStyle(containerState: ContainerState) {
    super.setContainerStyle(containerState);

    const container = this.getElement();
    addClass(container, 'modal-open');

    if (!containerState.scrollBarWidth) return;

    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';

    qsa(container, Selector.FIXED_CONTENT).forEach((el) =>
      this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth),
    );
    qsa(container, Selector.STICKY_CONTENT).forEach((el) =>
      this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth),
    );
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) =>
      this.adjustAndStore(marginProp, el, containerState.scrollBarWidth),
    );
  }

  removeContainerStyle(containerState: ContainerState) {
    super.removeContainerStyle(containerState);

    const container = this.getElement();
    removeClass(container, 'modal-open');

    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';

    qsa(container, Selector.FIXED_CONTENT).forEach((el) =>
      this.restore(paddingProp, el),
    );
    qsa(container, Selector.STICKY_CONTENT).forEach((el) =>
      this.restore(marginProp, el),
    );
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) =>
      this.restore(marginProp, el),
    );
  }
}

let sharedManager: BootstrapModalManager | undefined;
export function getSharedManager(options?: ModalManagerOptions) {
  if (!sharedManager) sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}

export default BootstrapModalManager;
