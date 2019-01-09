import * as React from 'react';

declare namespace ResponsiveEmbed {
  interface ResponsiveEmbedProps
    extends React.HTMLProps<ResponsiveEmbed> {
    a16by9?: boolean;
    a4by3?: boolean;
    bsPrefix?: string;
  }
}
declare class ResponsiveEmbed extends React.Component<
  ResponsiveEmbed.ResponsiveEmbedProps
> {}
export = ResponsiveEmbed;
