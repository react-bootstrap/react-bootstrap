import * as React from 'react';

export interface ThemeProviderProps {
  prefixes: object;
}

declare class ThemeProvider extends React.Component<ThemeProviderProps> {}

export default ThemeProvider;
