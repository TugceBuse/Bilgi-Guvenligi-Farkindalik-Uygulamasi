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
  const [content, setContent] = useState('main');
  const [loading, setLoading] = useState(false);
  //192.168.1.1 sayfasi login
  const [loginusername, setLoginusername] = useState('');
  const [loginpassword, setLoginpassword] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGoClick = () => {
    setLoading(true);
    setTimeout(() => {
    if (url === '192.168.1.1') {
      setContent(`login`);
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    setLoginusername(username);
    setLoginpassword(password);
    console.log(`Username: ${username}, Password: ${password}`);
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
        ) : content === 'login' ? (
          // kullanici adi ve şifre dogruluguna göre Wifi şifresi koyma işlemi yapılacak yeni bir page açılacak
          //Wifi şifresini Taskbar kullanıyor o problemi çözmek için Taskbar'i Game.jsx'e de değil de Game.jsx>Desktop.jsx>Taskbar.jsx seklinde cagirilabilir mi?
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
        ) : content === 'main' ? (
          <div className='firstPartOfBrowser'>
             <h1>Google</h1>
             <div className='searchPart'>
               <img src="./icons/search.png" alt="Google Voice Logo"/>
              <input type="text" placeholder="Google'da Ara" />
               
                      <div className='searchPart_right'>
                        <img src="./icons/keyboard.png" alt="Google Voice Logo"/>
                        <img src="./icons/google-voice.png" alt="Google Voice Logo"/>
                      </div>
             </div>
          </div>
          ) : (
            <div>{content}</div>
          )
        }
      </div>
    </div>
  );
};

export default Browser;