import React from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceNum = searchParams.get('reference');

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} className="text-center">
          <h1>Donation Successful</h1>
          <p>Reference No. {referenceNum}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
