import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'astroturf';
import withProps from 'recompose/withProps';
import pkg from '../../../package.json';

import withLayout from '../withLayout';

const MastHead = styled(Jumbotron)`
  @import '../css/theme';

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

const FeatureCard = withProps({ md: 4 })(
  styled(Col)`
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
  `,
);

const ButtonToolbar = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-down(sm) {
    margin: -1rem;

    & > * {
      width: 100%;
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
          <MastHead fluid>
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
                  className="mr-3 px-5"
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
            </Content>
          </MastHead>

          <Container>
            <Row>
              <FeatureCard>
                <h2>Rebuilt with React</h2>
                <p>
                  React bootstrap replaces the Bootstrap javascript. Each
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
                  By relying entirely on the Bootstrap stylesheet, React
                  bootstrap, just works with the thousands of bootstrap themes
                  you already love.
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
          <Container>
            <h1>react-bootstrap vs. react + bootstrap</h1>
            <p>
              <b>Simplification of components:</b>
              The CSS and details of Bootstrap components are rather
              opinionated. React-bootstrap aims to help simplify the use of
              Bootstrap specifics by abstracting them in components.{' '}
            </p>
            <p>
              For example, below is the same component in bootstrap and
              react-bootstrap
            </p>
            <p>
              <b>Bootstrap Alert component:</b>
              <div>{`<div class="alert alert-dark" role="alert"> `}</div>
              <div>
                {`A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.`}
              </div>
              <div>{`</div>`}</div>
            </p>
            <b>React-bootstrap:</b>
            {`<Alert variant="success">
              This is a success alert with{' '}  
              <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
              </Alert> `}
            <p>
              <b>Declarative versus imperative:</b> Bootstrap uses jQuery, which
              is more imperative and may interfere with the way React uses the
              virtual DOM.
            </p>
            <p>
              <b>DOM rendering: </b> Since Bootstrap uses jQuery and
              Bootstrap-React does not, the way updates are rendered between the
              two will differ. Updates using jQuery is done with direct
              manipulation of the DOM, while React uses updates to the state to
              update the virtual DOM.
            </p>
          </Container>
        </main>
      );
    }
  },
);
