import React from 'react';

/**
 * Creates new trigger class that injects context into overlay.
 */
export default function createContextWrapper(Trigger, propName) {
  return function (contextTypes) {
    class ContextWrapper extends React.Component {
      getChildContext() {
        return this.props.context;
      }

      render() {
        // Strip injected props from below.
        const {wrapped, ...props} = this.props; // eslint-disable-line object-shorthand
        delete props.context;

        return React.cloneElement(wrapped, props);
      }
    }
    ContextWrapper.childContextTypes = contextTypes;

    class TriggerWithContext {
      render() {
        const props = {...this.props};
        props[propName] = this.getWrappedOverlay();

        return (
          <Trigger {...props}>
            {this.props.children}
          </Trigger>
        );
      }

      getWrappedOverlay() {
        return (
          <ContextWrapper
            context={this.context}
            wrapped={this.props[propName]}
          />
        );
      }
    }
    TriggerWithContext.contextTypes = contextTypes;

    return TriggerWithContext;
  };
}
