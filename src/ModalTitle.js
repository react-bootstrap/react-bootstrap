import createWithBsPrefix from './utils/createWithBsPrefix';
import divWithClassName from './utils/divWithClassName';

const DivStyledAsH4 = divWithClassName('h4');

export default createWithBsPrefix('modal-title', { Component: DivStyledAsH4 });
