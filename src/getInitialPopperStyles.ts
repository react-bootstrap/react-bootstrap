export default function getInitialPopperStyles(
  position: React.CSSProperties['position'] = 'fixed',
): Partial<React.CSSProperties> {
  return {
    position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none',
  };
}
