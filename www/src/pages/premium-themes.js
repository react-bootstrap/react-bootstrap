import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'astroturf';

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

const FeatureCard = styled(Card)`
  @import '../css/theme';

  composes: border-0 shadow from global;
  margin-bottom: 30px;
`;

const themeProviders = [
  {
    provider: 'Creative Tim',
    website: 'https://www.creative-tim.com/',
    referral: '?ref=https://react-bootstrap.github.io',
    themes: [
      {
        name: 'Light Bootstrap Dashboard React',
        link:
          'https://www.creative-tim.com/product/light-bootstrap-dashboard-react',
        description: 'Free Admin Template for React Bootstrap and Bootstrap 4',
        image:
          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/light-bootstrap-dashboard-react/light-bootstrap-dashboard-react.jpg',
      },
      {
        name: 'Light Bootstrap Dashboard PRO React',
        link:
          'https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react',
        description:
          'Premium Admin Template for React Bootstrap and Bootstrap 4',
        image:
          'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/light-bootstrap-dashboard-pro-react/light-bootstrap-dashboard-pro-react.jpg',
      },
    ],
  },
];

export default withLayout(
  class PremiumThemes extends React.Component {
    render() {
      return (
        <main id="rb-docs-content">
          <MastHead fluid>
            <Content>
              <Heading>React Bootstrap Themes & Templates</Heading>
              <SubHeading>
                A collection of free and premium React templates and themes
                powered by React Bootstrap.
              </SubHeading>
            </Content>
          </MastHead>

          <Container>
            {themeProviders.map((prop, key) => (
              <React.Fragment key={key}>
                <h2>{prop.provider}</h2>
                <p className="lead">
                  Check out some examples that our partners from {prop.provider}{' '}
                  created using the React Bootstrap components library.
                </p>
                <Row>
                  {prop.themes.map((theme, index) => (
                    <Col key={index} md={6} xs={12}>
                      <FeatureCard>
                        <a
                          target="_blank"
                          rel="noreferrer nofollow"
                          href={theme.link + prop.referral}
                        >
                          <Card.Img
                            variant="top"
                            alt={theme.name}
                            src={theme.image}
                          />
                        </a>
                        <Card.Body>
                          <a
                            target="_blank"
                            rel="noreferrer nofollow"
                            href={theme.link + prop.referral}
                          >
                            <Card.Title>{theme.name}</Card.Title>
                          </a>
                          <Card.Subtitle>{theme.description}</Card.Subtitle>
                        </Card.Body>
                      </FeatureCard>
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-2 mb-4">
                  <Button
                    size="lg"
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={prop.website + prop.referral}
                  >
                    See more themes from {prop.provider}
                  </Button>
                </div>
                {themeProviders.length > key + 1 && <hr className="my-5" />}
              </React.Fragment>
            ))}
          </Container>
        </main>
      );
    }
  },
);
