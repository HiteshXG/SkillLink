import React from 'react'
import './loader.scss'

const Loader = ({ text = "loading" }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span className="loader-text">{text}</span>
        <span className="load"></span>
      </div>
    </div>
  )
}

export default Loader