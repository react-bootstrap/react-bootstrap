import styled from 'astroturf';
import { graphql } from 'gatsby';
import upperFirst from 'lodash/upperFirst';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import * as React from 'react';
import Table from 'react-bootstrap/Table';

function getDoclet(doclets = [], tag) {
  const doclet = doclets.find((d) => d.tag === tag);
  return doclet && doclet.value;
}

const Code = styled('code')`
  white-space: nowrap;
`;

const PropDescription = styled('div')`
  & pre {
    border-radius: 0;
    border-width: 0;
    border-left-width: 3px;
  }
`;

function cleanDocletValue(str) {
  return str.trim().replace(/^\{/, '').replace(/\}$/, '');
}
function getDisplayTypeName(typeName) {
  if (typeName === 'func') return 'function';
  if (typeName === 'bool') return 'boolean';

  return typeName;
}

function getTypeName(prop) {
  const type = prop.type || {};
  const name = getDisplayTypeName(type.name);

  if (name === 'custom') {
    const dType = getDoclet(prop.doclets, 'type');
    return cleanDocletValue((dType && dType.value) || type.raw);
  }
  return name;
}

class PropTable extends React.Component {
  static propTypes = {
    metadata: PropTypes.object.isRequired,
  };

  getType(prop) {
    let type = prop.type || {};
    let name = getDisplayTypeName(type.name);
    const docletType = getDoclet(prop.doclets, 'type');

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.reduce((current, val, i, list) => {
          let item = this.getType({ type: val });
          if (React.isValidElement(item)) {
            item = React.cloneElement(item, { key: i });
          }
          current = current.concat(item);

          return i === list.length - 1 ? current : current.concat(' | ');
        }, []);
      case 'array': {
        let child = this.getType({ type: type.value });

        return (
          <span>
            {'array<'}
            {child}
            {'>'}
          </span>
        );
      }
      case 'enum':
        return this.renderEnum(type);
      case 'custom':
        return cleanDocletValue(docletType || type.raw);
      default:
        return name;
    }
  }

  _renderRows(propsData) {
    return sortBy(propsData, (_) =>
      _.name.startsWith('bs') ? 'zzzzzz' : _.name,
    )
      .filter(
        (prop) => prop.type && !prop.doclets.private && !prop.doclets.ignore,
      )
      .map((propData) => {
        const { name, description, doclets } = propData;
        const alias = getDoclet(doclets, 'alias');
        const deprecated = getDoclet(doclets, 'deprecated');
        let descHtml = description && description.childMarkdownRemark.html;

        return (
          <tr key={name} className="prop-table-row">
            <td className="text-monospace">
              {alias || name} {this.renderRequiredBadge(propData)}
            </td>
            <td className="text-monospace">
              <div>{this.getType(propData)}</div>
            </td>

            <td>{this.renderDefaultValue(propData)}</td>

            <td>
              {!!deprecated && (
                <div className="mb-1">
                  <strong className="text-danger">
                    {`Deprecated: ${deprecated} `}
                  </strong>
                </div>
              )}
              {this.renderControllableNote(propData, name)}
              <PropDescription dangerouslySetInnerHTML={{ __html: descHtml }} />
            </td>
          </tr>
        );
      });
  }

  renderDefaultValue(prop) {
    let value = prop.defaultValue && prop.defaultValue.value;
    if (value == null) return null;
    if (getTypeName(prop) === 'elementType')
      value = `<${value.replace(/('|")/g, '')}>`;
    return <Code>{value}</Code>;
  }

  renderControllableNote(prop, propName) {
    const controllable = getDoclet(prop.doclets, 'controllable');
    const isHandler = getDisplayTypeName(prop.type.name) === 'function';

    if (!controllable) {
      return false;
    }

    let text = isHandler ? (
      <span>
        controls <code>{controllable}</code>
      </span>
    ) : (
      <span>
        controlled by: <Code>{controllable}</Code>, initial prop:{' '}
        <Code>{`default${upperFirst(propName)}`}</Code>
      </span>
    );

    return (
      <div className="mb-2">
        <small>
          <em className="text-info">{text}</em>
        </small>
      </div>
    );
  }

  renderEnum(enumType) {
    const enumValues = enumType.value || [];
    if (!Array.isArray(enumValues)) return enumValues;

    const renderedEnumValues = [];
    enumValues.forEach(({ value }, i) => {
      if (i > 0) {
        renderedEnumValues.push(<span key={`${i}c`}> | </span>);
      }

      renderedEnumValues.push(<code key={i}>{value}</code>);
    });

    return <span>{renderedEnumValues}</span>;
  }

  renderRequiredBadge(prop) {
    if (!prop.required) {
      return null;
    }

    return <sup className="text-danger">required</sup>;
  }

  render() {
    let propsData = this.props.metadata.props || [];

    if (!propsData.length) {
      return (
        <div className="text-muted">
          <em>There are no public props for this component.</em>
        </div>
      );
    }

    return (
      <div className="overflow-auto mt-4 mb-5 border border-light">
        <Table bordered striped className="bg-white mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this._renderRows(propsData)}</tbody>
        </Table>
      </div>
    );
  }
}

export const metadataFragment = graphql`
  fragment Description_markdown on ComponentDescription {
    childMarkdownRemark {
      html
    }
  }

  fragment PropTable_metadata on ComponentMetadata {
    composes
    displayName
    description {
      ...Description_markdown
    }
    props {
      name
      doclets
      defaultValue {
        value
        computed
      }
      description {
        ...Description_markdown
      }
      required
      type {
        name
        value
        raw
      }
    }
  }
`;

export default PropTable;
