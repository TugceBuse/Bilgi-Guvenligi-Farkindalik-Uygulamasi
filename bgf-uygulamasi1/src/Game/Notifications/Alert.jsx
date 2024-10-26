import React from 'react';
import './Alert.css';

const Alert = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
        <div className="alert-window">
            <div className="alert-header">
            <h2>Uyarı</h2>
            <button className="alert-close" onClick={handleClose}>×</button>
            </div>
            <div className="alert-content">
            {children}
            </div>
        </div>
  );
};

export default Alert;