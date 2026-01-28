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
          <div className="d-flex justify-content-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ maxWidth: 140, width: "100%", height: "auto" }}
            />
          </div>
          <div className="d-flex flex-column">
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="my-3">
                  <Button
                    variant={editMode ? "dark" : "outline-dark"}
                    size="sm"
                    className={`rounded-2 d-flex align-items-center justify-content-center ${editMode ? "active" : ""}`}
                    aria-label="Edit profile"
                    title="Edit profile"
                    onClick={() => editMode ? setEditMode(false) : setEditMode(true)}
                    disabled={editMode}
                  >
                    <i className="bi bi-gear" aria-hidden="true" />
                  </Button>
                </div>
                <div className="my-3">
                  <Card.Title className="fs-6 fw-semibold mb-0">Profile Information</Card.Title>
                </div>
              </div>
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
                  <div className="text-muted small justify-content-start text-truncate">{nameValue}</div>
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
                  <div className="text-muted small justify-content-start text-truncate">{linkedinValue}</div>
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
                  <div className="text-muted small justify-content-start text-truncate">{githubValue}</div>
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
                  <div className="text-muted small justify-content-start text-truncate">{portfolioValue}</div>
                </div>
              </div>
            </div>
            <span className="border-bottom mx-2"></span>
            <div>
                <div className="my-3">
                  <Card.Title className="fs-6 fw-semibold mb-0">Applied Jobs</Card.Title>
                </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
