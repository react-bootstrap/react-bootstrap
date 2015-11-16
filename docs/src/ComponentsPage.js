import React from 'react';
import AutoAffix from 'react-overlays/lib/AutoAffix';

import Nav from '../../src/Nav';
import NavItem from '../../src/NavItem';

import Anchor from './Anchor';
import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import SubNav from './SubNav';
import AlertsSection from './sections/AlertsSection';
import BadgeSection from './sections/BadgeSection';
import BreadcrumbSection from './sections/BreadcrumbSection';
import ButtonGroupSection from './sections/ButtonGroupSection';
import ButtonSection from './sections/ButtonSection';
import CarouselSection from './sections/CarouselSection';
import DropdownSection from './sections/DropdownSection';
import FormSection from './sections/FormSection';
import GlyphiconSection from './sections/GlyphiconSection';
import GridSection from './sections/GridSection';
import ImageSection from './sections/ImageSection';
import JumbotronSection from './sections/JumbotronSection';
import LabelSection from './sections/LabelSection';
import ListGroupSection from './sections/ListGroupSection';
import MenuItemSection from './sections/MenuItemSection';
import ModalSection from './sections/ModalSection';
import NavbarSection from './sections/NavbarSection';
import NavSection from './sections/NavSection';
import OverlaySection from './sections/OverlaySection';
import PageHeaderSection from './sections/PageHeaderSection';
import PagerSection from './sections/PagerSection';
import PaginationSection from './sections/PaginationSection';
import PanelSection from './sections/PanelSection';
import PopoverSection from './sections/PopoverSection';
import ProgressBarSection from './sections/ProgressBarSection';
import ResponsiveEmbedSection from './sections/ResponsiveEmbedSection';
import TableSection from './sections/TableSection';
import TabsSection from './sections/TabsSection';
import ThumbnailSection from './sections/ThumbnailSection';
import TooltipSection from './sections/TooltipSection';
import TransitionSection from './sections/TransitionSection';
import WellSection from './sections/WellSection';

