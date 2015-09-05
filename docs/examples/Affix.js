const AffixInstance = React.createClass({

    render(){
      return (
        <Affix
          className="bs-docs-sidebar hidden-print"
          role="complementary"
          offset={300}
          offsetTop={250}
          offsetBottom={200}>
          <Nav
            className="bs-docs-sidenav"
            activeHref={this.state.activeNavItemHref}
            onSelect={this.handleNavItemSelect}
            ref="sideNav">
            <SubNav href="#buttons" key={1} text="Buttons">
              <NavItem href="#btn-groups" key={2}>Button groups</NavItem>
              <NavItem href="#btn-dropdowns" key={3}>Button dropdowns</NavItem>
              <NavItem href="#menu-item" key={25}>Menu Item</NavItem>
            </SubNav>
            <NavItem href="#panels" key={4}>Panels</NavItem>
            <NavItem href="#modals" key={5}>Modals</NavItem>
            <NavItem href="#tooltips" key={6}>Tooltips</NavItem>
            <NavItem href="#popovers" key={7}>Popovers</NavItem>
            <NavItem href="#overlays" key={27}>Overlays</NavItem>
            <NavItem href="#progress" key={8}>Progress bars</NavItem>
            <NavItem href="#navs" key={9}>Navs</NavItem>
            <NavItem href="#navbars" key={10}>Navbars</NavItem>
            <NavItem href="#tabs" key={11}>Tabs</NavItem>
            <NavItem href="#pager" key={12}>Pager</NavItem>
            <NavItem href="#pagination" key={13}>Pagination</NavItem>
            <NavItem href="#alerts" key={14}>Alerts</NavItem>
            <NavItem href="#carousels" key={15}>Carousels</NavItem>
            <NavItem href="#affix" key={151}>Affix</NavItem>
            <NavItem href="#grids" key={16}>Grids</NavItem>
            <NavItem href="#thumbnail" key={17}>Thumbnail</NavItem>
            <NavItem href="#listgroup" key={18}>List group</NavItem>
            <NavItem href="#labels" key={19}>Labels</NavItem>
            <NavItem href="#badges" key={20}>Badges</NavItem>
            <NavItem href="#jumbotron" key={21}>Jumbotron</NavItem>
            <NavItem href="#page-header" key={22}>Page Header</NavItem>
            <NavItem href="#wells" key={23}>Wells</NavItem>
            <NavItem href="#glyphicons" key={24}>Glyphicons</NavItem>
            <NavItem href="#tables" key={25}>Tables</NavItem>
            <NavItem href="#input" key={26}>Input</NavItem>
            <NavItem href="#utilities" key={28}>Utilities</NavItem>
          </Nav>
          <a className="back-to-top" href="#top">
            Back to top
          </a>
        </Affix>
      )
    },

    getInitialState() {
      return {
        activeNavItemHref: null
      };
    },

    handleNavItemSelect(key, href) {
      this.setState({
        activeNavItemHref: href
      });

      window.location = href;
    }

  }
);

React.render(<AffixInstance/>, mountNode);
