import React from 'react';

export default function mapContextToProps(Component, Consumer, mapToProps) {
  const name = Component.name || Component.displayName;
  return class extends React.Component {
    static displayName = `ContextTransform(${name})`;
    render() {
      return (
        <Consumer>
          {context => (
            <Component {...this.props} {...mapToProps(context, this.props)} />
          )}
        </Consumer>
      );
    }
  };
}
