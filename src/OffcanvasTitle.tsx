import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';

const DivStyledAsH5 = divWithClassName('h5');

export default createWithBsPrefix('offcanvas-title', {
  Component: DivStyledAsH5,
});
