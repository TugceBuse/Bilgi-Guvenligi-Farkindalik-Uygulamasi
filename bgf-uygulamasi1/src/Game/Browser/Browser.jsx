import React, { useState } from 'react';
import './Browser.css';

export const useBrowser = () => {
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  const openBrowser = () => {
    setIsBrowserOpen(true);
  };

  const closeBrowser = () => {
    setIsBrowserOpen(false);
  };

  return { isBrowserOpen, openBrowser, closeBrowser };
};


const Browser = ({ closeBrowser }) => {

  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGoClick = () => {
    setLoading(true);
    setTimeout(() => {
    if (url === '192.168.1.1') {
      setContent('Example Content:This is the content for example.com.');
    } else if (url === 'https://another.com') {
      setContent('Another Content:This is the content for another.com.');
    } else {
      setContent('404 Not Found.The requested URL was not found on this server.');
    }
    setLoading(false);
    }, 2000); // 2 saniye gecikme
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGoClick();
    }
  };

  return (
    <div className="browser-window">
      <div className="browser-header">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL"
          className="browser-url-input"
        />
        <button onClick={handleGoClick} className="browser-go-button">Go</button>
        <button className="browser-close" onClick={closeBrowser}>×</button>      
      </div>
      <div className="browser-content">
      {loading ? (
          <div className="browser-loading">
            <div className="lds-default">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
};

export default Browser;