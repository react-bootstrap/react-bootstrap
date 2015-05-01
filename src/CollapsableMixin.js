import assign from './utils/Object.assign';
import deprecationWarning from './utils/deprecationWarning';
import CollapsibleMixin from './CollapsibleMixin';

let link = 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963';

const CollapsableMixin = assign({}, CollapsibleMixin, {
  getCollapsableClassSet(className) {
    deprecationWarning(
      'CollapsableMixin.getCollapsableClassSet()',
      'CollapsibleMixin.getCollapsibleClassSet()',
      link
    );
    return CollapsibleMixin.getCollapsibleClassSet.call(this, className);
  },

  getCollapsibleDOMNode() {
    deprecationWarning(
      'CollapsableMixin.getCollapsableDOMNode()',
      'CollapsibleMixin.getCollapsibleDOMNode()',
      link
    );
    return this.getCollapsableDOMNode();
  },

  getCollapsibleDimensionValue() {
    deprecationWarning(
      'CollapsableMixin.getCollapsableDimensionValue()',
      'CollapsibleMixin.getCollapsibleDimensionValue()',
      link
    );
    return this.getCollapsableDimensionValue();
  },

  componentDidMount() {
    deprecationWarning('CollapsableMixin', 'CollapsibleMixin', link);
  }
});

export default CollapsableMixin;
