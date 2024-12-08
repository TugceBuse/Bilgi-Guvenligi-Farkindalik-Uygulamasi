import React, { useState,useEffect, useRef } from 'react';
import './Browser.css';
import { MakeDraggable } from '../Draggable';
import { useGameContext } from '../Context';
import BrowserBar from './BrowserBar';
import { use } from 'react';
  
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

  const { setAntivirusexe } = useGameContext();

  const [url, setUrl] = useState('https://www.google.com/');
  const [content, setContent] = useState('main');
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  //Dosya indirme Senaryosu için kullanılacak
  const [downloadMessage, setDownloadMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [history, setHistory] = useState([`google.com`]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef(currentIndex);

  //192.168.1.1 sayfasi login
  const [loginusername, setLoginusername] = useState('');
  const [loginpassword, setLoginpassword] = useState('');

  const browserRef = useRef(null);
  MakeDraggable(browserRef, '.browser-header');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };


  const handleGoClick = (newUrl = url, addToHistory = true) => {
    setLoading(true);
    setTimeout(() => {
      // URL'yi normalize et
      const normalizedUrl = newUrl.replace(/^(https?:\/\/)?(www\.)?|\/$/g, '');

      if (!normalizedUrl.trim()) {
        setContent('');
        setUrl('');
      } else {
        if (addToHistory) {
          if (currentIndex === history.length - 1) {
            // Kullanıcı history'nin sonundaysa yeni URL'yi ekle
            const newHistory = [...history, normalizedUrl];
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
          } else {
            // Kullanıcı history'nin sonunda değilse yeni URL'yi history sonu yap
            const newHistory = [...history.slice(0, currentIndex + 1), normalizedUrl];
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
          }
        }

        if (normalizedUrl.trim().toLowerCase() === 'antivirus.com') {
          setContent('download');
          setUrl('https://www.google.com.tr/search?q=dosya+indir&sca_esv=87c8593f13286a53&hl=tr&sxsrf=ADLYWIJxXgQSDsqTSAed6C7E4xXZRu');
        } else if (normalizedUrl === '192.168.1.1') {
          setContent('login');
        } else if (normalizedUrl === 'google.com') {
          setContent('main');
          setUrl('https://www.google.com/');
        } else if ('www.download-example.com') {
          setContent('download1');
          setUrl('https://www.download-example.com');
        }else {
          setContent('404 Not Found. The requested URL was not found on this server.');
        }
      }
      setLoading(false);
    }, 2000); // 2 saniye gecikme
  };

  useEffect(() => {
    console.log(`'History:', ${history},${history.length} Content: ${content}`);
  }, [history, content]);

  useEffect(() => {
    console.log(`URL: ${url}`);
  }, [url]);

  useEffect(() => {
    console.log(`CurrentIndex: ${currentIndex}`);
  }, [currentIndex]);



  const handleDownloadClick = () => {
    setButtonLoading(true);
    setDownloadMessage('İndiriliyor...');
    setTimeout(() => {
      setButtonLoading(false);
      setDownloadMessage('İndirme tamamlandı!');
      setShowPopup(true);
      setAntivirusexe(true);
      setTimeout(() => {
        setShowPopup(false);
        setDownloadMessage('');
      }, 3000); // 3 saniye sonra pop-up'ı gizle
    }, 10000); // 10 saniye gecikme
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };
  
  const handleForwardClick = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex && currentIndex >= 0 && currentIndex < history.length) {
      handleGoClick(history[currentIndex], false);
    }
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

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

  const googleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === 'antivirus') {
      setContent('download');
    }
  }

  const searchkeydown = (e) => {
    if (e.key === "Enter") {
      googleSearch(e);
    }
  }


  return (
    <div className="browser-window" style={style} ref={browserRef}>
        <div className="browser-header">
          <h2>Browser</h2>
          <button className="browser-close" onClick={closeBrowser}>×</button> 
        </div>
        <div className="browser-search">
        <img 
          style={{ color:'white', width: 20, height: 20, marginRight: 10, filter: 'invert(1)', cursor: 'pointer' }}
          src="./icons/arrow.png" alt="Arrow Logo" 
          onClick={handleBackClick}
          />

        <img 
          style={{ color:'white', width: 20, height: 20, marginRight: 10, filter: 'invert(1)', cursor: 'pointer', opacity: 1 }}
          src="./icons/right-arrow (1).png" alt="Right Arrow Logo" 
          onClick={handleForwardClick}
          />

          <img 
          style={{ color:'white', width: 24, height: 24, marginRight: 10, filter: 'invert(1)', cursor: 'pointer' }}
          src="./icons/home.png" alt="Home Logo" 
          onClick={() => {
            if(!loading && content !== 'main') {
            handleGoClick('google.com')}}
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
                        <input /*onChange={}*/ onKeyDown={searchkeydown} type="text" placeholder="Google'da Ara" />
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

                        {/* Dosya indirme linkleri */}

                        {/* 1.link */}
                        <div className='link-part'>  
                          <div className='top-of-the-link'>
                            <div className='image-div'>SH</div>
                                <div style={{display: "flex", flexDirection:"column"}}>
                                    ShieldSecure
                                    <p>https://www.download-example.com</p>
                                </div>
                          </div>

                          <h2 onClick={() => {
                          handleGoClick("https://www.download-example.com")
                          }} 
                          style={{cursor:"pointer"}}
                          title='https://www.download-example.com'
                          >  
                          ShieldSecure | Antivirüs ve VPN İndir!
                          </h2>  
                          <p>Cihazlarınızı antivirüs ile güvenle koruyun. VPN'le güvenle gezin!</p>
                        </div>
                    
                        {/* 2.link */}
                        <div className='link-part'>  
                          <div className='top-of-the-link'>
                            <div className='image-div' style={{backgroundImage: "radial-gradient(circle, #e3e2e2 25%, #d9a196 50%, #801b07 75%, #54f651 100%)"}}>CS</div>
                                <div style={{display: "flex", flexDirection:"column"}}>
                                    CyberSentinel
                                    <p>https://www.download-example2.com</p>
                                </div>
                          </div>

                          <h2 onClick={() => {
                          setContent("download1")
                          setUrl("https://www.download-example.com")}} 
                          style={{cursor:"pointer"}}
                          title='https://www.download-example2.com'
                          >  
                          VirusVanisher | Antivirüs ve VPN İndir!
                          </h2>  
                          <p>Cihazlarınızı antivirüs ile güvenle koruyun. VPN'le güvenle gezin!</p>
                        </div>

                        {/* 3.link */}                
                        <div className='link-part'>  
                          <div className='top-of-the-link'>
                            <div className='image-div' style={{ color:"#d9d4d4", backgroundImage: "linear-gradient(-20deg, #2d342a 2%, #374a39 50%, #282d22 75%, #ffffcc 100%)" }}>VV</div>
                                <div style={{display: "flex", flexDirection:"column"}}>
                                    VirusVanisher
                                    <p>https://www.download-example.com</p>
                                </div>
                          </div>

                          <h2 onClick={() => {
                          setContent("download1")
                          setUrl("https://www.download-example.com")}} 
                          style={{cursor:"pointer"}}
                          title='https://www.download-example.com'
                          >  
                          ShieldSecure | Antivirüs ve VPN İndir!
                          </h2>  
                          <p>Cihazlarınızı antivirüs ile güvenle koruyun. VPN'le güvenle gezin!</p>
                        </div>
                    </div>
                  );

                case 'download1':
                  return (
                    <div className="download-div-inside">
                        <BrowserBar/>
                        <img src="./download-background.jpg" alt="Download Background" />
                        <h2>ShieldSecure Antivirüs İndirme Bölümü</h2>
                        <p>ShieldSecure antivirüs yazılımını indirmek için aşağıdaki bağlantıları kullanabilirsiniz.</p>
                      <div className="download-links">
                        <h3>Mevcut İndirmeler:</h3>
                        <ul>
                          <li>
                          <button onClick={handleDownloadClick} disabled={buttonLoading} className="download-button">
                            {buttonLoading ? <div className="progress-bar"></div> : 'ShieldSecure Setup'}
                          </button>
                          </li>
                          <li>
                            <button onClick={handleDownloadClick}>
                                ShieldSecure Güncelleme
                            </button>
                          </li>
                          <li>
                            <button /*onClick={handleDownloadClick}*/ >
                                ShieldSecure Kullanım Kılavuzu
                            </button>
                          </li>
                        </ul>
                        {downloadMessage && <p style={{justifySelf:"center"}}>{downloadMessage}</p>}
                      </div>
                      { showPopup && <div className="popup">İndirildi!</div>}
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