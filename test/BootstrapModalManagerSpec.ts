import { expect } from 'chai';
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import { injectCss } from './helpers';
import BootstrapModalManager, {
  getSharedManager,
} from '../src/BootstrapModalManager';

const createModal = () => ({ dialog: null, backdrop: null });

describe('BootstrapModalManager', () => {
  let container, manager;

  beforeEach(() => {
    manager?.reset();
    manager = new BootstrapModalManager();
    container = document.createElement('div');
    container.setAttribute('id', 'container');

    const fixedContent = document.createElement('div');
    fixedContent.className = 'fixed-top';
    container.appendChild(fixedContent);
    const stickyContent = document.createElement('div');
    stickyContent.className = 'sticky-top';
    container.appendChild(stickyContent);
    const navbarToggler = document.createElement('div');
    navbarToggler.className = 'navbar-toggler';
    container.appendChild(navbarToggler);

    document.body.appendChild(container);
  });

  afterEach(() => {
    manager?.reset();
    document.body.removeChild(container);
    container = null;
    manager = null;
  });

  it('should add Modal', () => {
    const modal = createModal();

    manager.add(modal);

    expect(manager.modals.length).to.equal(1);
    expect(manager.modals[0]).to.equal(modal);

    expect(manager.state).to.eql({
      scrollBarWidth: 0,
      style: {
        overflow: '',
        paddingRight: '',
      },
    });
  });

  it('should return a shared modal manager', () => {
    const localManager = getSharedManager();
    localManager.should.exist;
  });

  it('should return a same modal manager if called twice', () => {
    let localManager = getSharedManager();
    localManager.should.exist;

    const modal = createModal();
    localManager.add(modal as any);
    localManager.modals.length.should.equal(1);

    localManager = getSharedManager();
    localManager.modals.length.should.equal(1);

    localManager.remove(modal as any);
  });

  describe('container styles', () => {
    beforeEach(() => {
      injectCss(`
        body {
          padding-right: 20px;
          padding-left: 20px;
          overflow: scroll;
        }

        #container {
          height: 4000px;
        }
      `);
    });

    afterEach(() => injectCss.reset());

    it('should set padding to right side', () => {
      const modal = createModal();
      manager.add(modal);

      expect(document.body.style.paddingRight).to.equal(
        `${getScrollbarSize() + 20}px`,
      );
    });

    it('should set padding to left side if RTL', () => {
      const modal = createModal();

      new BootstrapModalManager({ isRTL: true }).add(modal as any);

      expect(document.body.style.paddingLeft).to.equal(
        `${getScrollbarSize() + 20}px`,
      );
    });

    it('should restore container overflow style', () => {
      const modal = createModal();

      document.body.style.overflow = 'scroll';

      expect(document.body.style.overflow).to.equal('scroll');

      manager.add(modal);
      manager.remove(modal);

      expect(document.body.style.overflow).to.equal('scroll');
      document.body.style.overflow = '';
    });

    it('should restore container overflow style for RTL', () => {
      const modal = createModal();

      document.body.style.overflow = 'scroll';

      expect(document.body.style.overflow).to.equal('scroll');

      const localManager = new BootstrapModalManager({ isRTL: true });
      localManager.add(modal as any);
      localManager.remove(modal as any);

      expect(document.body.style.overflow).to.equal('scroll');
      document.body.style.overflow = '';
    });
  });
});
