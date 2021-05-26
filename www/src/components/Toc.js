import * as React from 'react';
import styled from 'astroturf';

export const TocContext = React.createContext();

const SidePanel = styled('div')`
  @import '../css/theme';

  $top: 4rem;

  order: 2;
  position: sticky;
  top: $top;
  height: calc(100vh - #{$top});
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  overflow-y: auto;

  & > ul {
    padding-left: 0;
    border-left: 1px solid $divider;

    & ul {
      padding-left: 1rem;
    }
  }
`;

const ListItem = styled('li')`
  @import '../css/theme';

  & a {
    display: block;
    padding: 0.125rem 1.5rem;
    color: transparentize($text, 0.4);

    &:hover {
      color: $primary;
      text-decoration: none;
    }
  }
`;

const propTypes = {};

function toTree(list) {
  let map = {};
  let root = { children: [] };
  let parents = [];
  let last = null;

  // eslint-disable-next-line
  for (let item of list) {
    if (last && item.level > last.level) parents.push(last);
    if (last && item.level < last.level) parents.pop();
    last = item;
    let parent = parents[parents.length - 1];

    map[item.id] = map[item.id] || [];
    item.children = map[item.id];

    if (parent) {
      map[parent.id] = map[parent.id] || [];
      map[parent.id].push(item);
    } else root.children.push(item);
  }

  return root;
}
/* eslint-disable react/no-unused-state */
export class TocProvider extends React.Component {
  constructor(...args) {
    super(...args);

    this.list = new Map();

    this.state = {
      tree: { children: [] },
      registerNode: this.handleRegisterNode,
    };
  }

  handleRegisterNode = (level, title, id) => {
    if (level === 1) return;

    this.list.set(id, { level, title, id });
    cancelAnimationFrame(this.rafHandle);
    this.rafHandle = requestAnimationFrame(() => {
      this.setState({ tree: toTree(this.list.values()) });
    });
  };

  render() {
    return (
      <TocContext.Provider value={this.state}>
        {this.props.children}
      </TocContext.Provider>
    );
  }
}
/* eslint-enable react/no-unused-state */

TocProvider.propTypes = propTypes;

function renderNode(root) {
  return (
    <>
      {root.title && <a href={`#${root.id}`}>{root.title}</a>}
      <ul className="list-unstyled">
        {root.children.map((item, idx) => (
          <ListItem key={idx} level={item.level}>
            {renderNode(item)}
          </ListItem>
        ))}
      </ul>
    </>
  );
}

function Toc(props) {
  return (
    <SidePanel {...props}>
      <TocContext.Consumer>{(c) => renderNode(c.tree)}</TocContext.Consumer>
    </SidePanel>
  );
}

export default Toc;
