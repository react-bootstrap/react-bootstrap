class CustomAnchor extends React.Component {
  render() {
    return (
      <a {...this.props}
        className='custom-anchor-class'
        style={{color: 'red'}}
        download='filename.ogg'
        type='audio/vorbis'
        rel='nofollow' />
    );
  }
}

const MenuItems = (
  <div className="clearfix">
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem
        anchorComponentClass={CustomAnchor}
        href='/song.ogg'
        title='title for menu item'
        className='menu-item-class'>
        my custom link
      </MenuItem>
    </ul>
  </div>
);

React.render(MenuItems, mountNode);
