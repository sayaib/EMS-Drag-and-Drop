import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Status.css";

const Status = () => {
  return (
    <>
      <div className="status">
        <h6>Meter status</h6>
        <Container>
          <Row style={{ textAlign: "center" }}>
            <Col lg={3} md={6}>
              <div>
                <div className="status_card"></div>
                <h6>SRP</h6>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div>
                <div className="status_card"></div>
                <h6>SSP</h6>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div>
                <div className="status_card"></div>
                <h6>OLR</h6>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div>
                <div className="status_card"></div>
                <h6>Tripping</h6>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Status;
