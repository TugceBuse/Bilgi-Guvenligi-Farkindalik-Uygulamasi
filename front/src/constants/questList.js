// {
//   id: string, // unique quest id
//   title: string, // başlık
//   description: string, // açıklama
//   status: "locked" | "active" | "completed" | "failed", // mevcut durumu
//   unlocks: string[], // tamamlanınca açılan görevler
//   requires: string[], // başlaması için bitmesi gereken görevler
//   point: number, // başarıyla tamamlanınca verilecek puan
//   penalty: number, // yanlış yaparsa kaybedeceği puan
//   logEventType: string, // event logunda bu göreve özel event tipi
// }

const QUEST_LIST = [
  {
    id: "connect_wifi",
    title: "WiFi Bağlantısı",
    description: "Maillerini görebilmek ve gerekli uygulamaları indirebilmek için bir WiFi ağına bağlan.",
    status: "active",
    unlocks: ["login_mailbox"],
    requires: [],
    point: 10,
    penalty: -10,
    logEventType: "wifi"
  },
  {
    id: "login_mailbox",
    title: "Mailbox'a Giriş Yap",
    description: "Maillerinizi görebilmek için Mailbox'a phishville hesap bilgilerinizle giriş yapın.",
    status: "locked",
    unlocks: ["download_taskapp"],
    requires: ["connect_wifi"],
    point: 10,
    penalty: -10,
    logEventType: "mailbox"
  },
  {
    id: "download_taskapp",
    title: "TaskApp İndir & Kur",
    description: "Maillerini kontrol et ve sana gönderdiğimiz setup dosyasını indirip TaskApp'i kur.",
    status: "locked",
    unlocks: ["download_cloud", "download_novabank", "download_chatapp"],
    requires: ["login_mailbox"],
    point: 20,
    penalty: -20,
    logEventType: "taskapp"
  },
  {
    id: "download_cloud",
    title: "Yedeklemiş Olduğun Dosyaları İndir(Detaylar Açıklamada)",
    description: `Daha önce https://filevault.com sitesini kullanarak yedeklediğin dosyaları 'a92cf10a-27d4-476b-98f3-8d2fa98c7d84' token ile indirip incele.
     Bu dosyalar kişisel bilgiler içermektedir. Güvenli bir şekilde saklamayı unutma!` ,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["download_taskapp"],
    point: 20,
    penalty: -20,
    logEventType: "cloud"
  },
  {
    id: "pdf_viewer_install",
    title: "PDF Görüntüleyici İndir",
    description: `Simülasyon boyunca lazım olacak sanal çalışan bilgilerini görüntüleyebilmek için bir PDF görüntüleyici indir.` ,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["download_cloud"],
    point: 20,
    penalty: -20,
    logEventType: "pdf"
  },
    {
    id: "file_backup",
    title: "Dosyalarını Yedekle",
    description: `Olası bir veri kaybına karşı, önemli dosyalarını Browser üzerinden erişebileceğin bir bulut sitesine yedekle.` ,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["pdf_viewer_install"],
    point: 20,
    penalty: -20,
    logEventType: "backup"
  },
  {
    id: "download_novabank",
    title: "Banka Uygulaması Kur",
    description: "Bakiyeni kontrol etmek ve internet alışverişlerini bakiyene göre yapabilmek için bir banka uygulaması kur. (Tarayıcı üzerinden ilgili kelimeleri aratarak bulabilirsin).",
    status: "locked",
    unlocks: ["buy_printer"],
    requires: ["download_taskapp"],
    point: 20,
    penalty: -20,
    logEventType: "novabank"
  },
  {
    id: "download_chatapp",
    title: "Mesajlaşma Uygulaması Kur",
    description: "Bir çevrimiçi mmesajlaşma uygulaması indirip kur. (Tarayıcı üzerinden ilgili kelimeleri aratarak bulabilirsin).",
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["download_taskapp"],
    point: 20,
    penalty: -20,
    logEventType: "chatapp"
  },
  {
    id: "buy_printer",
    title: "Şirket adına bir yazıcı(printer) satın al",
    description:  `Departmandaki raporların çıktısını alabilmek için renkli baskı destekli bir yazıcı satın al.
     (Banka uygulamandan bakiyene bakmayı unutma,maillerinden ya da sosyal medya üzerinden
      fırsatları yakalamayı da ihmal etme! Ne kadar ucuz o kadar iyi...`,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["download_novabank"],
    point: 20,
    penalty: -20,
    logEventType: "e-commerce"
  },
  {
    id: "save_invoice",
    title: "Satın alınan yazıcının faturasını kaydet",
    description:  `Satın alınan renkli baskı destekli yazıcının faturasını kaydet ve Chat uygulaması üzerinden satış departmanıyla paylaş.`,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["buy_printer"],
    point: 20,
    penalty: -20,
    logEventType: "save-invoice"
  },
  {
    id: "share_cargo_status",
    title: "Satın alınan yazıcının kargo durumunu paylaş",
    description:  `Satın alınan renkli baskı destekli yazıcı kargoya verildiğinde, kargo durumunu sana iletilen mail veya sms yoluyla öğren ve Chat uygulaması üzerinden IT departmanıyla paylaş.`,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["buy_printer"],
    point: 20,
    penalty: -20,
    logEventType: "status"
  },
  {
    id: "register_career_site",
    title: "Kariyer Sitesine Kayıt Ol",
    description:  `Browser üzerinden bir kariyer sitesine kayıt ol. Bu, şirket içi fırsatları takip edebilmen için önemlidir.`,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["download_chatapp"],
    point: 20,
    penalty: -20,
    logEventType: "career"
  },
  {
    id: "sharing_post",
    title: "Sosyal Medya Üzerinden Paylaşım Yap",
    description:  `Şirketin sosyal ağı olan Postify üzerinde yarın yapılacak olan şirket etkinliği için bir paylaşım yap.`,
    status: "locked",
    // unlocks: [""],
    unlocks: null,
    requires: ["register_career_site"],
    point: 20,
    penalty: -20,
    logEventType: "share"
  },
  // ... ve diğer zincir görevler
];

export { QUEST_LIST };
