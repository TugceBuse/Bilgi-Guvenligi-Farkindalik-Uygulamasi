import React, { useState, useEffect, useRef, lazy, Suspense} from "react";
import "./Browser.css";
import { MakeDraggable } from "../../utils/Draggable";
import { useUIContext } from "../../Contexts/UIContext";
import sites from "../../utils/sites";

export const useBrowser = () => {
  const { toggleWindow } = useUIContext();
  return { openHandler: () => toggleWindow("browser"), closeHandler: () => toggleWindow("browser") };
};

const CachedComponents = {}; // 📌 Bileşenleri cachelemek için bir obje oluşturduk

const Browser = ({ closeHandler, style }) => {
  const [url, setUrl] = useState("google.com");
  const [currentUrl, setCurrentUrl] = useState("google.com");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(["google.com"]);
  const [matchedSites, setMatchedSites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const browserRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchedText, setSearchedText] = useState("");

  MakeDraggable(browserRef, ".browser-header");

  // 📌 Yükleme fonksiyonu: 1 saniye bekletir, sonra devam eder
  const startLoading = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 📌 1 saniye beklet
    setLoading(false);
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");
  };

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleKeyDown = (e) => e.key === "Enter" && handleGoClick(e.target.value);

  const handleGoogleSearch = async (searchText, addToHistory = true) => {
    if (!searchText || !searchText.trim()) return;
  
    const searchQuery = normalizeText(searchText.trim());  // Normalizasyonu uygula
    const searchUrl = `google.com/search?q=${encodeURIComponent(searchQuery)}`;
  
    setUrl(searchUrl);
    await startLoading();
    setCurrentUrl(searchUrl);

    if (addToHistory) {
      setHistory([...history.slice(0, currentIndex + 1), searchUrl]);
      setCurrentIndex(currentIndex + 1);
    }
  };
  

  const handleGoClick = async (newUrl = url, addToHistory = true) => {
    await startLoading(); 
  
    const normalizedUrl = normalizeText(newUrl.trim().replace(/^(https?:\/\/)?(www\.)?|\/$/g, ''));
  
    if (normalizedUrl.startsWith("google.com/search?q=")) {
      setCurrentUrl(normalizedUrl);
      setUrl(normalizedUrl);
    } else {
      const matchedSite = sites[normalizedUrl] || null;
      setCurrentUrl(matchedSite ? normalizedUrl : "404");
      setUrl(normalizedUrl);
    }
  
    if (addToHistory) {
      setHistory([...history.slice(0, currentIndex + 1), newUrl]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    console.log("History updated:", history);
  }, [history]);

  useEffect(() => {
    if (currentUrl.startsWith("google.com/search?q=")) {
      const searchQuery = normalizeText(decodeURIComponent(currentUrl.split("search?q=")[1]));
  
      const filteredSites = Object.entries(sites).filter(([key, site]) =>
        site.searchKeys &&
        site.searchKeys.some((keyword) => normalizeText(keyword).includes(searchQuery)) // Normalizasyon tüm listeye uygulandı
      );
  
      setMatchedSites(filteredSites);
    }
  }, [currentUrl]);
  

  const handleBackClick = async () => {
    if (currentIndex > 0) {
      await startLoading(); // 1 saniye beklet
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setUrl(history[newIndex]); 
      setCurrentUrl(history[newIndex]); 
    }
  };

  const handleForwardClick = async () => {
    if (currentIndex < history.length - 1) {
      await startLoading(); // 📌 1 saniye beklet
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setUrl(history[newIndex]); 
      setCurrentUrl(history[newIndex]); 
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="browser-loading">
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
    }

    if (currentUrl.startsWith("google.com/search?q=")) {
      const searchedText = decodeURIComponent(currentUrl.split("search?q=")[1]);
      return (
        
        <div className="download-pages">
          <div className='searchPart' style={{width:500, height:40, marginBottom:40}}>
            <img src="./icons/search.png" alt="Search Logo" onClick={() => handleGoogleSearch(searchInputRef.current.value) } />
            <input 
              type="text"
              defaultValue={searchedText}
              placeholder="Google'da Ara"
              ref={searchInputRef}
              onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch(e.target.value)} 
            />

            <div className='searchPart_right'>
              <img src="./icons/keyboard.png" alt="Keyboard Logo"/>
              <img src="./icons/google-voice.png" alt="Voice Logo"/>
            </div>
          </div>

          <div className='searchPart_bottom'>
            <h3 className='tümü'>Tümü</h3>
            <h3>Görseller</h3>
            <h3>Videolar</h3>
            <h3>Yer siteleri</h3>
            <h3>Haberler</h3>
            <h3>Web</h3>
          </div>
          {/* <h2>Arama Sonuçları</h2> */}
          {matchedSites.length > 0 ? (
            matchedSites.map(([key, site]) => {
              return (
                <div key={key} className="link-part"onClick={() => site.clickable && handleGoClick(key)}
                  style={{
                    cursor: site.clickable ? "pointer" : "default",
                    color: site.clickable ? "white" : "gray",
                  }}>
                  <div className="top-of-the-link">
                    <div className={`image-div site-${key.split(".")[0]}`}>
                      {site.title.charAt(0)}
                    </div>
                    <div>
                      <h3>{site.title}</h3>
                      <p>{site.statement}</p>
                    </div>
                  </div>
                  <h2>
                    {site.title} | {site.statement}
                  </h2>
                </div>
              );
            })
          ) : (
            <p>Aradığınız - <strong>{searchedText}</strong> - ile ilgili hiçbir arama sonucu mevcut değil.</p>
          )}

        </div>
      );
    }

    if (currentUrl === "google.com") {
      return (
        <div className="firstPartOfBrowser">
          <h1>Google</h1>
          <div className="searchPart"> 
            <img src="./icons/search.png" alt="Search Logo" onClick={() => handleGoogleSearch(searchInputRef.current.value) } />
            <input 
              type="text" 
              placeholder="Google'da Ara"
              ref={searchInputRef}
              onKeyDown={(e) => e.key === "Enter" && handleGoogleSearch(e.target.value)} 
            />
            <div className="searchPart_right">
              <img src="./icons/keyboard.png" alt="Keyboard Logo" />
              <img src="./icons/google-voice.png" alt="Voice Logo" />
            </div>
          </div>
        </div>
      );
    }
    // 📌 Eğer sitenin tipi "component" ise, ilgili bileşeni yükle
    // 📌 Farklı site tipleri eklenirse buraya kod parçası eklenecek
    const site = sites[currentUrl];
    if (!site) return <div className="not-found">404 - Sayfa Bulunamadı</div>;

    switch (site.type) {
      case "component":
        if (!CachedComponents[site.component]) {
          CachedComponents[site.component] = lazy(() => import(`../sites/${site.component}.jsx`));
        }

        const SiteComponent = CachedComponents[site.component];

        return (
          <Suspense /*fallback={<div className="browser-loading">Yükleniyor...</div>}*/>
            <SiteComponent />
          </Suspense>
        );
      default:
        return <div className="not-found">404 - Sayfa Bulunamadı</div>;
    }
  };

  return (
    <div className="browser-window" style={style} ref={browserRef}>
      <div className="browser-header">
        <h2>Browser</h2>
        <button className="browser-close" onClick={closeHandler}>×</button>
      </div>
      <div className="browser-search">
        <img 
          className="nav-arrow"
          src="./icons/arrow.png" alt="Arrow Logo" 
          onClick={handleBackClick}
        />

        <img 
          className={`nav-arrow ${currentIndex < history.length - 1 ? "" : "disabled"}`}
          src="./icons/right-arrow (1).png" 
          alt="Right Arrow Logo" 
          onClick={currentIndex < history.length - 1 ? handleForwardClick : null}
        />
           
        <img 
        className="home-icon"
        src="./icons/home.png" alt="Home" 
        onClick={() => handleGoClick("google.com")}
        />
        
        <input className="browser-url-input" type="text" value={url} onChange={handleUrlChange} onKeyDown={handleKeyDown} placeholder="Enter URL" />
        <button className="browser-go-button" onClick={() => handleGoClick(url)}>Go</button>
      </div>
     
      <div className="browser-content">{renderContent()}</div>
    </div>
  );
};

export default Browser;
