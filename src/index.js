import deprecationWarning from './utils/deprecationWarning';

export Accordion from './Accordion';
export Affix from './Affix';
export AffixMixin from './AffixMixin';
export Alert from './Alert';
export Badge from './Badge';
export BootstrapMixin from './BootstrapMixin';
export Button from './Button';
export ButtonGroup from './ButtonGroup';
export ButtonInput from './ButtonInput';
export ButtonToolbar from './ButtonToolbar';
export Carousel from './Carousel';
export CarouselItem from './CarouselItem';
export Col from './Col';
export CollapsibleMixin from './CollapsibleMixin';
export CollapsibleNav from './CollapsibleNav';

export Dropdown from './Dropdown';
export DropdownButton from './DropdownButton';
export NavDropdown from './NavDropdown';
export SplitButton from './SplitButton';

export FadeMixin from './FadeMixin';
export Glyphicon from './Glyphicon';
export Grid from './Grid';
export Input from './Input';
export Interpolate from './Interpolate';
export Jumbotron from './Jumbotron';
export Label from './Label';
export ListGroup from './ListGroup';
export ListGroupItem from './ListGroupItem';
export MenuItem from './MenuItem';

export Modal from './Modal';
export ModalHeader from './ModalHeader';
export ModalTitle from './ModalTitle';
export ModalBody from './ModalBody';
export ModalFooter from './ModalFooter';

export Nav from './Nav';
export Navbar from './Navbar';
export NavItem from './NavItem';

export Overlay from './Overlay';
export OverlayTrigger from './OverlayTrigger';

export PageHeader from './PageHeader';
export PageItem from './PageItem';
export Pager from './Pager';
export Pagination from './Pagination';
export Panel from './Panel';
export PanelGroup from './PanelGroup';
export Popover from './Popover';
export ProgressBar from './ProgressBar';
export Row from './Row';
export SafeAnchor from './SafeAnchor';
export SplitButton from './SplitButton';
export styleMaps from './styleMaps';
export SubNav from './SubNav';
export Tab from './Tab';
export TabbedArea from './TabbedArea';
export Table from './Table';
export TabPane from './TabPane';
export Tabs from './Tabs';
export Thumbnail from './Thumbnail';
export Tooltip from './Tooltip';
export Well from './Well';

export Portal from './Portal';
export Position from './Position';

export Collapse from './Collapse';
export Fade from './Fade';

export * as FormControls from './FormControls';

import domUtils from './utils/domUtils';
import childrenValueInputValidation from './utils/childrenValueInputValidation';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';
import CustomPropTypes from './utils/CustomPropTypes';

function createDeprecationWrapper(obj, deprecated, instead, link){
  let wrapper = {};

  if (process.env.NODE_ENV === 'production'){
    return obj;
  }

  Object.keys(obj).forEach(key => {
    Object.defineProperty(wrapper, key, {
      get(){
        deprecationWarning(deprecated, instead, link);
        return obj[key];
      },
      set(x){ obj[key] = x; }
    });
  });

  return wrapper;
}

export const utils = {
  childrenValueInputValidation,
  createChainedFunction,
  ValidComponentChildren,
  CustomPropTypes,
  domUtils: createDeprecationWrapper(domUtils, 'utils/domUtils', 'npm install dom-helpers'),
};
