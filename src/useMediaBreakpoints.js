import { useState, useEffect } from 'react';

const defaultBreakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 };

/**
 * React hook for using screen width breakpoints.
 * @param {Object} breakpoints - Set of screen width breakpoints to be used
 * @param {0} [breakpoints.xs] - Lower bound of extra-small screen widths, in pixels
 * @param {number} breakpoints.sm - Lower bound of small screen widths, in pixels
 * @param {number} [breakpoints.md] - Lower bound of medium screen widths, in pixels
 * @param {number} breakpoints.lg - Lower bound of large screen widths, in pixels
 * @param {number} [breakpoints.xs] - Lower bound of extra-large screen widths, in pixels
 * @returns {Object} A full set of breakpoint queries and their boolean values
 */
export default function useMediaBreakpoints(breakpoints = defaultBreakpoints) {
  // Validate breakpoint inputs
  if (breakpoints.sm === undefined)
    throw new TypeError('sm breakpoint is required.');
  if (breakpoints.lg === undefined)
    throw new TypeError('lg breakpoint is required.');

  if (
    (breakpoints.xs !== undefined && typeof breakpoints.xs !== 'number') ||
    typeof breakpoints.sm !== 'number' ||
    (breakpoints.md !== undefined && typeof breakpoints.md !== 'number') ||
    typeof breakpoints.lg !== 'number' ||
    (breakpoints.xl !== undefined && typeof breakpoints.xl !== 'number')
  )
    throw new TypeError('Breakpoints must be numbers.');

  if (!(breakpoints.xs === 0))
    if (breakpoints.sm !== 0)
      throw new RangeError('Smallest breakpoint must be 0.');

  if (breakpoints.xs === 0 && breakpoints.sm <= breakpoints.xs)
    throw new RangeError('sm breakpoint must be larger than xs breakpoint.');
  if (breakpoints.md !== undefined) {
    if (breakpoints.md <= breakpoints.sm)
      throw new RangeError('md breakpoint must be larger than sm breakpoint.');
    if (breakpoints.lg <= breakpoints.md)
      throw new RangeError('lg breakpoint must be larger than md breakpoint.');
  } else if (breakpoints.lg <= breakpoints.sm) {
    throw new RangeError('lg breakpoint must be larger than sm breakpoint.');
  }
  if (breakpoints.xl !== undefined && breakpoints.xl <= breakpoints.lg)
    throw new RangeError('xl breakpoint must be larger than lg breakpoint.');

  // Track window width
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine current breakpoint
  let currentBreakpoint;
  if (breakpoints.xl && windowWidth >= breakpoints.xl) {
    currentBreakpoint = 'xl';
  } else if (windowWidth >= breakpoints.lg) {
    currentBreakpoint = 'lg';
  } else if (breakpoints.md && windowWidth >= breakpoints.md) {
    currentBreakpoint = 'md';
  } else if (windowWidth >= breakpoints.sm) {
    currentBreakpoint = 'sm';
  } else {
    currentBreakpoint = 'xs';
  }

  // Return full set of breakpoint queries
  return {
    ...(breakpoints.xs === 0 && { xs: currentBreakpoint === 'xs' }),
    sm: currentBreakpoint === 'sm',
    ...(breakpoints.md && { md: currentBreakpoint === 'md' }),
    lg: currentBreakpoint === 'lg',
    ...(breakpoints.xl && { xl: currentBreakpoint === 'xl' }),
    only: {
      ...(breakpoints.xs === 0 && { xs: currentBreakpoint === 'xs' }),
      sm: currentBreakpoint === 'sm',
      ...(breakpoints.md && { md: currentBreakpoint === 'md' }),
      lg: currentBreakpoint === 'lg',
      ...(breakpoints.xl && { xl: currentBreakpoint === 'xl' }),
    },
    up: {
      ...(breakpoints.xs === 0 && { xs: true }),
      sm: ['sm', 'md', 'lg', 'xl'].includes(currentBreakpoint),
      ...(breakpoints.md && {
        md: ['md', 'lg', 'xl'].includes(currentBreakpoint),
      }),
      lg: ['lg', 'xl'].includes(currentBreakpoint),
      ...(breakpoints.xl && { xl: ['xl'].includes(currentBreakpoint) }),
    },
    down: {
      ...(breakpoints.xs === 0 && { xs: ['xs'].includes(currentBreakpoint) }),
      sm: ['xs', 'sm'].includes(currentBreakpoint),
      ...(breakpoints.md && {
        md: ['xs', 'sm', 'md'].includes(currentBreakpoint),
      }),
      lg: ['xs', 'sm', 'md', 'lg'].includes(currentBreakpoint),
      ...(breakpoints.xl && { xl: true }),
    },
    between: {
      ...(breakpoints.xs === 0 && {
        xs: {
          sm: ['xs', 'sm'].includes(currentBreakpoint),
          ...(breakpoints.md && {
            md: ['xs', 'sm', 'md'].includes(currentBreakpoint),
          }),
          lg: ['xs', 'sm', 'md', 'lg'].includes(currentBreakpoint),
          ...(breakpoints.xl && { xl: true }),
        },
      }),
      sm: {
        ...(breakpoints.md && { md: ['sm', 'md'].includes(currentBreakpoint) }),
        lg: ['sm', 'md', 'lg'].includes(currentBreakpoint),
        ...(breakpoints.xl && {
          xl: ['sm', 'md', 'lg', 'xl'].includes(currentBreakpoint),
        }),
      },
      ...(breakpoints.md && {
        md: {
          lg: ['md', 'lg'].includes(currentBreakpoint),
          ...(breakpoints.xl && {
            xl: ['md', 'lg', 'xl'].includes(currentBreakpoint),
          }),
        },
      }),
      ...(breakpoints.xl && {
        lg: {
          xl: ['lg', 'xl'].includes(currentBreakpoint),
        },
      }),
    },
  };
}
