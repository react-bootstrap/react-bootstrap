import * as React from 'react';

interface ThemeProviderProps {
  prefixes: object;
}

declare class ThemeProvider extends React.Component<ThemeProviderProps> {}

export default ThemeProvider;
