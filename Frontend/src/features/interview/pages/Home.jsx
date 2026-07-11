import React, { useRef, useState, useEffect } from "react";
import "../style/home.scss";
import { RiBriefcase3Line } from "@remixicon/react";
import { RiUser3Line } from "@remixicon/react";
import { RiUploadCloud2Line } from "@remixicon/react";
import { RiHistoryLine } from "@remixicon/react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import Menu from "../../../components/Menu/Menu";
import Loader from "../../../components/Loader/loading1/Loader";
import ReportLoader from "../../../components/Loader/loading2/ReportLoader";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfJobDescription] = useState("");
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await getReports();
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setIsLoadingReports(false);
      }
    };
    fetchReports();
  }, [getReports]);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (data) {
        navigate(`/interview/${data._id}`);
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  };

  if (loading) {
    return <ReportLoader text="Generating..." />;
  }

  return (
    <main className="home">
      <Menu />
      <header className="home-header">
        <h1>
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <small>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </small>
      </header>

      <section className="ipb-card">
        <div className="ipb-grid">
          <div className="ipb-panel">
            <div className="panel-title">
              <span className="icon" aria-hidden="true">
                <RiBriefcase3Line />
              </span>
              <h2>Target Job Description</h2>
              <span className="badge badge-required">REQUIRED</span>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              className="ipb-textarea"
              name="jobDescription"
              id="jobDescription"
              placeholder={
                'Paste the full job description here...\n\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'
              }
              value={jobDescription}
            ></textarea>

            <div className="char-count">
              {jobDescription.length} / 5000 chars
            </div>
          </div>

          <div className="ipb-panel">
            <div className="panel-title">
              <span className="icon" aria-hidden="true">
                <RiUser3Line />
              </span>
              <h2>Your Profile</h2>
            </div>

            <div className="inputgroup">
              <div className="inputgroup-label">
                <label htmlFor="resume">Upload Resume</label>
                <span className="badge badge-best">BEST RESULTS</span>
              </div>

              <label className="dropzone" htmlFor="resume">
                <span className="dropzone-icon" aria-hidden="true">
                  <RiUploadCloud2Line />
                </span>
                <span className="dropzone-title">
                  Click to upload or drag &amp; drop
                </span>
                <span className="dropzone-subtitle">PDF or DOCX (Max 5MB)</span>
              </label>
              <input
                ref={resumeInputRef}
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.docx"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="inputgroup">
              <label htmlFor="selfDescription">Quick Self-Description</label>
              <textarea
                onChange={(e) => {
                  setSelfJobDescription(e.target.value);
                }}
                className="ipb-textarea small"
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                value={selfDescription}
              ></textarea>
            </div>

            <div className="info-note">
              <span className="info-icon" aria-hidden="true">
                <RiUploadCloud2Line />
              </span>
              <p>
                Use <strong>Resume</strong> and a{" "}
                <strong>Self Description</strong> together to generate a best
                personalized report.
              </p>
            </div>
          </div>
        </div>

        <div className="ipb-footer">
          <span className="footer-note">
            AI-Powered Strategy Generation · Approx 30s
          </span>
          <button
            className="button primary-button"
            type="button"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            <span className="star" aria-hidden="true">
              ★
            </span>
            {loading ? "Generating..." : "Generate Interview Report"}
          </button>
        </div>
      </section>

      <div className="recent-reports-list">
        <section className="recent-reports">
          <div className="reports-header">
            <span className="reports-icon" aria-hidden="true">
              <RiHistoryLine />
            </span>
            <h2>My Recent Interview Plans</h2>
            <span className="reports-count">{reports?.length || 0} plans</span>
          </div>

          {isLoadingReports ? (
            <div className="reports-loading">
              <div className="spinner-small"></div>
              <p>Loading your recent plans...</p>
            </div>
          ) : reports && reports.length > 0 ? (
            <ul className="reports-list">
              {reports.slice(0, 4).map((report) => (
                <li
                  key={report._id}
                  className="report-item"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || "Untitled Position"}</h3>
                  <p className="report-meta">
                    Generated on{" "}
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  <p
                    className={`match-score ${report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--mid" : "score--low"}`}
                  >
                    Match Score: {report.matchScore || 0}%
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-reports">
              <p>No interview plans yet. Generate your first one above!</p>
            </div>
          )}
        </section>
      </div>

      <footer className="ipb-legal">
        <a href="#privacy">Privacy Policy</a>
        <span className="sep">·</span>
        <a href="#terms">Terms of Service</a>
        <span className="sep">·</span>
        <a href="#help">Help Center</a>
      </footer>
    </main>
  );
};

export default Home;
