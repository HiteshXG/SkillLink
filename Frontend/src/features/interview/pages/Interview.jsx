import React, { useEffect, useState } from "react";
import "../style/interview.scss";
import { RiAlertLine, RiArrowDropDownLine, RiExpandLeftRightLine, RiChat4Line, RiNavigationLine, RiFileDownloadLine, RiCheckboxLine } from "@remixicon/react";
import { useInterview } from "../hook/useInterview";
import { useParams } from "react-router";
import Menu from "../../../components/Menu/Menu"
import ReportLoader from "../../../components/Loader/loading2/ReportLoader";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [openTechnicalIds, setOpenTechnicalIds] = useState({});
  const [openBehavioralIds, setOpenBehavioralIds] = useState({});
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

  if (loading) {
    return <ReportLoader text="Loading" />;
  }

  if (!report) {
    return (
      <div className="error-container">
        <p>No interview report found. Please generate a report first.</p>
      </div>
    );
  }

  const toggleTechnicalAccordion = (id) => {
    setOpenTechnicalIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleBehavioralAccordion = (id) => {
    setOpenBehavioralIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const matchScore = report.matchScore || 0;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const preparationPlan = report.preparationPlan || [];
  const skillGaps = report.skillGaps || [];

  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "severity-high";
      case "medium":
        return "severity-medium";
      case "low":
        return "severity-low";
      default:
        return "severity-medium";
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return severity || "Medium";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "technical":
        return (
          <div className="questions-container">
            <div className="wrapper">
              <div className="header">
                <h1>Technical Questions</h1>
                <span className="badge">
                  {technicalQuestions.length} questions
                </span>
              </div>

              <div className="accordion-list">
                {technicalQuestions.map((item, index) => {
                  const key = item.id || item._id || `tech-${index}`;
                  const isOpen = !!openTechnicalIds[key];

                  return (
                    <div key={key} className="card">
                      <button
                        className="card-trigger"
                        onClick={() => toggleTechnicalAccordion(key)}
                        aria-expanded={isOpen}
                      >
                        <div className="title-area">
                          <span className="q-num">Q{index + 1}</span>
                          <span className="q-text">
                            {item.question || "No question provided"}
                          </span>
                        </div>
                        <RiArrowDropDownLine
                          className={isOpen ? "rotated" : ""}
                        />
                      </button>

                      {isOpen && (
                        <div className="card-content">
                          <div className="intention">
                            <span className="section-label">
                              <span className="intention-badge">Intention</span>
                            </span>
                            <p className="section-text">
                              {item.intention || "No intention provided"}
                            </p>
                          </div>

                          <div className="model-answer">
                            <span className="section-label">
                              <span className="model-badge">Model Answer</span>
                            </span>
                            <p className="section-text">
                              {item.answer || "No answer provided"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "behavioral":
        return (
          <div className="questions-container">
            <div className="wrapper">
              <div className="header">
                <h1>Behavioral Questions</h1>
                <span className="badge">
                  {behavioralQuestions.length} questions
                </span>
              </div>

              <div className="accordion-list">
                {behavioralQuestions.map((item, index) => {
                  const key = item.id || item._id || `behavioral-${index}`;
                  const isOpen = !!openBehavioralIds[key];

                  return (
                    <div key={key} className="card">
                      <button
                        className="card-trigger"
                        onClick={() => toggleBehavioralAccordion(key)}
                        aria-expanded={isOpen}
                      >
                        <div className="title-area">
                          <span className="q-num">Q{index + 1}</span>
                          <span className="q-text">
                            {item.question || "No question provided"}
                          </span>
                        </div>
                        <RiArrowDropDownLine
                          className={isOpen ? "rotated" : ""}
                        />
                      </button>

                      {isOpen && (
                        <div className="card-content">
                          <div className="intention">
                            <span className="section-label">
                              <span className="intention-badge">Intention</span>
                            </span>
                            <p className="section-text">
                              {item.intention || "No intention provided"}
                            </p>
                          </div>

                          <div className="model-answer">
                            <span className="section-label">
                              <span className="model-badge">Model Answer</span>
                            </span>
                            <p className="section-text">
                              {item.answer || "No answer provided"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "roadmap":
        return (
          <div>
            <div className="header">
              <h1>Preparation Road Map</h1>
              <span className="badge">{preparationPlan.length} - day plan</span>
            </div>
            <div className="timeline-track">
              {preparationPlan.map((item, index) => (
                <div
                  key={item.day || item._id || `day-${index}`}
                  className="timeline-item"
                >
                  <div className="timeline-header">
                    <span className="day-badge">
                      Day {item.day || index + 1}
                    </span>
                    <h3 className="title">
                      {item.focus || "No focus specified"}
                    </h3>
                  </div>

                  <ul className="timeline-list">
                    {(item.tasks || []).map((task, taskIndex) => (
                      <li key={`task-${index}-${taskIndex}`}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="interview">
      <Menu />
      <div className="interview-shell">
        <aside className="interview-nav">
          <div className="nav-top">
            <h2>sections</h2>
            <nav className="nav-list">
              <button
                className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("technical")}
              >
                <RiExpandLeftRightLine /> Technical Questions
              </button>
              <button
                className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("behavioral")}
              >
                <RiChat4Line />
                Behavioral Questions
              </button>
              <button
                className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab("roadmap")}
              >
                <RiNavigationLine />
                Road Map
              </button>
            </nav>
          </div>

          <div className="nav-bottom">
            <div className="nav-divider"></div>
            <button
              type="button"
              onClick={() => {
                getResumePdf(interviewId);
              }}
              className="button primary-button"
            >
              <RiFileDownloadLine />
              Download Resume
            </button>
          </div>
        </aside>

        <section className="interview-content">
          <div className="content-placeholder">{renderContent()}</div>
        </section>

        <aside className="interview-side">
          <div className="side-title">
            <div className="match-score-container">
              <span className="title">Match Score</span>

              <div className="radial-wrapper">
                <svg viewBox="0 0 140 140">
                  <circle
                    className="circle-bg"
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeWidth={strokeWidth}
                  />
                  <circle
                    className="circle-progress"
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset || 0}
                  />
                </svg>

                <div className="score-text">
                  <span className="number">{matchScore}</span>
                  <span className="percent">%</span>
                </div>
              </div>

              <p className="status-message">
                {matchScore >= 70
                  ? "Strong match for this role"
                  : matchScore >= 50
                    ? "Moderate match for this role"
                    : "Needs improvement for this role"}
              </p>
            </div>
          </div>

          <div className="side-title">
            <span className="icon" aria-hidden="true">
              <RiAlertLine />
            </span>
            <h2>Skill Gaps</h2>
          </div>

          <div className="skill-tags">
            {skillGaps.length > 0 ? (
              skillGaps.map((gap, index) => (
                <div
                  key={`skill-${index}`}
                  className={`skill-gap-item ${getSeverityClass(gap.severity)}`}
                >
                  <span className="skill-name">{gap.skill}</span>
                  <span className="skill-severity">
                    {getSeverityLabel(gap.severity)}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-skill-gaps"><RiCheckboxLine /> No skill gaps identified</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;
