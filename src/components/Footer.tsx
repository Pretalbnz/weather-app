import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Bar = styled.footer`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #94a3b8;
`;

const Brand = styled.div`
  font-size: 14px;
  a { color: #cbd5e1; text-decoration: none; }
`;

const Links = styled.nav`
  display: inline-flex; gap: 12px;
  a{
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 10px;
    background: #111827; border: 1px solid #2b3445; color: #e5e7eb;
    text-decoration: none; font-size: 14px; transition: filter .15s ease;
  }
  a:hover{ filter: brightness(1.1); }
`;

// Use react-icons directly via React.createElement in JSX to avoid TS2786 issues

type Props = {
  githubUrl: string;
  linkedinUrl: string;
  email: string;
};

export default function Footer({ githubUrl, linkedinUrl, email }: Props) {
  return (
    <Bar aria-label="Site footer">
      <Brand>
        © {new Date().getFullYear()}{" "}
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          weather-app
        </a>
      </Brand>

      <Links aria-label="Social links">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
          {React.createElement(FaGithub as unknown as React.ComponentType<any>, { size: 18 })} <span>GitHub</span>
        </a>
        <a href={`mailto:${email}`} aria-label="Send email">
          {React.createElement(MdEmail as unknown as React.ComponentType<any>, { size: 18 })} <span>Email</span>
        </a>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
          {React.createElement(FaLinkedin as unknown as React.ComponentType<any>, { size: 18 })} <span>LinkedIn</span>
        </a>
      </Links>
    </Bar>
  );
}
