const styleMaps = {
  CLASSES: {
    'alert': 'alert',
    'button': 'btn',
    'button-group': 'btn-group',
    'button-toolbar': 'btn-toolbar',
    'column': 'col',
    'input-group': 'input-group',
    'form': 'form',
    'glyphicon': 'glyphicon',
    'label': 'label',
    'thumbnail': 'thumbnail',
    'list-group-item': 'list-group-item',
    'panel': 'panel',
    'panel-group': 'panel-group',
    'pagination': 'pagination',
    'progress-bar': 'progress-bar',
    'nav': 'nav',
    'navbar': 'navbar',
    'modal': 'modal',
    'row': 'row',
    'well': 'well'
  },
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
