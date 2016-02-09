import React from 'react';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import Waypoint from 'react-waypoint';

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

// order matters
/* eslint-disable indent */
const sections = {
  buttons: '#buttons',
    btnGroups: '#btn-groups',
    dropdowns: '#btn-dropdowns',
    menuitems: '#menu-items',
  overlays: '#overlays',
    modals: '#modals',
    tooltips: '#tooltips',
    popovers: '#popovers',
    customOverlays: '#custom-overlays',
  navigation: '#navigation',
    navs: '#navs',
    navbars: '#navbars',
    crumbs: '#breadcrumbs',
    tabs: '#tabs',
    pagination: '#pagination',
    pager: '#pager',
  layout: '#page-layout',
    grid: '#grid',
    jumbotron: '#jumbotron',
    pageHeader: '#page-header',
    listGroup: '#listgroup',
    tables: '#tables',
    panels: '#panels',
    wells: '#wells',
  forms: '#forms',
  media: '#media-content',
    images: '#images',
    thumbnails: '#thumbnail',
    embed: '#responsive-embed',
    carousels: '#carousels',
  misc: '#misc',
    icons: '#glyphicons',
    labels: '#labels',
    badges: '#badges',
    alerts: '#alerts',
    progress: '#progress',
  utilities: '#utilities',
    transitions: '#transitions',
  missing: '#missing',
    affix: '#affix',
    scrollspy: '#scrollspy'
};
/* eslint-enable indent */

