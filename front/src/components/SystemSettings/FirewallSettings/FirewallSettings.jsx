
import styles from './FirewallSettings.module.css';
import { useVirusContext } from '../../../Contexts/VirusContext';

const FirewallSettings = ({ onClose }) => {
  const { firewallEnabled, setFirewallEnabled } = useVirusContext();

  return (
     <div className={styles.firewallContainer}>
      <div className={styles.header}>
        <img src="/icons/firewall.png" alt="Firewall Icon" className={styles.headerIcon} />
        <b>Güvenlik Duvarı Ayarları</b>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      <div className={styles.body}>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            checked={firewallEnabled}
            onChange={() => setFirewallEnabled(prev => !prev)}
            className={styles.switchInput}
          />
          <span className={styles.switchSlider}></span>
          <span className={firewallEnabled ? styles.on : styles.off}>
            {firewallEnabled ? "AÇIK" : "KAPALI"}
          </span>
        </label>
        <hr className={styles.divider} />
        <p className={styles.info}>
          Güvenlik duvarı, bilgisayarınızı ağ trafiğini kontrol ederek izinsiz bağlantılardan korur.<br />
          <span className={firewallEnabled ? styles.safe : styles.danger}>
            {firewallEnabled
              ? "Koruma aktif. Cihazınız güvende."
              : "Kapalı! Cihazınız saldırılara açık."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FirewallSettings;