import React from 'react';
import Table from '../../src/Table';
import merge from 'lodash/object/merge';

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
      <Table bordered striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
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
            <td><code>{propName}</code></td>
            <td>
              <div><code>{ this.getType(prop)}</code></div>
              <div>
                <strong>
                  { prop.required && <small>(required) </small> }
                  { prop.defaultValue && <small><em>{'default: ' + prop.defaultValue }</em></small> }
                </strong>
              </div>
            </td>
            <td>{prop.desc}</td>
          </tr>
        );
      });
  },

  getType(prop){
    let type = prop.type;
    let name = type.name;
    let doclets = prop.doclets || {};

    switch (name) {
      case 'object':
        return name;
      case 'union':
        return type.value.map(val => this.getType({ type: val })).join(' | ');

      case 'array':
        return 'Array<' + type.value.name + '>';
      case 'enum':
        return 'One Of: ' + (type.value || []).join(', ');
      case 'custom':
        return cleanDocletValue(doclets.type || name);
      default:
        return name;
    }
  }
});



export default PropTable;
