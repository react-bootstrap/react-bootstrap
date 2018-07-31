import PropTypes from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { css } from 'css-literal-loader/styled';
import SideNav from './SideNav';

const styles = css`
  @import '../css/theme.scss';

  .nav {
    position: sticky;
    top: 4rem;
    height: calc(100vh - 4rem);
    background-color: #f7f7f7;
  }

  .main {
    padding: 2rem 4rem;

    & > h2:not(:first-child) {
      margin-top: 3rem;
    }
  }
`;

const propTypes = {
  location: PropTypes.object.isRequired,
};

function Main({ children, ...props }) {
  return (
    <Container fluid>
      <Row>
        <Col as={SideNav} xs={12} md={3} xl={2} location={props.location} />
        <Col xs={12} md={9} xl={10} className={styles.main}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

Main.propTypes = propTypes;

export default Main;
