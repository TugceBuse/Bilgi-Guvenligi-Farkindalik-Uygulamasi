import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./IntroScreen.module.css";

const introMessages = [
  "Görevlerine başlamadan önce, platformumuza kayıt olduğun e-posta ve şifre ile 'MailBox' uygulamasına giriş yapman gerekecek.",
  "Oyun başladığında, PhishVille ekibinden gelen bir hoş geldin e-postası ile karşılaşacaksın. Sana verilen görevleri ve detaylarını ise 'TaskApp' uygulamasını indirip üzerinden kolayca takip edebilirsin.",
  "Unutma, aldığın kararlar puanına ve güvenlik seviyene etki eder. Şüpheli durumlarda dikkatli ol!",
  "Hazırsan simülasyonu başlatabilirsin."
];

const IntroScreen = ({ onFinish }) => {
  const [stage, setStage] = useState("welcome");
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const audioRef = useRef(null);

  // Welcome ekranında herhangi bir tuşa basınca animasyona geç
  useEffect(() => {
    if (stage !== "welcome") return;
    const handleAnyKey = () => setStage("typewriter");
    window.addEventListener("keydown", handleAnyKey, { once: true });
    return () => window.removeEventListener("keydown", handleAnyKey);
  }, [stage]);

   useEffect(() => {
    if (stage !== "typewriter") return;
    setDisplayed("");
    setTyping(true);
    let idx = 0;

    // -- Sesi BAŞLAT --
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio("/type.wav");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.13;
    // play() çağrısı Promise dönebilir, ignore edelim:
    audioRef.current.play().catch(()=>{});

    const interval = setInterval(() => {
      setDisplayed(introMessages[msgIdx].slice(0, idx + 1));
      idx++;
      if (idx >= introMessages[msgIdx].length) {
        clearInterval(interval);
        setTyping(false);
        // -- Sesi DURDUR --
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }, 18);

    return () => {
      clearInterval(interval);
      // -- Sesi her ihtimale karşı DURDUR --
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [msgIdx, stage]);

  // Tuşla mesaj geçişi (sadece typewriter aşamasında)
  const handleKeyDown = useCallback((e) => {
    if (stage !== "typewriter") return;
    if (typing) {
      setDisplayed(introMessages[msgIdx]);
      setTyping(false);
      return;
    }
    if (msgIdx < introMessages.length - 1 && (e.key === "Enter" || e.key === " ")) {
      setMsgIdx(idx => idx + 1);
    }
  }, [typing, msgIdx, stage]);

  useEffect(() => {
    if (stage !== "typewriter") return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, stage]);

  // Render
  if (stage === "welcome") {
    return (
      <div className={styles.introScreen}>
        <div className={styles.introMessage}>
          <b>SİMÜLASYONA HOŞ GELDİN!</b><br /><br />
          <span style={{fontSize: "1.1rem", opacity: 0.85}}>
            Devam etmek için herhangi bir tuşa bas.
          </span>
        </div>
      </div>
    );
  }

  // typewriter fazı:
  return (
    <div className={styles.introScreen}>
        <h2>İPUÇLARI</h2>
      <div className={styles.introMessage}>
        {displayed}
        {typing && <span className={styles.blinkingCursor}>|</span>}
      </div>
      <div style={{ marginTop: 40 }}>
        {(msgIdx < introMessages.length - 1) ? (
          <div className={styles.introTip}>
            <span>Geçmek için <b>Enter</b> veya <b>Boşluk</b> tuşuna basabilirsin.</span>
          </div>
        ) : (
          <button className={styles.introStartBtn} onClick={onFinish}>Simülasyonu Başlat</button>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;
