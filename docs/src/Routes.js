import React from 'react';

import Root from './Root';
import HomePage from './HomePage';
import IntroductionPage from './IntroductionPage';
import GettingStartedPage from './GettingStartedPage';
import ComponentsPage from './ComponentsPage';
import SupportPage from './SupportPage';
import NotFoundPage from './NotFoundPage';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name="home" path="/" handler={Root}>
    <DefaultRoute handler={HomePage}/>
    <NotFoundRoute handler={NotFoundPage} />

    <Route name="introduction" path="introduction.html" handler={IntroductionPage} />
    <Route name="getting-started" path="getting-started.html" handler={GettingStartedPage} />
    <Route name="components" path="components.html" handler={ComponentsPage} />
    <Route name="support" path="support.html" handler={SupportPage} />
  </Route>
);
