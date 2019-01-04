import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare interface ImageProps {
  fluid?: boolean;
  rounded?: boolean;
  roundedCircle?: boolean;
  thumbnail?: boolean;
}

declare class Image extends BsPrefixComponent<'img', ImageProps> {}

export default Image;
