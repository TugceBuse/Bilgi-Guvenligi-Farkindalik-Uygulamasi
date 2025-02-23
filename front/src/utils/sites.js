const sites = {
  "google.com": { 
    title: "Google", 
    type: "search", 
    statement: "Dünyanın en popüler arama motoru.",
    searchKeys: []
  },
  "google.com/search?q=": { 
    title: "Google Search", 
    type: "search-results", 
    statement: "Arama sonuçlarınızı görüntüleyin.",
    searchKeys: []
  },
  "shieldsecure.com": { 
    title: "ShieldSecure", 
    type: "component", 
    component: "ShieldSecure",
    statement: "Cihazlarınızı antivirüs ile güvenle koruyun.",
    searchKeys: ["antivirus", "security", "vpn"],
    clickable: true,
    color: "green"
  },
  "cybersentinel.com": { 
    title: "CyberSentinel", 
    type: "component", 
    component: "CyberSentinel",
    statement: "Kurumsal güvenlik ve antivirüs hizmetleri sunuyoruz.",
    searchKeys: ["antivirus", "firewall", "malware"],
    clickable: true,
    color: "red"
  },
  "safebrowsing.com": { 
    title: "SafeBrowsing", 
    type: "info",
    statement: "Güvenli internet gezinme hakkında bilgiler.",
    searchKeys: ["safe browsing", "web security", "privacy","antivirus"],
    clickable: false,
    color: "blue"
  }
};

export default sites;
