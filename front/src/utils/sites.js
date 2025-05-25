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

  "https://filevault.com": {
    title: "FileVault",
    type: "component",
    component: "FileVault",
    statement: "Yedeklediğiniz önemli dosyalarınıza yalnızca size özel token ile erişebilirsiniz.",
    searchKeys: [
      "filevault",
      "cloud backup",
      "bulut yedekleme",
      "kişisel dosya kasası",
      "token ile erişim",
      "güvenli dosya",
      "yedekleme",
      "private vault",
      "file backup"
    ],
    clickable: true,
    protocol: "https",
    color: "#3A76D2",
    isSponsored: false,
    seoScore: 82
  },

  "https://cloudbox.com": {
    title: "CloudBox",
    type: "component",
    component: "CloudBox",
    statement: "Kayıt olarak kişisel dosyalarını yedekle, paylaş ve yönet. Güvenli ve kolay bulut depolama deneyimi!",
    searchKeys: [
      "bulut yedekleme",
      "cloudbox",
      "dosya yükleme",
      "cloud kayıt",
      "dosya paylaş",
      "file backup",
      "yedekleme",
      "cloud backup",
      "kişisel bulut depolama",
    ],
    clickable: true,
    protocol: "https",
    color: "#24bfff",
    isSponsored: false,
    seoScore: 91
  },

  "^https://cloudbox.com/package/([a-zA-Z0-9]+)$": {
    title: "CloudBox Yedek Paketi",
    type: "component",
    component: "CloudBoxPackageDisplay",
    statement: "Paylaşılan yedek dosya paketi.",
    clickable: true,
    protocol: "https"
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
},
"http://novatekno.com": {
  title: "NovaTekno",
  type: "component",
  component: "NovaTekno",
  statement: "Fırsat ürünleriyle uygun fiyatlı alışveriş deneyimi!",
  searchKeys: ["teknoloji, bilgisayar , ofis ekipmanları, ekipman, novatekno, tekno, novatekno.com, nova, tech, techdepo,bilgisayar parçaları"],
  clickable: true,
  protocol: "http",
  color: "#1EFFFF",
  isSponsored: false,
  seoScore: 42
},
"https://novabank.com": {
  title: "NovaBank",
  type: "component",
  component: "NovaBankSite",
  statement: "NovaBank masaüstü uygulamasını indirerek tüm bankacılık işlemlerinizi hızlı ve güvenli şekilde gerçekleştirin.",
  searchKeys: [
    "nova bank",
    "bankacılık",
    "finans",
    "dijital bankacılık",
    "mobil bankacılık",
    "internet bankacılığı",
    "nova",
    "havale",
    "eft",
    "ibAN",
    "güvenli bankacılık",
    "masaüstü uygulama",
    "şifreleme",
    "2FA",
    "NovaBankSetup"
  ],
  clickable: true,
  protocol: "https",
  color: "#0A3D91", // Koyu mavi: finansal güven çağrıştırır
  isSponsored: false,
  seoScore: 85
},
"https://novabank-indir.com": {
  title: "NovaBank",
  type: "component",
  component: "NovaBankSiteF",
  statement: "NovaBank masaüstü uygulamasını indirerek tüm bankacılık işlemlerinizi hızlı ve güvenli şekilde gerçekleştirin.",
  searchKeys: [
    "nova bank",
    "bankacılık",
    "finans",
    "dijital bankacılık",
    "mobil bankacılık",
    "internet bankacılığı",
    "nova",
    "havale",
    "eft",
    "ibAN",
    "güvenli bankacılık",
    "masaüstü uygulama",
    "şifreleme",
    "2FA",
    "NovaBankSetup"
  ],
  clickable: true,
  protocol: "https",
  color: "#0A3D91", // Koyu mavi: finansal güven çağrıştırır
  isSponsored: true,
  seoScore: 65
},
"https://doculite.com": {
  title: "DocuLite PDF Viewer",
  type: "component",
  component: "DocuLite",
  statement: "Hafif, güvenli ve ücretsiz PDF görüntüleyici — ekstra izin olmadan!",
  searchKeys: [
    "pdf", 
    "doculite", 
    "pdf viewer", 
    "belge görüntüleyici", 
    "dosya açıcı", 
    "reader", 
    "güvenli pdf indir", 
    "açık kaynak pdf uygulaması"
  ],
  clickable: true,
  protocol: "https",
  color: "#4CAF50", // Güven veren yeşil tonu
  isSponsored: false,
  seoScore: 88
},
"http://quickpdfview-download.net": {
  title: "QuickPDFView",
  type: "component",
  component: "QuickPDFView",
  statement: "Hızlı ve pratik PDF görüntüleyici — hemen indirip kullanın!",
  searchKeys: [
    "pdf görüntüleyici",
    "quickpdf",
    "ücretsiz pdf indir",
    "reader indir",
    "pdf aç",
    "en iyi pdf programı",
    "hızlı pdf okuyucu",
    "pdf setup"
  ],
  clickable: true,
  protocol: "http", 
  color: "#ec407a", 
  isSponsored: true,
  seoScore: 42 
},
"http://openlitepdf-tools.net": {
  title: "OpenLite PDF Tools",
  type: "component",
  component: "OpenLitePDF",
  statement: "Kapsamlı PDF yönetimi — tek tıkla indir, tüm belgeleri kolayca aç!",
  searchKeys: [
    "pdf araçları",
    "openlite pdf",
    "gelişmiş pdf uygulaması",
    "ücretsiz pdf düzenleyici",
    "aşırı hızlı pdf okuyucu",
    "pdf araç kutusu",
    "pdf convert",
    "openlite indir"
  ],
  clickable: true,
  protocol: "http",
  color: "#9c27b0", // Mor ton — sofistike ama dikkat çeker
  isSponsored: false,
  seoScore: 45
}
};

export default sites;
