import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf } from "../services/interview.api";
import { useContext, useCallback } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      if (response?.interviewReport) {
        setReport(response.interviewReport);
        await getReports();
        return response.interviewReport;
      }
      return null;
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  const getReportById = useCallback(async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      if (response?.interviewReport) {
        setReport(response.interviewReport);
        return response.interviewReport;
      }
      return null;
    } catch (error) {
      console.error("Error fetching report:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReport]);

  const getReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      if (response?.interviewReports) {
        setReports(response.interviewReports);
        return response.interviewReports;
      }
      return [];
    } catch (error) {
      console.error("Error fetching reports:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  const getResumePdf = async (interviewReportId) => {
    setLoading(true)
    let response = null
    try {
      response = await generateResumePdf({ interviewReportId })
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf"}))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `resume_${interviewReportId}.pdf`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { 
    loading, 
    report, 
    reports, 
    generateReport, 
    getReportById, 
    getReports,
    getResumePdf
  };
};