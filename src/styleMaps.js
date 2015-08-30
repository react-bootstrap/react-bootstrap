const styleMaps = {

  STYLES: [
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'inline',
    'tabs',
    'pills'
  ],
  addStyle(name) {
    styleMaps.STYLES.push(name);
  },
  SIZES: {
    'large': 'lg',
    'medium': 'md',
    'small': 'sm',
    'xsmall': 'xs',
    'lg': 'lg',
    'md': 'md',
    'sm': 'sm',
    'xs': 'xs'
  },
  GRID_COLUMNS: 12
};

export default styleMaps;
