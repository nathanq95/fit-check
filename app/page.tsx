"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfilePanel from "./components/ProfilePanel";
import RoleCard from "./components/RoleCard";
import { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";

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

export default function Page() {
  let [editMode, setEditMode] = useState(false);
  let [profile, setProfile] = useState<ProfileData>({
    name: "",
    linkedin: "",
    github: "",
    portfolio: "",
    yoe: "",
    title: "",
    roles: "",
    projects: "",
    resumeName: "",
    resumeType: "",
    resumeData: "",
    resumeText: "",
  });

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSave = () => {
    localStorage.setItem("fitcheck-profile", JSON.stringify(profile));
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("fitcheck-profile");
    if (!storedProfile) {
      return;
    }
    try {
      const parsedProfile = JSON.parse(storedProfile) as Partial<ProfileData>;
      setProfile((prev) => ({ ...prev, ...parsedProfile }));
    } catch {
      // ignore invalid stored profile
    }
  }, []);

  return (
    <Container fluid className="fitcheck-shell px-0">
      <div className="fitcheck-panel">
        <Row className="g-0 h-100">
          <Col xs={12} md={4} lg={3} className="h-100">
            <ProfilePanel editMode={editMode} setEditMode={setEditMode} profile={profile} />
          </Col>
          <Col xs={12} md={8} lg={9} className="h-100 overflow-auto">
            {!editMode && <RoleCard profile={profile} />}
            {editMode && (
              <ProfileCard
                profile={profile}
                onProfileChange={handleProfileChange}
                onSave={handleProfileSave}
                onClose={() => setEditMode(false)}
              />
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
