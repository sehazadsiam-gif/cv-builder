"use client";

import { forwardRef } from "react";
import { CVData, CVType, CV_TYPES, CV_FONT, CV_FONT_SIZE, CV_HEADING_SIZE } from "@/lib/cvTypes";

interface CVPreviewProps {
  type: CVType;
  data: CVData;
}

// ─── MAIN PREVIEW ─────────────────────────────────────────────────────────────
const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ type, data }, ref) => {
  const config = CV_TYPES[type];
  const p = data.personal;
  const hasContent = p.fullName || p.email;

  if (!hasContent) {
    return (
      <div ref={ref} className="bg-white" style={{ minHeight: "297mm", padding: "20mm", fontFamily: CV_FONT }}>
        <div className="flex flex-col items-center justify-center h-64 text-gray-300">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="4" width="32" height="40" rx="2" stroke="#d1d5db" strokeWidth="2" />
            <line x1="14" y1="14" x2="34" y2="14" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="20" x2="34" y2="20" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="26" x2="26" y2="26" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="mt-3 text-sm font-medium text-gray-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Start filling the form to see your CV
          </p>
        </div>
      </div>
    );
  }

  // Base styles shared across all templates
  const base: React.CSSProperties = {
    width: "100%",
    minHeight: "297mm",
    padding: "18mm 20mm",
    fontFamily: CV_FONT,
    fontSize: CV_FONT_SIZE,
    lineHeight: "1.55",
    color: "#1a1a1a",
    background: "white",
  };

  // ── RENDER BASED ON TYPE ──────────────────────────────────────────────────
  return (
    <div ref={ref} style={base}>
      {/* HEADER: common to all */}
      <Header data={data} config={config} type={type} />

      {/* Video CV special notice */}
      {type === "video" && p.videoLink && (
        <InfoBox color={config.accent}>
          📹 Video CV Link: <strong>{p.videoLink}</strong>
          <br /><span style={{ fontSize: "10pt" }}>Duration: 1–2 minutes. This document supplements the video above.</span>
        </InfoBox>
      )}

      {/* Personal Brand (non_traditional) */}
      {type === "non_traditional" && data.personalBrand && (
        <Section title="Personal Mission" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, fontStyle: "italic", color: "#333", lineHeight: "1.7" }}>{data.personalBrand}</p>
        </Section>
      )}

      {/* Summary / Professional Profile */}
      {p.summary && (
        <Section title={type === "academic" ? "Research Profile" : type === "executive" ? "Executive Profile" : "Professional Summary"} color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, color: "#333", lineHeight: "1.65" }}>{p.summary}</p>
        </Section>
      )}

      {/* Research Interests (academic) */}
      {type === "academic" && data.researchInterests && (
        <Section title="Research Interests" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, color: "#333" }}>{data.researchInterests}</p>
        </Section>
      )}

      {/* Transferable Skills (career_change) */}
      {type === "career_change" && data.transferableSkills && (
        <Section title="Transferable Skills" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, color: "#333", whiteSpace: "pre-line" }}>{data.transferableSkills}</p>
        </Section>
      )}

      {/* SKILLS — shown early for functional, combination, technical, career_change */}
      {["functional", "combination", "technical", "career_change", "internship", "entry_level"].includes(type) &&
        data.skills.some(s => s.skills) && (
          <SkillsSection data={data} color={config.color} />
        )}

      {/* EDUCATION — shown early for academic, entry_level, internship, graduate */}
      {["academic", "entry_level", "internship", "graduate"].includes(type) &&
        data.education.some(e => e.institution) && (
          <EducationSection data={data} color={config.color} />
        )}

      {/* EXPERIENCE */}
      {config.sections.includes("experience") && data.experience.some(e => e.company) && (
        <ExperienceSection data={data} color={config.color} type={type} />
      )}

      {/* EDUCATION (for types that show it after experience) */}
      {!["academic", "entry_level", "internship", "graduate"].includes(type) &&
        data.education.some(e => e.institution) && (
          <EducationSection data={data} color={config.color} />
        )}

      {/* SKILLS (for types that show skills after experience) */}
      {!["functional", "combination", "technical", "career_change", "internship", "entry_level"].includes(type) &&
        data.skills.some(s => s.skills) && (
          <SkillsSection data={data} color={config.color} />
        )}

      {/* PROJECTS */}
      {config.sections.includes("projects") && data.projects.some(p => p.name) && (
        <ProjectsSection data={data} color={config.color} />
      )}

      {/* PUBLICATIONS (academic, portfolio, digital) */}
      {config.sections.includes("publications") && data.publications.some(p => p.title) && (
        <Section title="Publications & Research" color={config.color}>
          {data.publications.filter(p => p.title).map((pub) => (
            <div key={pub.id} style={{ marginBottom: "3mm" }}>
              <p style={{ fontSize: CV_FONT_SIZE, color: "#1a1a1a" }}>
                <strong>{pub.title}</strong>{pub.coAuthors ? ` (with ${pub.coAuthors})` : ""}
              </p>
              <p style={{ fontSize: "11pt", color: "#555" }}>
                {[pub.journal, pub.year, pub.doi ? `DOI: ${pub.doi}` : ""].filter(Boolean).join(". ")}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* CONFERENCES (academic) */}
      {config.sections.includes("conferences") && data.conferences.some(c => c.title) && (
        <Section title="Conferences & Presentations" color={config.color}>
          {data.conferences.filter(c => c.title).map((conf) => (
            <div key={conf.id} style={{ marginBottom: "2mm" }}>
              <p style={{ fontSize: CV_FONT_SIZE }}>
                <strong>{conf.title}</strong>
                {conf.event ? ` — ${conf.event}` : ""}
              </p>
              <p style={{ fontSize: "11pt", color: "#666" }}>
                {[conf.location, conf.year].filter(Boolean).join(", ")}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* TEACHING EXPERIENCE (academic) */}
      {type === "academic" && data.teachingExperience && (
        <Section title="Teaching Experience" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, whiteSpace: "pre-line", color: "#333" }}>{data.teachingExperience}</p>
        </Section>
      )}

      {/* GRANTS (academic) */}
      {type === "academic" && data.grants && (
        <Section title="Grants & Funding" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, whiteSpace: "pre-line", color: "#333" }}>{data.grants}</p>
        </Section>
      )}

      {/* AWARDS */}
      {config.sections.includes("awards") && data.awards.some(a => a.title) && (
        <Section title="Awards & Honours" color={config.color}>
          {data.awards.filter(a => a.title).map((award) => (
            <EntryBlock key={award.id} title={award.title} subtitle={award.issuer} date={award.year} color={config.color}>
              {award.description && <p style={{ fontSize: "11pt", color: "#555" }}>{award.description}</p>}
            </EntryBlock>
          ))}
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {config.sections.includes("certifications") && data.certifications.some(c => c.name) && (
        <Section title="Certifications" color={config.color}>
          {data.certifications.filter(c => c.name).map((cert) => (
            <EntryBlock key={cert.id} title={cert.name} subtitle={cert.issuer} date={cert.year} color={config.color}>
              {cert.credentialId && <p style={{ fontSize: "11pt", color: "#666" }}>Credential ID: {cert.credentialId}</p>}
            </EntryBlock>
          ))}
        </Section>
      )}

      {/* LANGUAGES — structured (europass, international) */}
      {["europass", "international", "academic"].includes(type) && data.languages.some(l => l.language) && (
        <Section title="Languages" color={config.color}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: CV_FONT_SIZE }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", paddingBottom: "2mm", color: config.color, fontWeight: 700, borderBottom: `1px solid ${config.color}30` }}>Language</th>
                <th style={{ textAlign: "left", paddingBottom: "2mm", color: config.color, fontWeight: 700, borderBottom: `1px solid ${config.color}30` }}>Proficiency Level</th>
              </tr>
            </thead>
            <tbody>
              {data.languages.filter(l => l.language).map((lang) => (
                <tr key={lang.id}>
                  <td style={{ padding: "1.5mm 0", color: "#1a1a1a" }}>{lang.language}</td>
                  <td style={{ padding: "1.5mm 0", color: "#555" }}>{lang.level || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {/* LANGUAGES — text (other types) */}
      {!["europass", "international", "academic"].includes(type) && data.languagesText && (
        <Section title="Languages" color={config.color}>
          <p style={{ fontSize: CV_FONT_SIZE, color: "#333" }}>{data.languagesText}</p>
        </Section>
      )}

      {/* GITHUB / PORTFOLIO */}
      {(data.github || data.portfolio) && (
        <Section title={data.github ? "GitHub & Open Source" : "Portfolio"} color={config.color}>
          {data.github && <p style={{ fontSize: CV_FONT_SIZE }}><strong>GitHub:</strong> {data.github}</p>}
          {data.portfolio && <p style={{ fontSize: CV_FONT_SIZE }}><strong>Portfolio:</strong> {data.portfolio}</p>}
        </Section>
      )}

      {/* REFERENCES */}
      {config.sections.includes("references") && data.references && (
        <Section title="References" color={config.color}>
          <div style={{ whiteSpace: "pre-line", fontSize: CV_FONT_SIZE, color: "#333" }}>{data.references}</div>
        </Section>
      )}
    </div>
  );
});

CVPreview.displayName = "CVPreview";
export default CVPreview;

// ─── SHARED SUB-COMPONENTS ────────────────────────────────────────────────────

function Header({ data, config, type }: { data: CVData; config: (typeof CV_TYPES)[CVType]; type: CVType }) {
  const p = data.personal;
  const contactParts = [
    p.email, p.phone, p.location,
    p.linkedin, p.website,
    type === "technical" && data.github ? data.github : "",
    type === "federal" && p.nationality ? `Nationality: ${p.nationality}` : "",
  ].filter(Boolean);

  return (
    <header style={{ marginBottom: "6mm", borderBottom: `2px solid ${config.color}`, paddingBottom: "4mm" }}>
      <h1 style={{
        fontFamily: CV_FONT,
        fontSize: "18pt",
        fontWeight: 700,
        color: config.color,
        marginBottom: "2mm",
        lineHeight: 1.2,
        letterSpacing: "0.02em",
      }}>
        {p.fullName || "Your Name"}
      </h1>

      {/* Federal CV: salary + hours */}
      {type === "federal" && (p.salary || p.hoursPerWeek) && (
        <p style={{ fontSize: "11pt", color: "#555", marginBottom: "1mm" }}>
          {p.salary && `Salary Expectation: ${p.salary}`}
          {p.salary && p.hoursPerWeek && " · "}
          {p.hoursPerWeek && `Hours/Week: ${p.hoursPerWeek}`}
        </p>
      )}

      <div style={{
        fontSize: "11pt",
        color: "#555",
        fontFamily: CV_FONT,
        display: "flex",
        flexWrap: "wrap",
        gap: "0 14px",
        lineHeight: "1.6",
      }}>
        {contactParts.map((part, i) => <span key={i}>{part}</span>)}
      </div>
    </header>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "5mm" }}>
      <h2 style={{
        fontFamily: CV_FONT,
        fontSize: CV_HEADING_SIZE,
        fontWeight: 700,
        color: color,
        borderBottom: `1px solid ${color}40`,
        paddingBottom: "1.5mm",
        marginBottom: "3mm",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function EntryBlock({ title, subtitle, date, color, children }: {
  title: string; subtitle?: string; date?: string; color: string; children?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "3.5mm" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5mm" }}>
        <strong style={{ fontSize: CV_FONT_SIZE, color: "#1a1a1a", fontFamily: CV_FONT }}>{title}</strong>
        {date && (
          <span style={{ fontSize: "11pt", color: "#888", fontFamily: CV_FONT, flexShrink: 0, marginLeft: "8px" }}>{date}</span>
        )}
      </div>
      {subtitle && (
        <p style={{ fontSize: "11pt", color: color, fontFamily: CV_FONT, marginBottom: "1mm", fontWeight: 600 }}>{subtitle}</p>
      )}
      {children}
    </div>
  );
}

function InfoBox({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: `1px solid ${color}40`,
      background: `${color}08`,
      borderRadius: "4px",
      padding: "3mm 4mm",
      marginBottom: "5mm",
      fontSize: CV_FONT_SIZE,
      color: "#333",
    }}>
      {children}
    </div>
  );
}

function SkillsSection({ data, color }: { data: CVData; color: string }) {
  return (
    <Section title="Skills" color={color}>
      {data.skills.filter(s => s.skills).map((sg) => (
        <div key={sg.id} style={{ fontSize: CV_FONT_SIZE, display: "flex", gap: "6px", marginBottom: "2mm" }}>
          {sg.category && (
            <span style={{ fontWeight: 700, color: color, minWidth: "100px", flexShrink: 0 }}>{sg.category}:</span>
          )}
          <span style={{ color: "#333" }}>{sg.skills}</span>
        </div>
      ))}
    </Section>
  );
}

function EducationSection({ data, color }: { data: CVData; color: string }) {
  return (
    <Section title="Education" color={color}>
      {data.education.filter(e => e.institution).map((edu) => (
        <EntryBlock
          key={edu.id}
          title={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
          subtitle={edu.institution}
          date={[edu.startYear, edu.endYear].filter(Boolean).join(" – ")}
          color={color}
        >
          {edu.gpa && <p style={{ fontSize: "11pt", color: "#444" }}>GPA / CGPA: <strong>{edu.gpa}</strong></p>}
          {edu.thesis && <p style={{ fontSize: "11pt", color: "#444" }}>Thesis: <em>{edu.thesis}</em></p>}
          {edu.achievements && <p style={{ fontSize: "11pt", color: "#444" }}>{edu.achievements}</p>}
        </EntryBlock>
      ))}
    </Section>
  );
}

function ExperienceSection({ data, color, type }: { data: CVData; color: string; type: CVType }) {
  const isFederal = type === "federal";
  return (
    <Section title="Work Experience" color={color}>
      {data.experience.filter(e => e.company).map((exp) => (
        <EntryBlock
          key={exp.id}
          title={exp.position}
          subtitle={exp.company}
          date={[exp.startDate, exp.current ? "Present" : exp.endDate].filter(Boolean).join(" – ")}
          color={color}
        >
          {/* Federal CV: salary + hours */}
          {isFederal && (exp.salary || exp.hoursPerWeek) && (
            <p style={{ fontSize: "11pt", color: "#555", marginBottom: "1mm" }}>
              {exp.salary && `Salary: ${exp.salary}`}{exp.salary && exp.hoursPerWeek && " · "}{exp.hoursPerWeek && `Hours/Week: ${exp.hoursPerWeek}`}
            </p>
          )}
          {exp.description && (
            <p style={{ fontSize: CV_FONT_SIZE, color: "#444", marginBottom: "2mm" }}>{exp.description}</p>
          )}
          {exp.achievements && (
            <ul style={{ paddingLeft: "16px", margin: 0 }}>
              {exp.achievements.split("\n").filter(Boolean).map((line, i) => (
                <li key={i} style={{ fontSize: CV_FONT_SIZE, color: "#333", marginBottom: "1mm" }}>{line}</li>
              ))}
            </ul>
          )}
        </EntryBlock>
      ))}
    </Section>
  );
}

function ProjectsSection({ data, color }: { data: CVData; color: string }) {
  return (
    <Section title="Projects" color={color}>
      {data.projects.filter(p => p.name).map((proj) => (
        <EntryBlock key={proj.id} title={proj.name} subtitle={proj.tech} date={proj.year} color={color}>
          {proj.description && <p style={{ fontSize: CV_FONT_SIZE, color: "#444" }}>{proj.description}</p>}
          {proj.link && <p style={{ fontSize: "11pt", color: color }}>{proj.link}</p>}
        </EntryBlock>
      ))}
    </Section>
  );
}
