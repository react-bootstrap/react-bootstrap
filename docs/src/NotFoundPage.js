import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

class NotFoundPage extends React.Component {
  render() {
    return (
        <div>
          <NavMain activePage="" />

          <PageHeader
            title="404"
            subTitle="Hmmm this is awkward." />

          <PageFooter />
        </div>
      );
  }
}

export default NotFoundPage;
