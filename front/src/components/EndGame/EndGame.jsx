import React from "react";
import styles from "./EndGame.module.css";

const EndGame = ({
  title = "Oyun Bitti!",
  description = "Tebrikler, oyunu tamamladınız.",
  score,
  onRestart,
  onClose
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <div className={styles.header}>       
            <img
            src="icons/game-over.png"
            alt="Game Over Icon"
            /> 
          <h2>{title}</h2>
        </div>
        <div className={styles.body}>
          <p>{description}</p>
          {typeof score !== "undefined" && (
            <div className={styles.scoreBox}>
              <span>Puanınız:</span>
              <b>{score}</b>
            </div>
          )}
          Daha fazla bilgi için profilinizi ziyaret edebilirsiniz.
        </div>
        <div className={styles.footer}>
          {onRestart && (
            <button className={styles.button} onClick={onRestart}>
              Yeniden Oyna
            </button>
          )}
          <button className={styles.button} onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
