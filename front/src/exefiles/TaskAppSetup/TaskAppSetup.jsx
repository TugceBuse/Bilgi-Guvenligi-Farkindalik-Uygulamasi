import React, { useState, useRef } from 'react';
import './TaskAppSetup.css';
import { useUIContext } from '../../Contexts/UIContext';
import { useFileContext } from '../../Contexts/FileContext';
import { useGameContext } from '../../Contexts/GameContext';

export const useTaskSetup = () => {
  const { toggleWindow } = useUIContext();

  const openHandler = () => {
    toggleWindow('tasksetup');
  };

  const closeHandler = () => {
    toggleWindow('tasksetup');
  };

  return { openHandler, closeHandler };
};

const TaskAppSetup = ({ file, fileName }) => {
  const { isTaskAppInstalled, setIsTaskAppInstalled } = useGameContext();
  const SetupRef = useRef(null);

  const [step, setStep] = useState(1);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { closeFile } = useFileContext();

  const handleNextStep = () => {
    if (isTaskAppInstalled) {
      setStep(0); 
    } else {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      setStep(step + 1);
      setIsTaskAppInstalled(true);
    }, 4000);
  };

  const handleClose = () => {
    closeFile(fileName);
  };

  return (
    <div className="taskappsetup-overlay">
      <div className="taskappsetup-window" ref={SetupRef}>
        <div className="taskappsetup-header">
          <div className="taskappsetup-header-left">
            <img className="taskappsetup-img" src="/icons/task-list.png" alt="Task Setup" />
            <h2>Setup</h2>
          </div>
          <button className="taskappsetup-close" onClick={handleClose}>×</button>
        </div>

        <div className="taskappsetup-content">
          <div className="taskappsetup-content-left"></div>
          <div className="taskappsetup-container">
            <h3>Task Manager Uygulaması Kurulumu</h3>

            {step === 0 && (
              <div className="taskappsetup-step">
                <h4>Task Manager Zaten Kurulu</h4>
                <p>Bu bilgisayarda Task Manager uygulaması zaten kurulu.</p>
                <div className="taskappsetup-buttons">
                  <button onClick={handleClose}>Tamam</button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="taskappsetup-step">
                <h4>Adım 1: Kullanım Şartları</h4>
                <p>Kullanım şartlarını okuyun ve kabul edin.</p>
                <textarea
                  style={{ color: "white", backgroundColor: "#1a2837", height: 150 }}
                  readOnly
                  value={`Lütfen kullanım koşullarını dikkatlice okuyunuz:
                  1. Yazılım yalnızca kişisel kullanım için sunulmuştur.
                  2. Yetkisiz kopyalama, dağıtım veya değiştirme yasaktır.
                  3. Kullanım sırasında oluşabilecek veri kayıplarından geliştirici sorumlu tutulamaz.
                  4. Güncellemeler otomatik olarak sunulacaktır.
                  5. Şartları kabul ederek kuruluma devam edebilirsiniz.`}
                />
                <div className="taskappsetup-buttons">
                  <button onClick={handleNextStep}>Kabul Ediyorum</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="taskappsetup-step">
                <h4>Adım 2: Kurulum Yolu</h4>
                <p>Task Manager uygulamasının kurulacağı klasör:</p>
                <div style={{ width: 300, height: 40, fontSize: 13, backgroundColor: "#1a2837", color: "white", alignContent: "center" }}>
                  C:\Program Files\TaskManagerPro
                </div>
                <div className="taskappsetup-buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="taskappsetup-step">
                <h4>Adım 3: Kurulum</h4>
                <p>Kurulumu başlatmak için butona tıklayın.</p>
                <div className="taskappsetup-buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button className="download-button" onClick={handleFinish} disabled={buttonLoading}>
                    Kurulumu Başlat
                  </button>
                </div>

                {buttonLoading && (
                  <div className="progress-bar2">
                    Kuruluyor...
                    <div>
                    <img src="/icons/setting1.png" alt="Setup"/>
                    <img src="/icons/setting2.png" alt="Setup"/>
                    <img src="/icons/setting3.png" alt="Setup"/>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="taskappsetup-step">
                <h4>Kurulum Tamamlandı</h4>
                <p>Task Manager uygulaması başarıyla kuruldu.</p>
                <div className="taskappsetup-buttons">
                  <button onClick={handleClose}>Tamam</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAppSetup;
