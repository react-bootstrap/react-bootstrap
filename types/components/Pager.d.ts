import * as React from 'react';
import { SelectCallback } from './helpers';
import PagerItem = require('./PagerItem');

declare namespace Pager {
  interface PagerProps extends React.HTMLProps<Pager> {
    onSelect?: SelectCallback;
  }
}
declare class Pager extends React.Component<Pager.PagerProps> {
  static Item: typeof PagerItem;
}
export = Pager;
