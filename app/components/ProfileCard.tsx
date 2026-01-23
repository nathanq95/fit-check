"use client";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import type { ChangeEvent } from "react";

type ProfileData = {
  name: string;
  linkedin: string;
  github: string;
  portfolio: string;
  yoe: string;
  title: string;
  roles: string;
  projects: string;
  resumeName: string;
  resumeType: string;
  resumeData: string;
  resumeText: string;
};

type ProfileCardProps = {
  profile: ProfileData;
  onProfileChange: (field: keyof ProfileData, value: string) => void;
  onSave: () => void;
  onClose: () => void;
};

export default function ProfileCard({ profile, onProfileChange, onSave, onClose }: ProfileCardProps) {
  const handleResumeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onProfileChange("resumeText", event.target.value);
  };

  return (
    <div className="h-100 fitcheck-main">
      <Card className="h-100 flex-grow-1 overflow-hidden border-0 shadow-sm rounded-4 bg-white bg-opacity-75">
        <Card.Body className="d-flex flex-column fitcheck-card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <Button
              variant="outline-dark"
              size="sm"
              className="rounded-2"
              aria-label="Close profile editor"
              title="Close"
              onClick={onClose}
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </Button>
            <Card.Title className="mb-0 fs-6 fw-semibold">Profile</Card.Title>
            <div style={{ width: 32 }} />
          </div>

            <div className="m-5">
                <h5 className="fs-6 fw-semibold mb-4">Core Identity</h5>
                <div className="d-flex w-100 gap-4 flex-wrap">
                    <div className="w-50 mb-3 d-flex flex-row align-items-center gap-3">
                        <Form.Label className="small fw-semibold mb-1">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. John Doe"
                            className=" flex-grow-1 rounded-3 w-100"
                            value={profile.name}
                            onChange={(event) => onProfileChange("name", event.target.value)}
                        />
                    </div>
                    <div className="w-25 mb-3 d-flex flex-row align-items-center gap-3">
                        <Form.Label className="small fw-semibold mb-1">Years of Experience</Form.Label>
                        <Form.Select
                            value={profile.yoe}
                            onChange={(event) => onProfileChange("yoe", event.target.value)}
                        >
                            <option value="">Select YOE</option>
                            <option>0-1 years</option>
                            <option>2-4 years</option>
                            <option>5-7 years</option>
                            <option>8+ years</option>
                        </Form.Select>
                    </div>
                    <div className="w-25 mb-3 d-flex flex-row align-items-center gap-3">
                        <Form.Label className="small fw-semibold mb-1">Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Software Engineer"
                            className=" flex-grow-1 rounded-3 w-25"
                            value={profile.title}
                            onChange={(event) => onProfileChange("title", event.target.value)}
                        />
                    </div>
                    <div className="w-50 mb-3 d-flex flex-row align-items-center gap-3">
                        <Form.Label className="small fw-semibold mb-1">Role(s)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Full-Stack"
                            className=" flex-grow-1 rounded-3 w-50"
                            value={profile.roles}
                            onChange={(event) => onProfileChange("roles", event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="m-5">
                <h5 className="fs-6 fw-semibold mb-4">Experience Highlights</h5>
                <div className="d-flex w-100 gap-4 flex-wrap">
                    <div className="w-100 mb-3 d-flex row gap-3">
                        <Form.Label className="small col-2 fw-semibold mb-1">Resume</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Paste your resume here"
                            className="col w-50 rounded-3"
                            value={profile.resumeText}
                            style={{ resize: "both" }} 
                            onChange={handleResumeChange}
                        />
                    </div>
                    <div className="w-100 mb-3 d-flex row gap-3">
                        <Form.Label className="col-2 small fw-semibold mb-1">Highlights</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className="col w-50 rounded-3"
                            value={profile.projects}
                            style={{ resize: "both" }} 
                            onChange={(event) => onProfileChange("projects", event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="m-5">
                <h5 className="fs-6 fw-semibold mb-4">Social Links</h5>
                    <div className="d-flex w-100 gap-4 flex-wrap">
                        <div className="w-50 mb-3 d-flex flex-row align-items-center gap-3">
                        <Form.Label className="small col-2 fw-semibold mb-1">LinkedIn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. John Doe"
                            className="flex-fill flex-grow-1 rounded-3 w-100"
                            value={profile.linkedin}
                            onChange={(event) => onProfileChange("linkedin", event.target.value)}
                        />
                    </div>
                        <div className="w-50 mb-3 d-flex flex-row align-items-center gap-3">
                            <Form.Label className="small col-2 fw-semibold mb-1">GitHub</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. John Doe"
                                className="flex-fill flex-grow-1 rounded-3 w-100"
                                value={profile.github}
                                onChange={(event) => onProfileChange("github", event.target.value)}
                            />
                        </div>
                        <div className="w-50 mb-3 d-flex flex-row align-items-center gap-3">
                            <Form.Label className="small col-2 fw-semibold mb-1">Portfolio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. John Doe"
                                className="flex-fill flex-grow-1 rounded-3 w-100"
                                value={profile.portfolio}
                                onChange={(event) => onProfileChange("portfolio", event.target.value)}
                            />
                        </div>
                    </div>
            </div>

            <div className="mt-4">

            <Button variant="dark" className="m-5 rounded-3" onClick={onSave}>
                Save
            </Button>
            </div>

            <div className="flex-grow-1" />
        </Card.Body>
      </Card>
    </div>
  );
}
