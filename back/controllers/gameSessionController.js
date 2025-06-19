const GameSession = require('../models/gameSession');

// Oyun oturumu oluştur (mevcut fonksiyon)
exports.createGameSession = async (req, res) => {
  try {
    const { quests, eventLogs, totalScore, gameVersion, deviceInfo } = req.body;
    const userId = req.user.id;

    if (!quests || !eventLogs) {
      return res.status(400).json({ error: "Eksik veri. quests ve eventLogs gereklidir." });
    }

    const endedAt = new Date();

    const session = new GameSession({
      userId,
      quests,
      eventLogs,
      totalScore,
      endedAt,
      gameVersion,
      deviceInfo,
    });

    await session.save();

    res.status(201).json({ message: "GameSession başarıyla kaydedildi.", session });
  } catch (err) {
    console.error("GameSession kayıt hatası:", err);
    res.status(500).json({ error: "GameSession kaydedilemedi." });
  }
};

// Kullanıcının tüm oyun oturumlarını getirir
exports.getUserGameSessions = async (req, res) => {
  try {
    const sessions = await GameSession.find({ userId: req.user.id }).sort({ endedAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error("GameSession getUserGameSessions hatası:", err);
    res.status(500).json({ error: "Oyun oturumları getirilemedi." });
  }
};

// Belirli bir oturumu id'ye göre getirir
exports.getGameSessionById = async (req, res) => {
  try {
    const session = await GameSession.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!session) return res.status(404).json({ error: "Oyun oturumu bulunamadı." });
    res.json(session);
  } catch (err) {
    console.error("GameSession getGameSessionById hatası:", err);
    res.status(500).json({ error: "Oyun oturumu getirilemedi." });
  }
};