import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'astroturf';
import pkg from '../../../package.json';

import withLayout from '../withLayout';
import CarbonAds from '../components/CarbonAds';

const MastHead = styled('div')`
  @import '../css/theme';

  composes: mb-4 from global;

  background-color: $dark;
  padding: 0;
  color: white;
  padding-bottom: 0.5rem;
`;

const Content = styled('div')`
  composes: px-4 from global;

  background-image: url('../assets/logo-subtle.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 450px;
  margin: 0 auto;
  max-width: 800px;

  @media (max-width: 800px) {
    padding: 0 40px;
    text-align: center;
  }
`;

const Heading = styled('h1')`
  @import '../css/theme';

  color: $brand;
  font-weight: bold;
  font-size: 3.2rem;
  margin: 2rem 0;
`;

const SubHeading = styled('p')`
  composes: lead from global;

  line-height: 2;
  font-size: 1.6rem;
`;

const BrandButton = styled(Button)`
  @import '../css/theme';

  &:global(.btn-brand) {
    @include button-outline-variant($brand, $dark);
  }
`;

const FeatureCard = styled(Col).attrs({ md: 4 })`
  @import '../css/theme';

  composes: px-4 py-3 from global;
  font-weight: 400;
  line-height: 1.6;

  & h2 {
    font-size: 1.6rem;
    color: $subtle;
    font-weight: 300;
    margin-bottom: 0.6rem;
  }
`;

const ButtonToolbar = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-down(sm) {
    margin: -1rem;

    & > * {
      width: calc(100% - 2rem);
      max-width: 300px;
      margin: 1rem;
    }
  }
`;

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <main id="rb-docs-content">
          <MastHead>
            <Content>
              <Heading>React Bootstrap</Heading>
              <SubHeading>
                The most popular front-end framework
                <br />
                <strong>Rebuilt</strong> for React.
              </SubHeading>
              <ButtonToolbar>
                <BrandButton
                  size="lg"
                  variant="brand"
                  className="me-3 px-5"
                  href="/getting-started/introduction"
                >
                  Get started
                </BrandButton>
                <Button
                  size="lg"
                  href="/components/alerts"
                  className="px-5"
                  variant="outline-light"
                >
                  Components
                </Button>
              </ButtonToolbar>
              <div className="text-muted mt-3">
                Current version: {pkg.version}
              </div>
              <div className="py-3">
                <CarbonAds />
              </div>
            </Content>
          </MastHead>

          <Container>
            <Row>
              <FeatureCard>
                <h2>Rebuilt with React</h2>
                <p>
                  React-Bootstrap replaces the Bootstrap JavaScript. Each
                  component has been built from scratch as a true React
                  component, without unneeded dependencies like jQuery.
                </p>
                <p>
                  As one of the oldest React libraries, React-Bootstrap has
                  evolved and grown alongside React, making it an excellent
                  choice as your UI foundation.
                </p>
              </FeatureCard>

              <FeatureCard>
                <h2>Bootstrap at its core</h2>
                <p>
                  Built with compatibility in mind, we embrace our bootstrap
                  core and strive to be compatible with the world's largest UI
                  ecosystem.
                </p>
                <p>
                  By relying entirely on the Bootstrap stylesheet,
                  React-Bootstrap just works with the thousands of Bootstrap
                  themes you already love.
                </p>
                <p />
              </FeatureCard>

              <FeatureCard>
                <h2>Accessible by default</h2>

                <p>
                  The React component model gives us more control over form and
                  function of each component.
                </p>
                <p>
                  Each component is implemented with accessibility in mind. The
                  result is a set of accessible-by-default components, over what
                  is possible from plain Bootstrap.
                </p>
              </FeatureCard>
            </Row>
          </Container>
        </main>
      );
    }
  },
);
