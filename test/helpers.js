import {cloneElement} from 'react';
import ReactDOM from 'react-dom';

export function shouldWarn(about) {
  console.error.called.should.be.true;
  console.error.calledWithMatch(about).should.be.true;
  console.error.reset();
}

/**
 * Helper for rendering and updating props for plain class Components
 * since `setProps` is deprecated.
 * @param  {ReactElement} element     Root element to render
 * @param  {HTMLElement?} mountPoint  Optional mount node, when empty it uses an unattached div like `renderIntoDocument()`
 * @return {ComponentInstance}        The instance, with a new method `renderWithProps` which will return a new instance with updated props
 */
export function render(element, mountPoint) {
  let mount = mountPoint || document.createElement('div');
  let instance = ReactDOM.render(element, mount);

  if (instance && !instance.renderWithProps) {
    instance.renderWithProps = newProps => {

      return render(
        cloneElement(element, newProps), mount);
    };
  }

  return instance;
}

export function getOne(collection) {
  expect(collection.length).to.equal(1);
  return collection[0];
}
