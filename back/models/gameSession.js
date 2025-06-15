const mongoose = require('mongoose');

const EventLogSchema = new mongoose.Schema({
  type: { type: String, required: true },           // Ör: phishing_mail_open, wrong_url_visit
  questId: { type: String },                        // Hangi görevle bağlantılı (varsa)
  logEventType: { type: String },                   // Olayın türü (örn: wifi, mailbox, taskapp)
  value: { type: Number, default: 0 },              // Bu aksiyonun puan etkisi (+ veya -)
  data: { type: mongoose.Schema.Types.Mixed },       // Ekstra detay (örn: url, mailId)
  timestamp: { type: Date, default: Date.now }       // Olay zamanı
}, { _id: false });

const QuestStatusSchema = new mongoose.Schema({  //Quests dizisi uygun doldurulup oyun sonu bu şemada gamesession'a eklenir
  questId: { type: String, required: true },
  status: { type: String, enum: ['locked', 'active', 'completed', 'failed'], required: true },
  completedAt: { type: Date },                      // Görev tamamlandıysa zamanı
  score: { type: Number, default: 0 },            // Bu görevden kazanılan puan
  logEventType: { type: String }                    // O görevin event türü (örn: wifi, mailbox)
}, { _id: false });

const GameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },                            // Oyun bitiş zamanı
  totalScore: { type: Number, default: 0 },           // Hesaplanmış toplam skor
  quests: [QuestStatusSchema],                        // Tüm görevlerin durumu ve detayları
  eventLogs: [EventLogSchema],                        // Oyun boyunca tüm event loglar
  gameVersion: { type: String },                      // (İsteğe bağlı) Oyun versiyonu
  deviceInfo: { type: String },                       // (İsteğe bağlı) Cihaz/browser bilgisi
  // Gerekirse ekstra metadata eklenebilir
});

module.exports = mongoose.model("GameSession", GameSessionSchema);
