import PropTypes from 'prop-types';

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

export function responsivePropType(propType: any) {
  return PropTypes.oneOfType([
    propType,
    PropTypes.shape({
      xs: propType,
      sm: propType,
      md: propType,
      lg: propType,
      xl: propType,
      xxl: propType,
    }),
  ]);
}

export const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;

export default function createUtilityClassName(
  utilityValues: Record<string, ResponsiveUtilityValue<unknown>>,
) {
  const classes: string[] = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        DEVICE_SIZES.forEach((brkPoint) => {
          const bpValue = utilValue![brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';
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
