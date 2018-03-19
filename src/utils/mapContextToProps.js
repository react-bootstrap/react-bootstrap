import React from 'react';

export default function mapContextToProps(Component, consumers, mapToProps) {
  const name = Component.name || Component.displayName;

  if (!Array.isArray(consumers)) consumers = [consumers];
  const SingleConsumer = consumers[0];

  function singleRender() {
    return (
      <SingleConsumer>
        {value => (
          <Component {...this.props} {...mapToProps(value, this.props)} />
        )}
      </SingleConsumer>
    );
  }

  function multiRender() {
    const contexts = Array(consumers.length);
    return consumers.reduce(
      (child, Consumer, idx) => (
        <Consumer>
          {value => {
            contexts[idx] = value;
            return (
              child || (
                <Component
                  {...this.props}
                  {...mapToProps(...contexts, this.props)}
                />
              )
            );
          }}
        </Consumer>
      ),
      null
    );
  }

  const WrappedComponent = class extends React.Component {
    static displayName = `ContextTransform(${name})`;
  };

  WrappedComponent.prototype.render =
    consumers.length === 1 ? singleRender : multiRender;

  return WrappedComponent;
}
