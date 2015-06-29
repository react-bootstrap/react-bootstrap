import merge from 'lodash/object/merge';
import React from 'react';

import Label from '../../src/Label';
import Table from '../../src/Table';


let cleanDocletValue = str => str.trim().replace(/^\{/, '').replace(/\}$/, '');

function getPropsData(componentData, metadata){

  let props = componentData.props || {};

  if (componentData.composes) {
    componentData.composes.forEach( other => {
      props = merge({}, getPropsData(metadata[other] || {}, metadata), props);

    });
  }

  if (componentData.mixins) {
    componentData.mixins.forEach( other => {
      if ( componentData.composes.indexOf(other) === -1) {
        props = merge({}, getPropsData(metadata[other] || {}, metadata), props);
      }
    });
  }

  return props;
}

const PropTable = React.createClass({

  contextTypes: {
    metadata: React.PropTypes.object
  },

  componentWillMount(){
    let componentData = this.context.metadata[this.props.component] || {};

    this.propsData = getPropsData(componentData, this.context.metadata);
  },

  render(){
    let propsData = this.propsData;

    if ( !Object.keys(propsData).length){
      return <span/>;
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
        <tbody>
          { this._renderRows(propsData) }
        </tbody>
      </Table>
    );
  },

  _renderRows(propsData){

    return Object.keys(propsData)
      .sort()
      .filter(propName => propsData[propName].type && !propsData[propName].doclets.private )
      .map(propName => {
        let propData = propsData[propName];

        return (
          <tr key={propName} className='prop-table-row'>
            <td>
              {propName} {this.renderRequiredLabel(propData)}
            </td>
            <td>
              <div>{this.getType(propData)}</div>
            </td>
            <td>{propData.defaultValue}</td>

            <td>
              { propData.doclets.deprecated
                && <div><strong className='text-danger'>{'Deprecated: ' + propData.doclets.deprecated + ' '}</strong></div>
              }
              { propData.desc }
            </td>
          </tr>
        );
      });
  },

  renderRequiredLabel(prop) {
    if (!prop.required) {
      return null;
    }

    return (
      <Label>required</Label>
    );
  },

  getType(prop) {
    let type = prop.type || {};
    let name = this.getDisplayTypeName(type.name);
    let doclets = prop.doclets || {};

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.reduce((current, val, i, list) => {
          current = current.concat(this.getType({ type: val }));

          return i === (list.length - 1) ? current : current.concat(' | ');
        }, []);
      case 'array':
        let child = this.getType({ type: type.value });

        return <span>{'array<'}{ child }{'>'}</span>;
      case 'enum':
        return this.renderEnum(type);
      case 'custom':
        return cleanDocletValue(doclets.type || name);
      default:
        return name;
    }
  },

  getDisplayTypeName(typeName) {
    if (typeName === 'func') {
      return 'function';
    } else if (typeName === 'bool') {
      return 'boolean';
    } else {
      return typeName;
    }
  },

  renderEnum(enumType) {
    const enumValues = enumType.value || [];

    const renderedEnumValues = [];
    enumValues.forEach(function renderEnumValue(enumValue, i) {
      if (i > 0) {
        renderedEnumValues.push(
          <span key={`${i}c`}>, </span>
        );
      }

      renderedEnumValues.push(
        <code key={i}>{enumValue}</code>
      );
    });

    return (
      <span>one of: {renderedEnumValues}</span>
    );
  }
});



export default PropTable;
