const sites = {
  "https://google.com": { 
    title: "Google", 
    type: "search", 
    statement: "Dünyanın en popüler arama motoru.",
    searchKeys: [],
    protocol: "https",
    isSponsored: false,
    seoScore: 100
  },

  "https://google.com/search?q=": { 
    title: "Google Search", 
    type: "search-results", 
    statement: "Arama sonuçlarınızı görüntüleyin.",
    searchKeys: [],
    protocol: "https",
    isSponsored: false,
    seoScore: 95
  },

  "https://shieldsecure.com": { 
    title: "ShieldSecure", 
    type: "component", 
    component: "ShieldSecure",
    statement: "Cihazlarınızı antivirüs ile güvenle koruyun.",
    searchKeys: ["antivirus", "security", "vpn", "shield", "shieldsecure", "secure"],
    clickable: true,
    protocol: "https",
    isSponsored: false,
    seoScore: 75
  },

  "https://cybersentinel.com": { 
    title: "CyberSentinel", 
    type: "component", 
    component: "CyberSentinel",
    statement: "Kurumsal güvenlik ve antivirüs hizmetleri sunuyoruz.",
    searchKeys: ["antivirus", "firewall", "malware", "cyber", "cybersentinel", "sentinel"],
    clickable: true,
    protocol: "https",
    isSponsored: false,
    seoScore: 70
  },

  "https://safebrowsing.com": { 
    title: "SafeBrowsing", 
    type: "info",
    statement: "Güvenli internet gezinme hakkında bilgiler.",
    searchKeys: ["safe browsing", "web security", "privacy","antivirus"],
    clickable: false,
    protocol: "https",
    color: "#FF5733",
    isSponsored: false,
    seoScore: 65
  },

  "https://procareerhub.com": {
    title: "ProCareerHub",
    type: "component",
    component: "ProCareerHub",
    statement: "İş fırsatlarını keşfet ve profesyonel ağını genişlet.",
    searchKeys: ["kariyer", "iş ilanları", "profesyonel ağ", "cv hazırlama", "mülakat teknikleri"],
    clickable: true,
    protocol: "https",
    isSponsored: false,
    seoScore: 83
  },

  "https://skillforgehub.com": {
    title: "SkillForgeHub",
    type: "component",
    component: "SkillForgeHub",
    statement: "Becerilerini geliştir, mentor desteği al ve başarı hikayelerinden ilham al!",
    searchKeys: ["kariyer", "iş ilanları", "profesyonel ağ", "cv hazırlama", "mülakat teknikleri", "beceri geliştirme", "mentorluk", "online kurslar", "kariyer planlama", "başarı hikayeleri"],
    clickable: true,
    protocol: "https",
    isSponsored: false,
    seoScore: 82
  },

  "https://ads-skillforgehub.com": {
    title: "SkillForgeHub",
    type: "component",
    statement: "Becerilerini geliştir, mentor desteği al ve başarı hikayelerinden ilham al!",
    searchKeys: ["kariyer", "iş ilanları", "profesyonel ağ", "cv hazırlama", "mülakat teknikleri", "beceri geliştirme", "mentorluk", "online kurslar", "kariyer planlama", "başarı hikayeleri"],
    clickable: false,
    color: "#FFF300",
    protocol: "https",
    isSponsored: true,
    seoScore: 15
  },

  "https://postify.com": {
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
    protocol: "https",
    isSponsored: false,
    seoScore: 78
  },

  "https://techdepo.com": {
  title: "TechDepo",
  type: "component",
  component: "TechDepo",
  statement: "Bilgisayar ve ofis ekipmanlarında güvenilir alışverişin adresi.",
  searchKeys: ["tech shop", "bilgisayar parçaları", "ofis ekipmanları", "indirimli teknoloji, techdepo, tech, depo"],
  clickable: true,
  protocol: "https",
  color: "#1E90FF",
  isSponsored: false,
  seoScore: 87
}

};

export default sites;
