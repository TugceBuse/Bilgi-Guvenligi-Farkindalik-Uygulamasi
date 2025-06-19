import React, { useEffect, useState } from "react";
import styles from "./MyGames.module.css";
import { useNavigate } from "react-router-dom";

// Dummy detay verileri ile birlikte
const dummyGames = [
  {
    id: 1,
    date: "2024-06-20 21:37",
    score: 1570,
    completedQuests: 7,
    totalQuests: 7,
    duration: "11 dk 36 sn",
    status: "Başarıyla Tamamlandı",
    tasks: [
      { name: "Mail Girişi", done: true },
      { name: "Kargo Takibi", done: true },
      { name: "Virüs Analizi", done: true },
      { name: "Fake Site Tespiti", done: true },
      { name: "QR Kodu Testi", done: true },
      { name: "Sosyal Medya Güvenliği", done: true },
      { name: "2FA Aktifleştirme", done: true }
    ],
    errors: ["Yok"],
    viruses: [],
  },
  {
    id: 2,
    date: "2024-06-19 16:18",
    score: 980,
    completedQuests: 6,
    totalQuests: 7,
    duration: "8 dk 52 sn",
    status: "Erken Sonlandı",
    tasks: [
      { name: "Mail Girişi", done: true },
      { name: "Kargo Takibi", done: true },
      { name: "Virüs Analizi", done: false },
      { name: "Fake Site Tespiti", done: true },
      { name: "QR Kodu Testi", done: false },
      { name: "Sosyal Medya Güvenliği", done: true },
      { name: "2FA Aktifleştirme", done: true }
    ],
    errors: [
      "Virüs Analizinde başarısız",
      "QR kodu güvenli değildi"
    ],
    viruses: ["adware"],
  },
];

const GameDetailModal = ({ game, onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <h3>
        Oyun Detayı <span className={styles.modalDate}>{game.date}</span>
      </h3>
      <div className={styles.detailRow}><b>Puan:</b> <span>{game.score}</span></div>
      <div className={styles.detailRow}><b>Süre:</b> <span>{game.duration}</span></div>
      <div className={styles.detailRow}><b>Durum:</b> <span>{game.status}</span></div>
      <div className={styles.detailRow}><b>Görevler:</b>
        <ul className={styles.tasksList}>
          {game.tasks.map((t, i) => (
            <li key={i}>
              <span className={t.done ? styles.done : styles.fail}>
                {t.done ? "✔" : "✘"}
              </span>{" "}
              {t.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.detailRow}>
        <b>Hatalar:</b>
        <ul>
          {game.errors.length === 0
            ? <li>Yok</li>
            : game.errors.map((err, i) => <li key={i} className={styles.error}>{err}</li>)
          }
        </ul>
      </div>
      <div className={styles.detailRow}>
        <b>Virüs Etkisi:</b>
        <ul>
          {game.viruses.length === 0
            ? <li>Yok</li>
            : game.viruses.map((v, i) => <li key={i}>{v}</li>)
          }
        </ul>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>Kapat</button>
    </div>
  </div>
);

const MyGames = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [displayedScore, setDisplayedScore] = useState(0); // animasyon için
  const navigate = useNavigate();

  useEffect(() => {
    setGames(dummyGames);
  }, []);

  // Son oyun için animasyonlu puan sayacı
  useEffect(() => {
    if (!games[0]) return;
    let start = 0;
    const end = games[0].score;
    if (start === end) {
      setDisplayedScore(end);
      return;
    }
    let step = Math.max(1, Math.floor(end / 35));
    let interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setDisplayedScore(start);
    }, 16); // yaklaşık 500ms'de tamamlanır
    return () => clearInterval(interval);
  }, [games]);

  const latestGame = games[0];
  const otherGames = games.slice(1);

  return (
    <div className={styles.wrapper}>
        <img src="/phishville.png" alt="PhishVilleLogo" className={styles.phishvilleGoback} title="www.safeClicks.com" onClick={() => navigate("/")}/>
        <h2>
          <span role="img" aria-label="gamepad" style={{fontSize: "1.6em", marginRight: 8}}>
            <img
              src="icons/gamepad.png"
              alt="My Games Icon"
            /> 
          </span>
          Oyun Bilgilerim
        </h2>
        {latestGame && (
        <div className={styles.latestGameCard} onClick={() => setSelectedGame(latestGame)}>
          <div className={styles.latestTitle}>En Son Oynanan Oyun</div>
          <div className={styles.scoreCenterArea}>
            <div className={styles.scoreLabel}>Puan</div>
            <div className={styles.animatedScore}>{displayedScore}</div>
          </div>
          <div className={styles.latestContent}>
            <div>
              <b>Süre:</b> <span>{latestGame.duration}</span>
            </div>
            <div>
              <b>Durum:</b> <span>{latestGame.status}</span>
            </div>
            <div>
              <b>Tarih:</b> <span>{latestGame.date}</span>
            </div>
            <div>
              <b>Görevler:</b> <span>{latestGame.completedQuests}/{latestGame.totalQuests}</span>
            </div>
          </div>
          <button className={styles.detailBtn}>Detayları Görüntüle</button>
        </div>
      )}
      <div className={styles.sectionHeader}>Diğer Oyunlarım</div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tarih</th>
              <th>Puan</th>
              <th>Görevler</th>
              <th>Süre</th>
              <th>Durum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {otherGames.length === 0 && (
              <tr>
                <td colSpan={7} style={{textAlign:"center", opacity:0.7}}>Başka oyun kaydı bulunamadı.</td>
              </tr>
            )}
            {otherGames.map((game, idx) => (
              <tr key={game.id}>
                <td>{idx + 2}</td>
                <td>{game.date}</td>
                <td>{game.score}</td>
                <td>
                  {game.completedQuests}/{game.totalQuests}
                </td>
                <td>{game.duration}</td>
                <td>{game.status}</td>
                <td>
                  <button className={styles.smallDetailBtn} onClick={() => setSelectedGame(game)}>
                    Detay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default MyGames;
