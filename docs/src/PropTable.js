import merge from 'lodash/object/merge';
import React from 'react';

import Label from '../../src/Label';
import Table from '../../src/Table';


let cleanDocletValue = str => str.replace(/^\{/, '').replace(/\}$/, '');

const PropTable = React.createClass({

  contextTypes: {
    metadata: React.PropTypes.object
  },

  render(){
    let metadata = this.context.metadata[this.props.component] || {};

    if ( !Object.keys(metadata.props || {}).length){
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
          { this._renderRows() }
        </tbody>
      </Table>
    );
  },

  _renderRows(){
    let metadata = this.context.metadata[this.props.component] || {};
    let props = metadata.props || {};

    if (metadata.composes) {
      metadata.composes.forEach( other => {
        props = merge(props, (this.context.metadata[other] || {}).props);
      });
    }

    if (metadata.mixins) {
      metadata.mixins.forEach( other => {
        if ( metadata.composes.indexOf(other) === -1) {
          props = merge(props, (this.context.metadata[other] || {}).props);
        }
      });
    }

    return Object.keys(props)
      .sort()
      .filter(propName => props[propName].type && !props[propName].doclets.private )
      .map(propName => {
        let prop = props[propName];

        return (
          <tr key={propName} className='prop-table-row'>
            <td>
              {propName} {this.renderRequiredLabel(prop)}
            </td>
            <td>
              <div>{this.getType(prop)}</div>
            </td>
            <td>{prop.defaultValue}</td>
            <td dangerouslySetInnerHTML={{__html: prop.descHtml }}></td>
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
    let type = prop.type;
    let name = this.getDisplayTypeName(type.name);
    let doclets = prop.doclets || {};

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.map(val => this.getType({ type: val })).join(' | ');
      case 'array':
        return `array<${this.getDisplayTypeName(type.value.name)}>`;
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
