import React from "react";
import styles from "./ConnectionOverlay.module.css";

const ConnectionOverlay = ({ isConnected, top = 48, children }) => {
  // top parametresi: header yüksekliği (varsayılan 48px)
  return (
    <div style={{height: "100%", position: "relative", flex: "1 1 auto", minHeight: 0}}>
      {!isConnected && (
        <div className={styles.disabledOverlay} style={{ top }}>
          <div>
            <b>İnternet bağlantısı yok.</b>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default ConnectionOverlay;