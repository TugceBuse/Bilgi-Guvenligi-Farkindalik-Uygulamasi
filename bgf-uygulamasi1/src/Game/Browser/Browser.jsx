import React, { useState,useEffect, useRef } from 'react';
import './Browser.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';
  
export const useBrowser = () => {
  const { toggleWindow, setActiveWindow } = useGameContext();

  const openBrowser = () => {
    toggleWindow('browser');
  };

  const closeBrowser = () => {
    toggleWindow('browser');
  };

  return { openBrowser, closeBrowser };
};


const Browser = ({ closeBrowser, style }) => {

  const [url, setUrl] = useState('https://www.google.com/');
  const [content, setContent] = useState('main');
  const [loading, setLoading] = useState(false);
  //Dosya indirme Senaryosu için kullanılacak
  const [downloadMessage, setDownloadMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  //192.168.1.1 sayfasi login
  const [loginusername, setLoginusername] = useState('');
  const [loginpassword, setLoginpassword] = useState('');

  const browserRef = useRef(null);
  MakeDraggable(browserRef, '.browser-header');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };


  const handleGoClick = () => {
    setLoading(true);
      // URL doluysa girilen URL'ye yönlendir
      setTimeout(() => {
        if (!url.trim()) {
          setContent("");
          setUrl("");
        } else if (url.trim().toLowerCase() === "dosya indir") {
        // URL "indir" ise başka bir div göster ve URL inputunu değiştir
        setContent("download");
        setUrl("https://www.google.com.tr/search?q=dosya+indir&sca_esv=87c8593f13286a53&hl=tr&sxsrf=ADLYWIJxXgQSDsqTSAed6C7E4xXZRu");
        } else if (url === '192.168.1.1') {
          setContent(`login`);
        } else if (url === 'https://another.com') {
          setContent('Another Content: This is the content for another.com.');
        } else {
          setContent('404 Not Found. The requested URL was not found on this server.');
        }
        console.log('Current content:',content); // content değerini kontrol et
        setLoading(false);
      }, 2000); // 2 saniye gecikme
    };

  const handleDownloadClick = (fileUrl) => {
    setDownloadMessage("İndiriliyor...");
    setTimeout(() => {
      setDownloadMessage("");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // 3 saniye sonra pop-up'ı gizle
    }, 1000); // 1 saniye gecikme
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGoClick();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    setLoginusername(username);
    setLoginpassword(password);
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleDownloadClickInside = () => {
    
  }

  return (
    <div className="browser-window" /*style={style}*/ ref={browserRef}>
        <div className="browser-header">
          <h2>Browser</h2>
          <button className="browser-close" onClick={closeBrowser}>×</button> 
        </div>
        <div className="browser-search">
          <img 
          style={{ color:'white', width: 24, height: 24, marginRight: 10, filter: 'invert(1)', cursor: 'pointer' }}
          src="./icons/home.png" alt="Home Logo" 
          onClick={() => {
            if(!loading){
            setContent('main')
            setUrl('https://www.google.com/')}}
          }
          />
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL"
            className="browser-url-input"
          />
          <button onClick={handleGoClick} className="browser-go-button">Go</button>
              
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
            (() => {
              switch (content) {
                case 'login':
                  console.log('login calisti');
                  return (
                    <div className="login-container">
                      <h2>WiFi Login</h2>
                      <form id="login-form" onSubmit={handleLoginSubmit}>
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input type="text" id="username" name="username" required />
                        <label htmlFor="password">Şifre:</label>
                        <input type="password" id="password" name="password" required />
                        <button type="submit">Login</button>
                      </form>
                    </div>
                 );
                case 'main':
                  return (
                    <div className='firstPartOfBrowser'>
                      <h1>Google</h1>
                      <div className='searchPart'>
                        <img src="./icons/search.png" alt="Search Logo"/>
                        <input onChange={handleUrlChange} onKeyDown={handleKeyDown} type="text" placeholder="Google'da Ara" />
                        <div className='searchPart_right'>
                          <img src="./icons/keyboard.png" alt="Keyboard Logo"/>
                          <img src="./icons/google-voice.png" alt="Voice Logo"/>
                        </div>
                      </div>
                    </div>
                  );
                case 'download':
                  return (
                    <div className='download-pages'>
                      <div className='searchPart' style={{width:500, height:40, marginBottom:40}}>
                          <img src="./icons/search.png" alt="Search Logo"/>
                          <input onChange={handleUrlChange} onKeyDown={handleKeyDown} type="text" placeholder="Google'da Ara" />
                        <div className='searchPart_right'>
                          <img src="./icons/keyboard.png" alt="Keyboard Logo"/>
                          <img src="./icons/google-voice.png" alt="Voice Logo"/>
                        </div>
                      </div>
                        <div className= 'searchPart_bottom'>
                          <h3 className='tümü'>Tümü</h3>
                          <h3>Görseller</h3>
                          <h3>Videolar</h3>
                          <h3>Yer siteleri</h3>
                          <h3>Haberler</h3>
                          <h3>Web</h3>
                        </div>
                    <h2 onClick={() => {
                      setContent("download1")
                      setUrl("https://www.download-example.com")}} 
                      style={{cursor:"pointer"}}
                    >Dosya İndir 1 ....</h2>
                    <h2>Dosya İndir 2 ....</h2>
                    <h2>Dosya İndir 3 ....</h2>
                    </div>
                  );
                case 'download1':
                  return (
                    <div className="download-div-inside">
                        <img src="./download-background.jpg" alt="Download Background" />
                        <h2>Download Section</h2>
                        <p>This is the download section content.</p>
                      <div className="download-links">
                        <h3>Available Downloads:</h3>
                        <ul>
                          <li>
                            <button onClick={handleDownloadClick}>
                              Download File 1
                            </button>
                          </li>
                          <li>
                            <button onClick={handleDownloadClick}>
                              Download File 2
                            </button>
                          </li>
                          <li>
                            <button onClick={handleDownloadClick}>
                              Download File 3
                            </button>
                          </li>
                        </ul>
                        {downloadMessage && <p style={{justifySelf:"center"}}>{downloadMessage}</p>}
                      </div>
                      {showPopup && <div className="popup">İndirildi!</div>}
                    </div>
                  );
                default:
                  return <div>{content}</div>;
              }
            })()
          )
        }

       
            
      </div>
    </div>
  );
};

export default Browser;