const ComponentsPage = React.createClass({
  getInitialState() {
    return {
      activeNavItemHref: null
    };
  },

  getMain() {
    return this.refs.main;
  },

  handleNavItemSelect(key, href) {
    window.location = href;
    this.setActiveNavItem();
  },

  componentDidMount() {
    this.setActiveNavItem();
  },

  setActiveNavItem() {
    this.setState({
      activeNavItemHref: window.location.hash
    });
  },

  render() {
    return (
        <div>
          <NavMain activePage="components" ref="topNav" />

          <PageHeader
            title="Components"
            subTitle="" />

          <div ref="main" className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <ButtonSection />
                <ButtonGroupSection />
                <DropdownSection />
                <MenuItemSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="overlays">Overlays</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap offers a number of accessible overlay components built using <a href="http://react-bootstrap.github.io/react-overlays/examples/">react-overlays</a>.</p>
                </div>

                <ModalSection />
                <TooltipSection />
                <PopoverSection />
                <OverlaySection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="navigation">Navigation</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap offers a variety of responsive, accessible components for setting up navigation both across your website and within your pages.</p>
                </div>

                <NavSection />
                <NavbarSection />
                <BreadcrumbSection />
                <TabsSection />
                <PaginationSection />
                <PagerSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="page-layout">Page layout</Anchor>
                  </h1>

                  <p className="lead">The components in this section offer different ways to structure and present data on your page.</p>
                </div>

                <GridSection />
                <JumbotronSection />
                <PageHeaderSection />
                <ListGroupSection />
                <TableSection />
                <PanelSection />
                <WellSection />

                <FormSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="media-content">Media content</Anchor>
                  </h1>

                  <p className="lead">The React-Bootstrap media content components offer ways to present images and other media to your users in a responsive way, along with support for styling those components.</p>
                </div>

                <ImageSection />
                <ThumbnailSection />
                <ResponsiveEmbedSection />
                <CarouselSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="misc">Miscellaneous components</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap also offers various standalone components that can be used to present specific, relevant kinds of information across your pages.</p>
                </div>

                <GlyphiconSection />
                <LabelSection />
                <BadgeSection />
                <AlertsSection />
                <ProgressBarSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="utilities">Utilities</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap also exposes certain utility components used internally. They can be used to enhance your own custom components as well.</p>
                </div>

                <TransitionSection />

                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="missing">Missing components</Anchor>
                  </h1>

                  <p className="lead">We've intentionally omitted a few components from React-Bootstrap. Don't worry, though &ndash; we cover what to do in this section.</p>
                </div>

                <div className="bs-docs-section">
                  <h2 className="page-header">
                    <Anchor id="affix">Affix</Anchor>
                  </h2>

                  <p>Use <a href="http://react-bootstrap.github.io/react-overlays/examples/#affixes"><code>{'<AutoAffix>'}</code> or <code>{'<Affix>'}</code> from react-overlays</a>.</p>
                  <p>There isn't really any additional Bootstrap markup associated with affixes, so we didn't add a Bootstrap-specific affix class. The upstream ones already give you everything you need.</p>
                </div>

                <div className="bs-docs-section">
                  <h2 className="page-header">
                    <Anchor id="scrollspy">Scrollspy</Anchor>
                  </h2>

                  <p>Setting up a scrollspy in idiomatic React requires wiring up a number of components across your entire page, both to handle elements scrolling in and to wire that up to the navigation. It's a poor fit for a component library, because it's not a standalone component.</p>
                  <p>To implement this functionality, use a library like <a href="http://brigade.github.io/react-waypoint/">React Waypoint</a> along with a bit of your own state management.</p>
                </div>
              </div>


              <div className="col-md-3 bs-docs-sidebar-holder">
                <AutoAffix
                  viewportOffsetTop={20}
                  container={this.getMain}
                >
                  <div
                    className="bs-docs-sidebar hidden-print"
                    role="complementary"
                  >
                    <Nav
                      className="bs-docs-sidenav"
                      activeHref={this.state.activeNavItemHref}
                      onSelect={this.handleNavItemSelect}
                    >
                      <SubNav href="#buttons" text="Buttons">
                        <NavItem href="#btn-groups">Button groups</NavItem>
                        <NavItem href="#btn-dropdowns">Dropdowns</NavItem>
                        <NavItem href="#menu-items">Menu items</NavItem>
                      </SubNav>

                      <SubNav href="#overlays" text="Overlays">
                        <NavItem href="#modals">Modals</NavItem>
                        <NavItem href="#tooltips">Tooltips</NavItem>
                        <NavItem href="#popovers">Popovers</NavItem>
                        <NavItem href="#custom-overlays">Custom overlays</NavItem>
                      </SubNav>

                      <SubNav href="#navigation" text="Navigation">
                        <NavItem href="#navs">Navs</NavItem>
                        <NavItem href="#navbars">Navbars</NavItem>
                        <NavItem href="#breadcrumbs">Breadcrumbs</NavItem>
                        <NavItem href="#tabs">Tabs</NavItem>
                        <NavItem href="#pagination">Pagination</NavItem>
                        <NavItem href="#pager">Pager</NavItem>
                      </SubNav>

                      <SubNav href="#page-layout" text="Page layout">
                        <NavItem href="#grid">Grid system</NavItem>
                        <NavItem href="#jumbotron">Jumbotron</NavItem>
                        <NavItem href="#page-header">Page header</NavItem>
                        <NavItem href="#listgroup">List group</NavItem>
                        <NavItem href="#tables">Tables</NavItem>
                        <NavItem href="#panels">Panels</NavItem>
                        <NavItem href="#wells">Wells</NavItem>
                      </SubNav>

                      <NavItem href="#forms">Forms</NavItem>

                      <SubNav href="#media-content" text="Media content">
                        <NavItem href="#images">Images</NavItem>
                        <NavItem href="#thumbnail">Thumbnails</NavItem>
                        <NavItem href="#responsive-embed">Responsive embed</NavItem>
                        <NavItem href="#carousels">Carousels</NavItem>
                      </SubNav>

                      <SubNav href="#misc" text="Miscellaneous">
                        <NavItem href="#glyphicons">Glyphicons</NavItem>
                        <NavItem href="#labels">Labels</NavItem>
                        <NavItem href="#badges">Badges</NavItem>
                        <NavItem href="#alerts">Alerts</NavItem>
                        <NavItem href="#progress">Progress bars</NavItem>
                      </SubNav>

                      <SubNav href="#utilities" text="Utilities">
                        <NavItem href="#transitions">Transitions</NavItem>
                      </SubNav>

                      <SubNav href="#missing" text="Missing components">
                        <NavItem href="#affix">Affix</NavItem>
                        <NavItem href="#scrollspy">Scrollspy</NavItem>
                      </SubNav>
                    </Nav>

                    <a className="back-to-top" href="#top">
                      Back to top
                    </a>
                  </div>
                </AutoAffix>
              </div>
            </div>
          </div>

          <PageFooter ref="footer" />
        </div>
      );
  }
});

export default ComponentsPage;
