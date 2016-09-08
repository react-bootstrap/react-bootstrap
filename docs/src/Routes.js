import React from 'react';
import {IndexRoute, Route} from 'react-router';

import ComponentsPage from './ComponentsPage';
import GettingStartedPage from './GettingStartedPage';
import HomePage from './HomePage';
import IntroductionPage from './IntroductionPage';
import NotFoundPage from './NotFoundPage';
import Root from './Root';
import SupportPage from './SupportPage';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePage} />
    <Route path="introduction.html" component={IntroductionPage} />
    <Route path="getting-started.html" component={GettingStartedPage} />
    <Route path="components.html" component={ComponentsPage} />
    <Route path="support.html" component={SupportPage} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
