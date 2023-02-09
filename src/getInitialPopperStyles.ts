export default function getInitialPopperStyles(
  position: React.CSSProperties['position'] = 'absolute',
): Partial<React.CSSProperties> {
  return {
    position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none',
  };
}
