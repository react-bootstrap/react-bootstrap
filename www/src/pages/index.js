import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Container from 'react-bootstrap/lib/Container';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import { styled } from 'css-literal-loader/styled';
import pkg from '../../../package.json';

import withLayout from '../withLayout';

const MastHead = styled(Jumbotron)`
  @import '../css/theme';

  background-color: $dark;
  padding: 0;
  color: white;
`;

const Content = styled('div')`
  background-image: url('../assets/logo-subtle.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 450px;
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

const FeatureCard = styled('div')`
  @import '../css/theme';

  composes: px-4 py-3 from global;

  flex: 1 1 0;
  font-weight: 400;
  line-height: 1.6;

  & h2 {
    font-size: 1.6rem;
    color: $subtle;
    font-weight: 300;
    margin-bottom: 1rem;
  }
`;

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <div>
          <main className="bs-docs-masthead" id="content" role="main">
            <MastHead fluid>
              <Content>
                <Heading>React Bootstrap</Heading>
                <SubHeading>
                  The most popular front-end framework
                  <br />
                  <strong>Rebuilt</strong> for React.
                </SubHeading>
                <div>
                  <BrandButton
                    size="lg"
                    variant="brand"
                    className="mr-3 px-5"
                    href="/getting-started"
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
                </div>
                <div className="text-muted mt-3">
                  Current version: {pkg.version}
                </div>
              </Content>
            </MastHead>
          </main>

          <Container className="d-flex justify-content-between">
            <FeatureCard>
              <h2>Rebuilt with React</h2>
              <p>
                React bootstrap replaces the Bootstrap javascript. Each
                component has been built from stratch as true React components,
                without unneeded dependencies like jQuery.
              </p>
              <p>
                As one of the oldest React libraries, react bootstrap has
                evolved and grown alongside React, making it an exellent choice
                as your UI foundation.
              </p>
            </FeatureCard>

            <FeatureCard>
              <h2>Bootstrap at it's core</h2>
              <p>
                Built with compatibility in mind, we embrace our Bootstrap core
                and strive to be compatible with the world's largest UI
                ecosystem.
              </p>
              <p>
                By relying entirely on the Bootstrap stylesheet, React bootstrap
                just works with the thousands of bootstrap themes you already
                love.
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
                Each component is implemented with accessibilty in mind. The
                result is a set of accessible-by-default components, over what
                is possible from plain Bootstrap.
              </p>
            </FeatureCard>
          </Container>
        </div>
      );
    }
  },
);
