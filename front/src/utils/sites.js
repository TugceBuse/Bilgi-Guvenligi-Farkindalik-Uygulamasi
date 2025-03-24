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
    searchKeys: ["antivirus", "security", "vpn", "shield", "shieldsecure", "secure"],
    clickable: true,
    color: "green"
  },
  "cybersentinel.com": { 
    title: "CyberSentinel", 
    type: "component", 
    component: "CyberSentinel",
    statement: "Kurumsal güvenlik ve antivirüs hizmetleri sunuyoruz.",
    searchKeys: ["antivirus", "firewall", "malware", "cyber", "cybersentinel", "sentinel"],
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
  },
  "procareerhub.com": {
    title: "ProCareerHub",
    type: "component",
    component: "ProCareerHub",
    statement: "İş fırsatlarını keşfet ve profesyonel ağını genişlet.",
    searchKeys: ["kariyer", "iş ilanları", "profesyonel ağ", "cv hazırlama", "mülakat teknikleri"],
    clickable: true,
    color: "#0073e6",
  },
  "skillforgehub.com": {
    title: "SkillForgeHub",
    type: "component",
    component: "SkillForgeHub",
    statement: "Becerilerini geliştir, mentor desteği al ve başarı hikayelerinden ilham al!",
    searchKeys: ["kariyer", "iş ilanları", "profesyonel ağ", "cv hazırlama", "mülakat teknikleri", "beceri geliştirme", "mentorluk", "online kurslar", "kariyer planlama", "başarı hikayeleri"],
    clickable: true,
    color: "#FF6F00"
},
  "postify.com": {
    title: "Postify",
    type: "component",
    component: "PostifyAuth",
    statement: "Bağlantı kur, paylaşım yap, sosyal çevrenle etkileşimde kal!",
    searchKeys: [
      "postify",
      "sosyal medya",
      "arkadaşlar",
      "paylaşım",
      "mesajlaşma",
      "etkileşim",
      "ofis içi iletişim",
      "sosyal mühendislik",
      "kurumsal sosyal ağ",
      "bildirimler",
      "profil"
    ],
    clickable: true,
    color: "#3b5998"
  }

};

export default sites;
