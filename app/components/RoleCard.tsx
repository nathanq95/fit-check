"use client";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

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

type RoleCardProps = {
  profile: ProfileData;
};

export default function RoleCard({ profile }: RoleCardProps) {
  const [roleText, setRoleText] = useState("");
  const [fitResult, setFitResult] = useState<string>("");
  const [fitScore, setFitScore] = useState<number | null>(null);
  const [fitSummary, setFitSummary] = useState<string>("");
  const [fitStrengths, setFitStrengths] = useState<string[]>([]);
  const [fitGaps, setFitGaps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCheckFit = async () => {
    if (!roleText.trim()) {
      setErrorMessage("Paste a role description before checking fit.");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    setFitResult("");
    setFitScore(null);
    setFitSummary("");
    setFitStrengths([]);
    setFitGaps([]);

    try {
      const response = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleText,
          profile: {
            ...profile,
            resumeText: profile.resumeText,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Fit check failed.");
      }

      if (typeof data?.score === "number") {
        setFitScore(Math.max(0, Math.min(100, data.score)));
      }

      if (typeof data?.summary === "string") {
        setFitSummary(data.summary);
      }

      if (Array.isArray(data?.strengths)) {
        setFitStrengths(data.strengths.filter((item: unknown) => typeof item === "string") as string[]);
      }

      if (Array.isArray(data?.gaps)) {
        setFitGaps(data.gaps.filter((item: unknown) => typeof item === "string") as string[]);
      }

      setFitResult(data?.summary ? JSON.stringify(data, null, 2) : (data?.raw || "No response."));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Fit check failed.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#198754";
    if (score >= 60) return "#20c997";
    if (score >= 40) return "#ffc107";
    if (score >= 20) return "#fd7e14";
    return "#dc3545";
  };

  return (
    <div className="h-100 fitcheck-main">
      <Card className="h-100 flex-grow-1 overflow-hidden border-0 shadow-sm rounded-4 bg-white bg-opacity-75">
        <Card.Body className="d-flex flex-column fitcheck-card-body">
          <Card.Title className="fs-6 fw-semibold mb-2 mt-5 mx-5">Role description</Card.Title>
            <div className="text-muted small mx-5">
              Assess alignment based on your profile and job requirements.
            </div>
            <div className="mb-3 d-flex row gap-3 mx-5">
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Paste a role description"
                className="rounded-3"
                value={roleText}
                onChange={(event) => setRoleText(event.target.value)}
              />
            </div>

          <div className="mt-4 mx-5">
            <div className="d-flex flex-row justify-content-start gap-3">
              <Button
                variant="dark"
                className="mt-3 rounded-3"
                disabled={loading || fitScore !== null}
                onClick={handleCheckFit}
              >
                {loading ? "Checking..." : "Check Fit"}
              </Button>
              <Button
                variant="outline-dark"
                className="mt-3 rounded-3"
              >
                Mark as Applied
              </Button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-3 text-danger small">{errorMessage}</div>
          )}
          {fitScore !== null && (
            <div className="mt-3 mx-5 d-flex flex-column">
              <h5 className="align-self-center">Fit Score</h5>
              <div className="w-100 d-flex align-self-center align-items-center gap-3">
                <div
                  aria-label={`Fit score ${fitScore}%`}
                  role="img"
                  style={{
                    width: "100%",
                    height: 14,
                    borderRadius: 999,
                    background: "#e9ecef",
                    overflow: "hidden",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: `${fitScore}%`,
                      height: "100%",
                      background: getScoreColor(fitScore),
                      transition: "width 220ms ease",
                    }}
                  />
                </div>
                <div className="fw-semibold" style={{ color: getScoreColor(fitScore) }}>
                  {fitScore}%
                </div>
                <div className="text-muted small">
                  <span className="text-muted">
                    {fitScore >= 80
                      ? "Strong match"
                      : fitScore >= 60
                      ? "Good match"
                      : fitScore >= 40
                      ? "Possible match"
                      : fitScore >= 20
                      ? "Weak match"
                      : "Poor match"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="m-5">
            {/* {fitResult && (
              <pre className="mt-3 small text-muted bg-light rounded-3 p-3 overflow-auto">
                {fitResult}
              </pre>
            )} */}

            {fitResult && <h5 className="fs-7 fw-semibold mb-4">Fit Assessment</h5>}
            {fitSummary && (
              <div className="mt-3">
                <div className="fw-semibold mb-1">Summary</div>
                <div className="text-muted small">{fitSummary}</div>
              </div>
            )}

            {fitStrengths.length > 0 && (
              <div className="mt-3">
                <div className="fw-semibold mb-1">Strengths</div>
                <ul className="small text-muted mb-0">
                  {fitStrengths.map((item, index) => (
                    <li key={`strength-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {fitGaps.length > 0 && (
              <div className="mt-3">
                <div className="fw-semibold mb-1">Gaps</div>
                <ul className="small text-muted mb-0">
                  {fitGaps.map((item, index) => (
                    <li key={`gap-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex-grow-1" />
        </Card.Body>
      </Card>
    </div>
  );
}
