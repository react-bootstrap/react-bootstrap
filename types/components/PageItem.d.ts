import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent } from './helpers';

export interface PageItemProps {
  disabled?: boolean;
  active?: boolean;
  activeLabel?: string;
}

declare class PageItem extends BsPrefixComponent<
  typeof SafeAnchor,
  PageItemProps
> {}

export default PageItem;

export class First extends PageItem {}
export class Prev extends PageItem {}
export class Ellipsis extends PageItem {}
export class Next extends PageItem {}
export class Last extends PageItem {}
