import capitalize from 'lodash/capitalize';
import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Badge from 'react-bootstrap/lib/Badge';
import Table from 'react-bootstrap/lib/Table';

function cleanDocletValue(str) {
  return str
    .trim()
    .replace(/^\{/, '')
    .replace(/\}$/, '');
}

// function getPropsData(component, metadata) {
//   let componentData = metadata[component] || {};
//   let props = componentData.props || {};

//   if (componentData.composes) {
//     componentData.composes.forEach(other => {
//       if (other !== component) {
//         props = merge({}, getPropsData(other, metadata), props);
//       }
//     });
//   }

//   return props;
// }

function getDisplayTypeName(typeName) {
  if (typeName === 'func') return 'function';
  else if (typeName === 'bool') return 'boolean';

  return typeName;
}
function getTypeName(prop) {
  const type = prop.type || {};
  let name = getDisplayTypeName(type.name);
  let doclets = prop.doclets || {};
  if (name === 'custom') return cleanDocletValue(doclets.type || type.raw);
  return name;
}

class PropTable extends React.Component {
  static propTypes = {
    metadata: PropTypes.object.isRequired,
  };

  getType(prop) {
    let type = prop.type || {};
    let name = getDisplayTypeName(type.name);
    let doclets = prop.doclets || {};

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
        return cleanDocletValue(doclets.type || type.raw);
      default:
        return name;
    }
  }

  _renderRows(propsData) {
    return propsData
      .filter(
        prop => prop.type && !prop.doclets.private && !prop.doclets.ignore,
      )
      .map(propData => {
        const { name, description, doclets } = propData;
        let descHtml = description && description.childMarkdownRemark.html;

        return (
          <tr key={name} className="prop-table-row">
            <td>
              {name} {this.renderRequiredBadge(propData)}
            </td>
            <td>
              <div>{this.getType(propData)}</div>
            </td>

            <td>{this.renderDefaultValue(propData)}</td>

            <td>
              {doclets.deprecated && (
                <div className="prop-desc-heading">
                  <strong className="text-danger">
                    {`Deprecated: ${doclets.deprecated} `}
                  </strong>
                </div>
              )}
              {this.renderControllableNote(propData, name)}
              <div
                className="prop-desc"
                dangerouslySetInnerHTML={{ __html: descHtml }}
              />
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
    return <code>{value}</code>;
  }

  renderControllableNote(prop, propName) {
    let controllable = prop.doclets.controllable;
    let isHandler = getDisplayTypeName(prop.type.name) === 'function';

    if (!controllable) {
      return false;
    }

    let text = isHandler ? (
      <span>
        controls <code>{controllable}</code>
      </span>
    ) : (
      <span>
        controlled by: <code>{controllable}</code>, initial prop:{' '}
        <code>{`default${capitalize(propName)}`}</code>
      </span>
    );

    return (
      <div className="prop-desc-heading">
        <small>
          <em className="text-info">
            <Glyphicon glyph="info-sign" />
            &nbsp;{text}
          </em>
        </small>
      </div>
    );
  }

  renderEnum(enumType) {
    const enumValues = enumType.value || [];

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

    return <Badge>required</Badge>;
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
      <Table bordered striped className="prop-table">
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
    );
  }
}

export const descFragment = graphql`
  fragment Description_markdown on ComponentDescription {
    childMarkdownRemark {
      html
    }
  }
`;

export const metadataFragment = graphql`
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
