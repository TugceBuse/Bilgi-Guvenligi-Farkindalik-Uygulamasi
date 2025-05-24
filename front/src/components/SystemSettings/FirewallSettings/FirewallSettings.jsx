
import styles from './FirewallSettings.module.css';
import { useVirusContext } from '../../../Contexts/VirusContext';

const FirewallSettings = ({ onClose }) => {
  const { 
    domainNetworkEnabled, 
    setDomainNetworkEnabled, 
    privateNetworkEnabled, 
    setPrivateNetworkEnabled, 
    publicNetworkEnabled, 
    setPublicNetworkEnabled
  } = useVirusContext();

  return (
     <div className={styles.firewallContainer}>
      <div className={styles.header}>
        <img src="/icons/firewall.png" alt="Firewall Icon" className={styles.headerIcon} />
        <b>Güvenlik Duvarı Ayarları</b>
      </div>
      <div className={styles.body}>
        <h4 className={styles.sectionTitle}>Ağ Profilleri</h4>

        <div className={styles.networkGroup}>
          <span className={styles.networkLabel}>🏢 Etki Alanı Ağı</span>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={domainNetworkEnabled}
              onChange={() => setDomainNetworkEnabled(prev => !prev)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
            <span className={domainNetworkEnabled ? styles.on : styles.off}>
              {domainNetworkEnabled ? "AÇIK" : "KAPALI"}
            </span>
          </label>
          <hr className={styles.divider} />
          <p className={styles.info}>
            Güvenlik duvarı, bilgisayarınızı ağ trafiğini kontrol ederek izinsiz bağlantılardan korur.<br />
            <span className={domainNetworkEnabled ? styles.safe : styles.danger}>
              {domainNetworkEnabled
                ? "Koruma aktif. Cihazınız güvende."
                : "Kapalı! Cihazınız saldırılara açık."}
            </span>
          </p>
        </div>

        <div className={styles.networkGroup}>
          <span className={styles.networkLabel}>🏠 Özel Ağ</span>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={privateNetworkEnabled}
              onChange={() => setPrivateNetworkEnabled(prev => !prev)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
            <span className={privateNetworkEnabled ? styles.on : styles.off}>
              {privateNetworkEnabled ? "AÇIK" : "KAPALI"}
            </span>          
          </label>
          <hr className={styles.divider} />
          <p className={styles.info}>
            Güvenlik duvarı, bilgisayarınızı ağ trafiğini kontrol ederek izinsiz bağlantılardan korur.<br />
            <span className={privateNetworkEnabled ? styles.safe : styles.danger}>
              {privateNetworkEnabled
                ? "Koruma aktif. Cihazınız güvende."
                : "Kapalı! Cihazınız saldırılara açık."}
            </span>
          </p>
        </div>

        <div className={styles.networkGroup}>
          <span className={styles.networkLabel}>🌐 Ortak Ağ</span>
          <label className={styles.switchLabel}>
            <input
              type="checkbox"
              checked={publicNetworkEnabled}
              onChange={() => setPublicNetworkEnabled(prev => !prev)}
              className={styles.switchInput}
            />
            <span className={styles.switchSlider}></span>
            <span className={publicNetworkEnabled ? styles.on : styles.off}>
              {publicNetworkEnabled ? "AÇIK" : "KAPALI"}
            </span>
          </label>
          <hr className={styles.divider} />
          <p className={styles.info}>
          Güvenlik duvarı, bilgisayarınızı ağ trafiğini kontrol ederek izinsiz bağlantılardan korur.<br />
          <span className={publicNetworkEnabled ? styles.safe : styles.danger}>
            {publicNetworkEnabled
              ? "Koruma aktif. Cihazınız güvende."
              : "Kapalı! Cihazınız saldırılara açık."}
          </span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default FirewallSettings;