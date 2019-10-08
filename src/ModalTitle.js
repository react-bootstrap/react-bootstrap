import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';

const DivStyledAsH4 = divWithClassName('h4');

export default createWithBsPrefix('modal-title', { Component: DivStyledAsH4 });
