import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="d-none d-lg-flex align-items-center justify-content-center bg-light p-5">
      <Container className="text-center">
        <Row className="mb-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Col key={i} xs="4" className="d-flex justify-content-center">
              <div
                className={`rounded bg-primary bg-opacity-25 p-4 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
                style={{ width: "50px", height: "50px" }}
              />
            </Col>
          ))}
        </Row>
        <Card className="shadow-sm">
          <CardBody>
            <h2 className="h4 fw-bold mb-3">{title}</h2>
            <p className="text-muted">{subtitle}</p>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AuthImagePattern;
