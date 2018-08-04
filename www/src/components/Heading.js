import React from 'react';
import mapContextToProps from 'react-context-toolbox/lib/mapContextToProps';
import Anchor from './Anchor';
import { TocContext } from './Toc';

class Heading extends React.Component {
  componentDidMount() {
    const { h, registerNode, id, children } = this.props;
    if (!registerNode) return;
    registerNode(parseInt(h, 10), children, id);
  }

  render() {
    const { h, id, subtitle, children } = this.props;
    return (
      <Anchor as={`h${h}`} id={id}>
        <div className="d-flex align-items-center">
          {children}
          <span className="ml-auto" />
          {subtitle}
        </div>
      </Anchor>
    );
  }
}

export default mapContextToProps(
  TocContext,
  c => ({ registerNode: c.registerNode }),
  Heading,
);
