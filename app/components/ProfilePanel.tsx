"use client";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type ProfileData = {
  name: string;
  linkedin: string;
  github: string;
  portfolio: string;
};

type ProfilePanelProps = {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  profile: ProfileData;
};
  
export default function ProfilePanel({ editMode, setEditMode, profile }: ProfilePanelProps) {
  const linkedinValue = profile.linkedin ? profile.linkedin : "LinkedIn";
  const githubValue = profile.github ? profile.github : "GitHub";
  const portfolioValue = profile.portfolio ? profile.portfolio : "Portfolio";
  const nameValue = profile.name ? profile.name : "Name";

  const handleCopy = async (value: string) => {
    if (!value || value === "Name" || value === "Links") {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // no-op: clipboard may be unavailable (http, permissions)
    }
  };

  return (
    <div className="p-3 p-md-4 h-100 fitcheck-sidebar">
      <Card className="h-100 border-0 shadow-sm rounded-4 bg-white bg-opacity-75">
        <Card.Body>
          <Card.Title className="fs-6 fw-semibold mb-1">Saved Profile Information</Card.Title>
          <Card.Text className="text-muted small mb-3">
            Quick inputs used for tailoring.
          </Card.Text>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-2"
                aria-label="Copy name"
                title="Copy name"
                onClick={() => handleCopy(nameValue)}
              >
                <i className="bi bi-clipboard" aria-hidden="true" />
              </Button>
              <div className="text-muted small justify-content-start">{nameValue}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-2"
                aria-label="Copy LinkedIn"
                title="Copy LinkedIn"
                onClick={() => handleCopy(linkedinValue)}
              >
                <i className="bi bi-clipboard" aria-hidden="true" />
              </Button>
              <div className="text-muted small justify-content-start">{linkedinValue}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-2"
                aria-label="Copy GitHub"
                title="Copy GitHub"
                onClick={() => handleCopy(githubValue)}
              >
                <i className="bi bi-clipboard" aria-hidden="true" />
              </Button>
              <div className="text-muted small justify-content-start">{githubValue}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-2"
                aria-label="Copy portfolio"
                title="Copy portfolio"
                onClick={() => handleCopy(portfolioValue)}
              >
                <i className="bi bi-clipboard" aria-hidden="true" />
              </Button>
              <div className="text-muted small justify-content-start">{portfolioValue}</div>
            </div>
          </div>

          <div className="mt-3">
            <Button variant="outline-dark" className="w-100 rounded-3" onClick={() => editMode ? setEditMode(false) : setEditMode(true)}>
              Edit profile
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
