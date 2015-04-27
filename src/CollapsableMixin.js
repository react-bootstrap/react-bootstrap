import assign from './utils/Object.assign';
import deprecationWarning from './utils/deprecationWarning';
import CollapsibleMixin from './CollapsibleMixin';

const CollapsableMixin = assign({}, CollapsibleMixin, {
  getCollapsableClassSet(className) {
    deprecationWarning(
      'CollapsableMixin.getCollapsableClassSet()',
      'CollapsibleMixin.getCollapsibleClassSet()'
    );
    return CollapsibleMixin.getCollapsibleClassSet.call(this, className);
  },

  getCollapsibleDOMNode() {
    deprecationWarning(
      'CollapsableMixin.getCollapsableDOMNode()',
      'CollapsibleMixin.getCollapsibleDOMNode()'
    );
    return this.getCollapsableDOMNode();
  },

  getCollapsibleDimensionValue() {
    deprecationWarning(
      'CollapsableMixin.getCollapsableDimensionValue()',
      'CollapsibleMixin.getCollapsibleDimensionValue()'
    );
    return this.getCollapsableDimensionValue();
  }
});

deprecationWarning('CollapsableMixin', 'CollapsibleMixin');

export default CollapsableMixin;
