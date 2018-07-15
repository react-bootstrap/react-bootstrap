import React from 'react';

export default function mapContextToProps(Component, consumers, mapToProps) {
  const name = Component.name || Component.displayName;

  if (!Array.isArray(consumers)) consumers = [consumers];
  const SingleConsumer = consumers[0];

  function singleRender(props, ref) {
    return (
      <SingleConsumer>
        {value => (
          <Component ref={ref} {...props} {...mapToProps(value, props)} />
        )}
      </SingleConsumer>
    );
  }

  function multiRender(props, ref) {
    const contexts = Array(consumers.length);
    return consumers.reduce(
      (child, Consumer, idx) => (
        <Consumer>
          {value => {
            contexts[idx] = value;
            return (
              child || (
                <Component
                  ref={ref}
                  {...props}
                  {...mapToProps(...contexts, props)}
                />
              )
            );
          }}
        </Consumer>
      ),
      null,
    );
  }
  const contextTransform = consumers.length === 1 ? singleRender : multiRender;
  contextTransform.displayName = `ContextTransform(${name})`;

  return React.forwardRef(contextTransform);
}
