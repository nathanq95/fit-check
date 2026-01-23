"use client";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function RoleCard() {
  return (
    <div className="h-100 fitcheck-main">
      <Card className="h-100 flex-grow-1 overflow-hidden border-0 shadow-sm rounded-4 bg-white bg-opacity-75">
        <Card.Body className="d-flex flex-column fitcheck-card-body">
          <Card.Title className="fs-6 fw-semibold mb-2">Job description</Card.Title>

          <Form.Control
            type="text"
            placeholder="Paste a job description"
            className="rounded-3"
          />

          <div className="mt-4">
            <div className="fs-6 fw-semibold mb-1">Fit Assessment</div>
            <div className="text-muted small">
              Assess alignment based on your profile and job requirements.
            </div>

            <Button variant="dark" className="mt-3 rounded-3">
              Emphasize these skills
            </Button>
          </div>

          <div className="flex-grow-1" />
        </Card.Body>
      </Card>
    </div>
  );
}
