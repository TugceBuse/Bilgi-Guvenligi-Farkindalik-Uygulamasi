import React, { useState } from 'react';
import styles from './SystemSettings.module.css';
import FirewallSettings from './FirewallSettings/FirewallSettings';
import FileLocker from './FileLocker/FileLocker';

const SystemSettings = ({ onClose }) => {
  const [page, setPage] = useState("");

  const renderRightPanel = () => {
    switch (page) {
      case "firewall":
        return <FirewallSettings onClose={() => setPage("")} />;
      case "update":
        return <div className={styles.placeholder}>Otomatik Güncellemeler Ayarı</div>;
      case "permissions":
        return <div className={styles.placeholder}>Uygulama Erişim İzinleri Ayarı</div>;
      case "guest":
        return <div className={styles.placeholder}>Misafir Oturumları Ayarı</div>;
      case "usb":
        return <div className={styles.placeholder}>USB Aygıt Ayarı</div>;
      case "vpn":
        return <div className={styles.placeholder}>VPN & Ağ Ayarı</div>;
      case "filelocker":
        return <FileLocker onClose={() => setPage("")} />;
      default:
        return (
          <div className={styles.infoBox}>
            <h3>💻 Sistem Bilgisi</h3>
            <p>Bu panelden sistem güvenlik ayarlarını yapılandırabilirsiniz.</p>
            <ul>
              <li>İşletim Sistemi: SimülatörOS v1.0</li>
              <li>Durum: Koruma kısmen aktif</li>
              <li>Ayarlar: Henüz tam yapılandırılmadı</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Sistem Ayarları</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <ul className={styles.list}>
              <li onClick={() => setPage("firewall")}>🛡 Güvenlik Duvarı</li>
              <li onClick={() => setPage("update")}>🔄 Otomatik Güncellemeler</li>
              <li onClick={() => setPage("permissions")}>📷 Uygulama Erişim İzinleri</li>
              <li onClick={() => setPage("guest")}>👥 Misafir Oturumları</li>
              <li onClick={() => setPage("usb")}>💾 USB Aygıt Kontrolleri</li>
              <li onClick={() => setPage("vpn")}>🌐 VPN & Ağ Ayarları</li>
              <li onClick={() => setPage("filelocker")}>🔒 Dosya Şifreleme</li>
            </ul>
          </div>
          <div className={styles.rightPanel}>
            {renderRightPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
