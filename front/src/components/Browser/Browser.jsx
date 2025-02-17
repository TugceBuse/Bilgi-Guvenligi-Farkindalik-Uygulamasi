import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./Browser.css";
import { MakeDraggable } from "../../utils/Draggable";
import { useUIContext } from "../../Contexts/UIContext";
import sites from "../../utils/sites";

export const useBrowser = () => {
  const { toggleWindow } = useUIContext();
  return { openHandler: () => toggleWindow("browser"), closeHandler: () => toggleWindow("browser") };
};

const Browser = ({ closeHandler, style }) => {
  const [url, setUrl] = useState("google.com"); // Başlangıçta Google sayfası açılacak
  const [content, setContent] = useState("main");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(["google.com"]);
  const [matchedSites, setMatchedSites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef(currentIndex);
  const browserRef = useRef(null);

  MakeDraggable(browserRef, ".browser-header");

  const loadComponent = (componentName) => lazy(() => import(`../sites/${componentName}.jsx`));

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleGoClick = (newUrl = url, addToHistory = true) => {
    setLoading(true);
    setTimeout(() => {
      const normalizedUrl = newUrl.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?|\/$/g, '');

      if (normalizedUrl.startsWith("google.com/search?q=")) {
        const searchQuery = decodeURIComponent(normalizedUrl.split("search?q=")[1]);
        setMatchedSites(sites.filter(site => site.searchKeys.includes(searchQuery)));
        setContent("search-results");
        setUrl(newUrl);
        if (addToHistory) {
          setHistory([...history.slice(0, currentIndex + 1), newUrl]);
          setCurrentIndex(currentIndex + 1);
        }
        setLoading(false);
        return;
      }

      const matchedSite = sites.find(site => site.url === normalizedUrl);
      if (!matchedSite) {
        setContent("404");
      } else {
        setContent(matchedSite.clickable ? matchedSite.contentComponent : "404");
        setUrl(matchedSite.url);
      }

      if (addToHistory) {
        setHistory([...history.slice(0, currentIndex + 1), newUrl]);
        setCurrentIndex(currentIndex + 1);
      }

      setLoading(false);
    }, 1000);
  };

  const handleGoogleSearch = (searchText) => {
    const searchUrl = `google.com/search?q=${encodeURIComponent(searchText)}`;
    setUrl(searchUrl);
    handleGoClick(searchUrl);
  };

  const handleBackClick = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleForwardClick = () => currentIndex < history.length - 1 && setCurrentIndex(currentIndex + 1);
  const handleKeyDown = (e) => e.key === "Enter" && handleGoClick();

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex && currentIndex >= 0 && currentIndex < history.length) {
      handleGoClick(history[currentIndex], false);
    }
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className="browser-window" style={style} ref={browserRef}>
      <div className="browser-header">
        <h2>Browser</h2>
        <button className="browser-close" onClick={closeHandler}>×</button>
      </div>

      <div className="browser-search">
        <img className="nav-arrow" src="./icons/arrow.png" alt="Back" onClick={handleBackClick} />
        <img className="nav-arrow" src="./icons/right-arrow.png" alt="Forward" onClick={handleForwardClick} />
        <img className="home-icon" src="./icons/home.png" alt="Home" onClick={() => handleGoClick("google.com")} />
        <input className="browser-url-input" type="text" value={url} onChange={handleUrlChange} onKeyDown={handleKeyDown} placeholder="Enter URL" />
        <button className="browser-go-button" onClick={handleGoClick}>Go</button>
      </div>

      <div className="browser-content">
        {loading ? <div className="browser-loading">Yükleniyor...</div> : (
          content === "main" ? (
            <div className="firstPartOfBrowser">
              <h1>Google</h1>
              <div className="searchPart">
                <img src="./icons/search.png" alt="Search Logo" />
                <input type="text" placeholder="Google'da Ara" onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch(e.target.value)} />
                <div className="searchPart_right">
                  <img src="./icons/keyboard.png" alt="Keyboard Logo" />
                  <img src="./icons/google-voice.png" alt="Voice Logo" />
                </div>
              </div>
            </div>
          ) : content === "search-results" ? (
            <div className="download-pages">
              {matchedSites.map((site) => (
                <div key={site.url} className="link-part">
                  <div className="top-of-the-link">
                    <div className="image-div">{site.title.charAt(0)}</div>
                    <div>
                      {site.title}
                      <p>{site.url}</p>
                    </div>
                  </div>
                  <h2 onClick={() => site.clickable && handleGoClick(site.url)} style={{ cursor: "pointer" }}>
                    {site.title} | {site.statement}
                  </h2>
                  <p>{site.statement}</p>
                </div>
              ))}
            </div>
          ) : content === "404" ? (
            <div className="not-found">404 - Sayfa Bulunamadı</div>
          ) : (
            <Suspense fallback={<div>Yükleniyor...</div>}>
              {React.createElement(loadComponent(content))}
            </Suspense>
          )
        )}
      </div>
    </div>
  );
};

export default Browser;
