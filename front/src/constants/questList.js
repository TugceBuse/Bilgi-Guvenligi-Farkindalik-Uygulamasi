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
    id: "wifi-connect",
    title: "WiFi Bağlantısı",
    description: "Maillerini görebilmek ve gerekli uygulamaları indirebilmek için bir WiFi ağına bağlan",
    status: "active",
    unlocks: ["mailbox-login"],
    requires: [],
    point: 10,
    penalty: -10,
    logEventType: "wifi"
  },
  {
    id: "mailbox-login",
    title: "Mailbox Bağlantısı",
    description: "Mail kutusuna güvenli giriş yap.",
    status: "locked",
    unlocks: ["taskapp-download"],
    requires: ["wifi-connect"],
    point: 10,
    penalty: -10,
    logEventType: "mailbox"
  },
  {
    id: "taskapp-download",
    title: "TaskApp İndir & Kur",
    description: "Gelen mailleri kontrol ederek doğru TaskApp dosyasını indir ve kur.",
    status: "locked",
    unlocks: ["cloud-download", "chatapp-install"],
    requires: ["mailbox-login"],
    point: 20,
    penalty: -20,
    logEventType: "taskapp"
  },
  // ... ve diğer zincir görevler
];

export { QUEST_LIST };