let ScrollSpy = ({ href, onBefore, onAfter }) => (
  <Waypoint
    onEnter={(e, dir) => dir === 'above' && onBefore(href)}
    onLeave={(e, dir) => dir === 'above' && onAfter(href)}
    threshold={-0.02}
  />
);

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
  },

  componentDidMount() {
    this.afterSections = {};
    Object.keys(sections).forEach(
      key => this.afterSections[sections[key]] = false
    );

    const { hash } = window.location;
    if (this.afterSections[hash] !== undefined) {
      for (const href of Object.keys(this.afterSections)) {
        this.afterSections[href] = true;

        if (href === hash) {
          this.setActiveNavItem();
          break;
        }
      }
    }
  },

  setActiveNavItem() {
    let activeNavItemHref = null;

    for (const href of Object.keys(this.afterSections)) {
      if (!this.afterSections[href]) {
        this.setState({ activeNavItemHref });
        return;
      }

      activeNavItemHref = href;
    }
  },

  renderScrollSpy(href) {
    return (
      <ScrollSpy
        href={href}
        onBefore={this.onBefore}
        onAfter={this.onAfter}
      />
    );
  },

  onBefore(href) {
    this.afterSections[href] = false;
    this.updateActiveHref();
  },

  onAfter(href) {
    this.afterSections[href] = true;
    this.updateActiveHref();
  },

  updateActiveHref() {
    if (this.updateActiveHrefHandle != null) {
      return;
    }

    this.updateActiveHrefHandle = setTimeout(() => {
      this.updateActiveHrefHandle = null;
      this.setActiveNavItem();
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
                {this.renderScrollSpy(sections.buttons)}
                <ButtonSection />
                {this.renderScrollSpy(sections.btnGroups)}
                <ButtonGroupSection />
                {this.renderScrollSpy(sections.dropdowns)}
                <DropdownSection />
                {this.renderScrollSpy(sections.menuitems)}
                <MenuItemSection />

                {this.renderScrollSpy(sections.overlays)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="overlays">Overlays</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap offers a number of accessible overlay components built using <a href="http://react-bootstrap.github.io/react-overlays/examples/">react-overlays</a>.</p>
                </div>

                {this.renderScrollSpy(sections.modals)}
                <ModalSection />
                {this.renderScrollSpy(sections.tooltips)}
                <TooltipSection />
                {this.renderScrollSpy(sections.popovers)}
                <PopoverSection />
                {this.renderScrollSpy(sections.customOverlays)}
                <OverlaySection />

                {this.renderScrollSpy(sections.navigation)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="navigation">Navigation</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap offers a variety of responsive, accessible components for setting up navigation both across your website and within your pages.</p>
                </div>

                {this.renderScrollSpy(sections.navs)}
                <NavSection />
                {this.renderScrollSpy(sections.navbars)}
                <NavbarSection />
                {this.renderScrollSpy(sections.crumbs)}
                <BreadcrumbSection />
                {this.renderScrollSpy(sections.tabs)}
                <TabsSection />
                {this.renderScrollSpy(sections.pagination)}
                <PaginationSection />
                {this.renderScrollSpy(sections.pager)}
                <PagerSection />

                {this.renderScrollSpy(sections.layout)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="page-layout">Page layout</Anchor>
                  </h1>

                  <p className="lead">The components in this section offer different ways to structure and present data on your page.</p>
                </div>

                {this.renderScrollSpy(sections.grid)}
                <GridSection />
                {this.renderScrollSpy(sections.jumbotron)}
                <JumbotronSection />
                {this.renderScrollSpy(sections.pageHeader)}
                <PageHeaderSection />
                {this.renderScrollSpy(sections.listGroup)}
                <ListGroupSection />
                {this.renderScrollSpy(sections.tables)}
                <TableSection />
                {this.renderScrollSpy(sections.panels)}
                <PanelSection />
                {this.renderScrollSpy(sections.wells)}
                <WellSection />

                {this.renderScrollSpy(sections.forms)}
                <FormSection />

                {this.renderScrollSpy(sections.media)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="media-content">Media content</Anchor>
                  </h1>

                  <p className="lead">The React-Bootstrap media content components offer ways to present images and other media to your users in a responsive way, along with support for styling those components.</p>
                </div>

                {this.renderScrollSpy(sections.images)}
                <ImageSection />
                {this.renderScrollSpy(sections.thumbnails)}
                <ThumbnailSection />
                {this.renderScrollSpy(sections.embed)}
                <ResponsiveEmbedSection />
                {this.renderScrollSpy(sections.carousels)}
                <CarouselSection />

                {this.renderScrollSpy(sections.misc)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="misc">Miscellaneous components</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap also offers various standalone components that can be used to present specific, relevant kinds of information across your pages.</p>
                </div>

                {this.renderScrollSpy(sections.icons)}
                <GlyphiconSection />
                {this.renderScrollSpy(sections.labels)}
                <LabelSection />
                {this.renderScrollSpy(sections.badges)}
                <BadgeSection />
                {this.renderScrollSpy(sections.alerts)}
                <AlertsSection />
                {this.renderScrollSpy(sections.progress)}
                <ProgressBarSection />


                {this.renderScrollSpy(sections.utilities)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="utilities">Utilities</Anchor>
                  </h1>

                  <p className="lead">React-Bootstrap also exposes certain utility components used internally. They can be used to enhance your own custom components as well.</p>
                </div>

                {this.renderScrollSpy(sections.transitions)}
                <TransitionSection />

                {this.renderScrollSpy(sections.missing)}
                <div className="bs-docs-section">
                  <h1 className="page-header">
                    <Anchor id="missing">Missing components</Anchor>
                  </h1>

                  <p className="lead">We've intentionally omitted a few components from React-Bootstrap. Don't worry, though &ndash; we cover what to do in this section.</p>
                </div>

                {this.renderScrollSpy(sections.affix)}
                <div className="bs-docs-section">
                  <h2 className="page-header">
                    <Anchor id="affix">Affix</Anchor>
                  </h2>

                  <p>Use <a href="http://react-bootstrap.github.io/react-overlays/examples/#affixes"><code>{'<AutoAffix>'}</code> or <code>{'<Affix>'}</code> from react-overlays</a>.</p>
                  <p>There isn't really any additional Bootstrap markup associated with affixes, so we didn't add a Bootstrap-specific affix class. The upstream ones already give you everything you need.</p>
                </div>

                {this.renderScrollSpy(sections.scrollspy)}
                <div className="bs-docs-section">
                  <h2 className="page-header">
                    <Anchor id="scrollspy">Scrollspy</Anchor>
                  </h2>

                  <p>Setting up a scrollspy in idiomatic React requires wiring up a number of components across your entire page, both to handle elements scrolling in and to wire that up to the navigation. It's a poor fit for a component library, because it's not a standalone component.</p>
                  <p>
                    To implement this functionality, use a library
                    like <a href="http://brigade.github.io/react-waypoint/">React Waypoint</a> along with a bit of your own state management.
                    You can check out how we implemented it on the side panel here by reading the <a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/docs/src/ComponentsPage.js">docs source</a>.
                  </p>
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
                      <SubNav href={sections.buttons} text="Buttons">
                        <NavItem href={sections.btnGroups}>Button groups</NavItem>
                        <NavItem href={sections.dropdowns}>Dropdowns</NavItem>
                        <NavItem href={sections.menuitems}>Menu items</NavItem>
                      </SubNav>

                      <SubNav href={sections.overlays} text="Overlays">
                        <NavItem href={sections.modals}>Modals</NavItem>
                        <NavItem href={sections.tooltips}>Tooltips</NavItem>
                        <NavItem href={sections.popovers}>Popovers</NavItem>
                        <NavItem href={sections.customOverlays}>Custom overlays</NavItem>
                      </SubNav>

                      <SubNav href={sections.navigation} text="Navigation">
                        <NavItem href={sections.navs}>Navs</NavItem>
                        <NavItem href={sections.navbars}>Navbars</NavItem>
                        <NavItem href={sections.crumbs}>Breadcrumbs</NavItem>
                        <NavItem href={sections.tabs}>Tabs</NavItem>
                        <NavItem href={sections.pagination}>Pagination</NavItem>
                        <NavItem href={sections.pager}>Pager</NavItem>
                      </SubNav>

                      <SubNav href={sections.layout} text="Page layout">
                        <NavItem href={sections.grid}>Grid system</NavItem>
                        <NavItem href={sections.jumbotron}>Jumbotron</NavItem>
                        <NavItem href={sections.pageHeader}>Page header</NavItem>
                        <NavItem href={sections.listGroup}>List group</NavItem>
                        <NavItem href={sections.tables}>Tables</NavItem>
                        <NavItem href={sections.panels}>Panels</NavItem>
                        <NavItem href={sections.wells}>Wells</NavItem>
                      </SubNav>

                      <NavItem href={sections.forms}>Forms</NavItem>

                      <SubNav href={sections.media} text="Media content">
                        <NavItem href={sections.images}>Images</NavItem>
                        <NavItem href={sections.thumbnails}>Thumbnails</NavItem>
                        <NavItem href={sections.embed}>Responsive embed</NavItem>
                        <NavItem href={sections.carousels}>Carousels</NavItem>
                      </SubNav>

                      <SubNav href={sections.misc} text="Miscellaneous">
                        <NavItem href={sections.icons}>Glyphicons</NavItem>
                        <NavItem href={sections.labels}>Labels</NavItem>
                        <NavItem href={sections.badges}>Badges</NavItem>
                        <NavItem href={sections.alerts}>Alerts</NavItem>
                        <NavItem href={sections.progress}>Progress bars</NavItem>
                      </SubNav>

                      <SubNav href={sections.utilities} text="Utilities">
                        <NavItem href={sections.transitions}>Transitions</NavItem>
                      </SubNav>

                      <SubNav href={sections.missing} text="Missing components">
                        <NavItem href={sections.affix}>Affix</NavItem>
                        <NavItem href={sections.scrollspy}>Scrollspy</NavItem>
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
