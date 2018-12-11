import * as React from 'react';
import { Sizes } from 'react-bootstrap';

declare namespace Thumbnail {
  export interface ThumbnailProps extends React.HTMLProps<Thumbnail> {
    size: string;
    variant?: string;
  }
}
declare class Thumbnail extends React.Component<Thumbnail.ThumbnailProps> {}
export = Thumbnail;
