import clsx from 'clsx';
import { useBootstrapPrefix } from './ThemeProvider.js';
import type { ColProps } from './Col.js';
import useCol from './useCol.js';
import type { Variant } from './types.js';

export type PlaceholderAnimation = 'glow' | 'wave';
export type PlaceholderSize = 'xs' | 'sm' | 'lg';

export interface UsePlaceholderProps extends Omit<ColProps, 'as'> {
  /**
   * Changes the animation of the placeholder.
   */
  animation?: PlaceholderAnimation | undefined;

  /**
   * Change the background color of the placeholder.
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  bg?: Variant | undefined;

  /**
   * Component size variations.
   */
  size?: PlaceholderSize | undefined;
}

export default function usePlaceholder({
  animation,
  bg,
  bsPrefix,
  size,
  ...props
}: UsePlaceholderProps) {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'placeholder');
  const [{ className, ...colProps }] = useCol(props);

  return {
    ...colProps,
    className: clsx(
      className,
      animation ? `${bsPrefix}-${animation}` : bsPrefix,
      size && `${bsPrefix}-${size}`,
      bg && `bg-${bg}`,
    ),
  };
}
