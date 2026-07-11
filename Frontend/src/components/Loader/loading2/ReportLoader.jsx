import React from 'react'
import './reportLoader.scss'

const ReportLoader = ({ text = "Generating" }) => {
  const letters = text.split('')
  
  return (
    <div className="report-loader-wrapper">
      <div className="loader-container">
        <div className="report-loader">
          {letters.map((letter, index) => (
            <span key={index} className="loader-letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
          <div className="loader-ring"></div>
        </div>
        <p className="loader-subtitle">Please wait while we process your request...</p>
      </div>
    </div>
  )
}

export default ReportLoader