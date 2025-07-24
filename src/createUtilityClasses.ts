import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_MIN_BREAKPOINT,
} from './ThemeProvider.js';

export type ResponsiveUtilityValue<T> =
  | T
  | {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      xxl?: T;
    };

export default function createUtilityClassName(
  utilityValues: Record<string, ResponsiveUtilityValue<unknown>>,
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
) {
  const classes: string[] = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        breakpoints.forEach((brkPoint) => {
          const bpValue = utilValue![brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });

  return classes;
}
