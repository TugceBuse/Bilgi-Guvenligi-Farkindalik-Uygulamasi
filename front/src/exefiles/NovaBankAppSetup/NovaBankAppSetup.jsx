import React, { useState, useRef, useEffect } from 'react';
import './NovaBankAppSetup.css';
import { useUIContext } from '../../Contexts/UIContext';
import { useFileContext } from '../../Contexts/FileContext';
import { useWindowConfig } from '../../Contexts/WindowConfigContext';

const NovaBankAppSetup = ({ fileName }) => {
  const { closeFile } = useFileContext();
  const { updateAvailableStatus, windowConfig } = useWindowConfig();
  const SetupRef = useRef(null);

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [installing, setInstalling] = useState(false);
  const intervalRef = useRef(null);

  const handleClose = () => {
    clearInterval(intervalRef.current);
    closeFile(fileName);
  };

  const handleNext = () => {
    if (windowConfig.novabankapp?.available) {
      setStep(0);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    if (progress > 0) {
        setProgress(0);
        setInstalling(false);
        clearInterval(intervalRef.current);
    }
  };

  const startInstallation = () => {
    setInstalling(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setInstalling(false);
          setStep(4);
          updateAvailableStatus('novabankapp', true);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 4) + 1, 100);
      });
    }, 300);
  };

  const cancelInstallation = () => {
    clearInterval(intervalRef.current);
    setInstalling(false);
    setProgress(0);
  };

  return (
    <div className="novabanksetup-overlay">
      <div className="novabanksetup-window" ref={SetupRef}>
        <div className="novabanksetup-header">
          <div className="novabanksetup-header-left">
            <img className="novabanksetup-img" src="/novaBank/NovaBankAppSetup.png" alt="Bank" />
            <h2>NovaBank Uygulama Kurulumu</h2>
          </div>
          <button className="novabanksetup-close" onClick={handleClose}>×</button>
        </div>

        <div className="novabanksetup-content">
            <div
            className="novabanksetup-content-left"
            style={{
                backgroundImage: `url('/novaBank/NovaBankAppSetup.png')`}}>
            </div>
          <div className="novabanksetup-container">
            {step === 0 && (
              <div className="novabanksetup-step">
                <h4>NovaBank Zaten Kurulu</h4>
                <p>Bu bilgisayarda NovaBank uygulaması zaten kurulu.</p>
                <button onClick={handleClose}>Tamam</button>
              </div>
            )}

            {step === 1 && (
              <div className="novabanksetup-step">
                <h4>Adım 1: Kullanıcı Sözleşmesi</h4>
                <p>Lütfen şartları okuyun ve kabul edin.</p>
                <textarea
                  readOnly
                  style={{ backgroundColor: "#1a2837", color: "#fff", height: 150 }}
                  value={`Bu uygulama finansal işlemler için tasarlanmıştır.\nYetkisiz kullanım yasaktır.\nVeri gizliliği garanti altındadır.`}
                />
                <button onClick={handleNext}>Kabul Ediyorum</button>
              </div>
            )}

            {step === 2 && (
              <div className="novabanksetup-step">
                <h4>Adım 2: Kurulum Dizini</h4>
                <p>NovaBank uygulaması şu konuma kurulacaktır:</p>
                <div style={{ backgroundColor: "#1a2837", color: "white", padding: 10, width: 300 }}>
                  C:\Program Files\NovaBankApp
                </div>
                <div className="novabanksetup-buttons">
                  <button onClick={handleBack}>Geri</button>
                  <button onClick={handleNext}>İleri</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="novabanksetup-step">
                <h4>Adım 3: Kurulum</h4>
                <p>Kurulumu başlatmak için tıklayın.</p>
                <div className="novabanksetup-buttons">
                  <button onClick={handleBack}>Geri</button>
                  {!installing ? (
                    <button onClick={startInstallation}>Kurulumu Başlat</button>
                  ) : (
                    <button onClick={cancelInstallation}>İptal Et</button>
                  )}
                </div>

                {installing && (
                <div className="progress-bar3-wrapper">
                    <div className="progress-bar3">
                        <div className="progress-bar3-inner" style={{ width: `${progress}%` }} />
                        <span className="progress-bar3-label">% {progress}</span>
                    </div>
                </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="novabanksetup-step">
                <h4>✅ Kurulum Tamamlandı</h4>
                <p>NovaBank uygulaması başarıyla kuruldu.</p>
                <button onClick={handleClose}>Tamam</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaBankAppSetup;
