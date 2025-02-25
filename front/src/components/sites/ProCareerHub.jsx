import React, { useState } from "react";

const ProCareerHub = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleRegisterClick = () => {
    setButtonLoading(true);
    setRegisterMessage("Kayıt işlemi yapılıyor...");
    setTimeout(() => {
      setButtonLoading(false);
      setRegisterMessage("Kayıt başarıyla tamamlandı!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setRegisterMessage("");
      }, 3000);
    }, 5000);
  };

  return (
    <div className="register-div">
      <h2>ProCareerHub - Kayıt Ol</h2>
      <p>İş fırsatlarını keşfetmek için hemen üye ol!</p>
      <button onClick={handleRegisterClick} disabled={buttonLoading} className="register-button">
        {buttonLoading ? <div className="progress-bar"></div> : "Hesap Oluştur"}
      </button>
      {registerMessage && <p>{registerMessage}</p>}
      {showPopup && <div className="popup">Kayıt tamamlandı!</div>}
    </div>
  );
};

export default ProCareerHub;
