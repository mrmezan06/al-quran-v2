import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-info">
      <Container>
        <Row>
          <Col className="p-2 mt-3 center">
            <p className="font-weight-bold font-italic">
              Copyright © {year - 1} - {year} | All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
