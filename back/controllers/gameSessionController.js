// controllers/gameSessionController.js
const GameSession = require('../models/gameSession');

exports.createGameSession = async (req, res) => {
  try {
    const { quests, eventLogs, totalScore, gameVersion, deviceInfo } = req.body;
    const userId = req.user.id; // Auth middleware'den gelecek

    if (!quests || !eventLogs) {
      return res.status(400).json({ error: "Eksik veri. quests ve eventLogs gereklidir." });
    }

    const endedAt = new Date(); // Oyun bitiş zamanı otomatik

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
