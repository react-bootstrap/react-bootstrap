import React from 'react';
import { cloneElement } from 'react';

export function shouldWarn(about) {
  console.warn.called.should.be.true;
  console.warn.calledWithMatch(about).should.be.true;
  console.warn.reset();
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
  let instance = React.render(element, mount);

  if (!instance.renderWithProps) {
    instance.renderWithProps = newProps => {

      return render(
        cloneElement(element, newProps), mount);
    };
  }

  return instance;
}
