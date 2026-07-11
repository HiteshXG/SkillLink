import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Menu from "../../../components/Menu/Menu"
import { getAllInterviewReports } from "../services/interview.api";
import "../style/interviewPlansList.scss";
import { RiTodoLine, RiErrorWarningLine, RiFileAiLine, RiTimeLine } from "@remixicon/react";
import Loader from "../../../components/Loader/loading1/Loader";

const InterviewPlansList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviewPlans();
  }, []);

  const fetchInterviewPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllInterviewReports();
      setPlans(response.interviewReports || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching interview plans:", err);
      setError("Failed to load interview plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanClick = (planId) => {
    navigate(`/interview/${planId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 60) return "score-medium";
    return "score-low";
  };

  if (loading) {
    return <Loader text="Loading" />;
  }

  return (
    <div className="interview-plans-page">
      <Menu />

      <div className="plans-container">
        <header className="plans-header">
          <h1>
            <RiTodoLine /> My Interview Plans
          </h1>
          <p>View and manage all your generated interview preparation plans</p>
        </header>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your interview plans...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="error-icon"><RiErrorWarningLine /></span>
            <p>{error}</p>
            <button onClick={fetchInterviewPlans} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : plans.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><RiFileAiLine /></div>
            <h2>No Interview Plans Yet</h2>
            <p>
              Generate your first interview plan by going to the home page and
              uploading your resume.
            </p>
            <button onClick={() => navigate("/")} className="generate-btn">
              Generate New Plan
            </button>
          </div>
        ) : (
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="plan-card"
                onClick={() => handlePlanClick(plan._id)}
              >
                <div className="plan-header">
                  <h3>{plan.title || "Interview Plan"}</h3>
                  <span
                    className={`match-score ${getScoreColor(plan.matchScore)}`}
                  >
                    {plan.matchScore || 0}%
                  </span>
                </div>

                <div className="plan-details">
                  {plan.skillGaps && plan.skillGaps.length > 0 && (
                    <div className="skill-gaps">
                      <span className="info-label">Skill Gaps:</span>
                      <div className="skill-tags">
                        {plan.skillGaps.slice(0, 3).map((gap, index) => (
                          <span key={index} className="skill-tag">
                            {gap.skill || gap}
                          </span>
                        ))}
                        {plan.skillGaps.length > 3 && (
                          <span className="skill-tag more">
                            +{plan.skillGaps.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="plan-meta">
                    <span className="created-at">
                      <RiTimeLine />{formatDate(plan.createdAt)}
                    </span>
                    <span className="view-link">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPlansList;
