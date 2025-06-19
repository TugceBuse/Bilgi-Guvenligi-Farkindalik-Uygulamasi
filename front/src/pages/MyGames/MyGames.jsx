import React, { useEffect, useState } from "react";
import styles from "./MyGames.module.css";
import { useNavigate } from "react-router-dom";
import { fetchGameSessions } from "../../services/gameSessionService";
import { useAuthContext } from "../../Contexts/AuthContext";

const formatDuration = (seconds) => {
  if (!seconds) return "-";
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min} dk ${sec} sn`;
};

const getStatus = (gs) => {
  if (!gs.quests) return "-";
  const failed = gs.quests.some(q => q.status === "failed");
  const completed = gs.quests.every(q => q.status === "completed");
  if (completed) return "Başarıyla Tamamlandı";
  if (failed) return "Erken Sonlandı";
  return "-";
};

const mapGameSession = (gs, idx) => ({
  id: gs._id || idx + 1,
  date: gs.createdAt ? new Date(gs.createdAt).toLocaleString("tr-TR") : "-",
  score: gs.totalScore ?? 0,
  completedQuests: gs.quests?.filter(q => q.status === "completed").length ?? 0,
  totalQuests: gs.quests?.length ?? 0,
  duration: gs.duration
    ? formatDuration(gs.duration)
    : (gs.startTime && gs.endTime
        ? formatDuration(Math.floor((new Date(gs.endTime) - new Date(gs.startTime)) / 1000))
        : "-"),
  status: getStatus(gs),
  tasks: (gs.quests || []).map(q => ({
    name: q.title,
    done: q.status === "completed"
  })),
  errors: (gs.quests || [])
    .filter(q => q.status === "failed")
    .map(q => `${q.title} görevi başarısız`),
  viruses: gs.eventLogs?.filter(ev => ev.logEventType === "virus").map(ev => ev.virusType) || [],
});

const GameDetailModal = ({ game, onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      {/* ...modal içeriğin aynı kalabilir */}
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
  const [displayedScore, setDisplayedScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext(); // Token'ı context'ten veya localden çek

  const navigate = useNavigate();

  useEffect(() => {
  const loadGames = async () => {
    setLoading(true);
    try {
      const response = await fetchGameSessions(token);
      setGames(response.map(mapGameSession));
    } catch (err) {
      setGames([]);
      console.error("Oyunlar çekilemedi:", err);
    }
    setLoading(false);
  };
  loadGames();
}, [token]);

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
    }, 16);
    return () => clearInterval(interval);
  }, [games]);

  const latestGame = games[0];
  const otherGames = games.slice(1);

  return (
    <div className={styles.wrapper}>
      <img src="/phishville.png" alt="PhishVilleLogo" className={styles.phishvilleGoback} title="www.safeClicks.com" onClick={() => navigate("/")}/>
      <h2>
        <span role="img" aria-label="gamepad" style={{fontSize: "1.6em", marginRight: 8}}>
          <img src="icons/gamepad.png" alt="My Games Icon"/> 
        </span>
        Oyun Bilgilerim
      </h2>
      {loading && <div>Yükleniyor...</div>}
      {latestGame && !loading && (
        <div className={styles.latestGameCard} onClick={() => setSelectedGame(latestGame)}>
          <div className={styles.latestTitle}>En Son Oynanan Oyun</div>
          <div className={styles.scoreCenterArea}>
            <div className={styles.scoreLabel}>Puan</div>
            <div className={styles.animatedScore}>{displayedScore}</div>
          </div>
          <div className={styles.latestContent}>
            <div><b>Süre:</b> <span>{latestGame.duration}</span></div>
            <div><b>Durum:</b> <span>{latestGame.status}</span></div>
            <div><b>Tarih:</b> <span>{latestGame.date}</span></div>
            <div><b>Görevler:</b> <span>{latestGame.completedQuests}/{latestGame.totalQuests}</span></div>
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
            {otherGames.length === 0 && !loading && (
              <tr>
                <td colSpan={7} style={{textAlign:"center", opacity:0.7}}>Başka oyun kaydı bulunamadı.</td>
              </tr>
            )}
            {otherGames.map((game, idx) => (
              <tr key={game.id}>
                <td>{idx + 2}</td>
                <td>{game.date}</td>
                <td>{game.score}</td>
                <td>{game.completedQuests}/{game.totalQuests}</td>
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
