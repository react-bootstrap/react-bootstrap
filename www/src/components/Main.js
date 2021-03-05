import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { css } from 'astroturf';
import SideNav from './SideNav';
import Toc, { TocProvider } from './Toc';

const styles = css`
  @import '../css/theme.scss';

  .nav {
    position: sticky;
    top: 4rem;
    height: calc(100vh - 4rem);
    background-color: #f7f7f7;
  }

  .main {
    order: 1;
    padding: 2rem 4rem;

    @include media-breakpoint-down(sm) {
      padding: 1rem 0.83rem;
    }

    & > h2:not(:first-child) {
      margin-top: 3rem;
    }

    > h3 {
      margin-top: 1.5rem;
    }

    > ul li,
    > ol li {
      margin-bottom: 0.25rem;
    }

    > table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 1rem;

      @include media-breakpoint-down(sm) {
        display: block;
        overflow-x: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
      }
    }

    @include media-breakpoint-up(lg) {
      > ul,
      > ol,
      > p {
        max-width: 80%;
      }
    }
  }
`;

const propTypes = {
  location: PropTypes.object.isRequired,
};

function Main({ children, ...props }) {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap">
        <TocProvider>
          <Col as={SideNav} xs={12} md={3} xl={2} location={props.location} />
          <Col as={Toc} className="d-none d-xl-block" xl={2} />
          <Col
            xs={12}
            md={9}
            xl={8}
            as="main"
            id="rb-docs-content"
            className={styles.main}
          >
            {children}
          </Col>
        </TocProvider>
      </Row>
    </Container>
  );
}

Main.propTypes = propTypes;

export default Main;
