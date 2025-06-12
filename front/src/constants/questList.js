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
    title: "Maillerinizi görebilmek için Mailbox'a phishville hesap bilgilerinizle giriş yapın.",
    description: "Mail kutusuna güvenli giriş yap.",
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
    // unlocks: ["cloud-download", "chatapp-install"],
    unlocks: null,
    requires: ["login_mailbox"],
    point: 20,
    penalty: -20,
    logEventType: "taskapp"
  },
  // ... ve diğer zincir görevler
];

export { QUEST_LIST };
