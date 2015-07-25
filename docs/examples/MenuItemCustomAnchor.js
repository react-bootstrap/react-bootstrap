const MenuItems = (
  <div className="clearfix">
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem customAnchor
        href='/song.ogg'
        title='title for menu item'
        className='menu-item-class'>
        <a
          className='custom-anchor-class'
          style={{color: 'red'}}
          download='filename.ogg'
          type='audio/vorbis'
          rel='nofollow'>
          My custom link
        </a>
      </MenuItem>
    </ul>
  </div>
);

React.render(MenuItems, mountNode);
