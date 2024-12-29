const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Yetkilendirme tokeni eksik veya geçersiz.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
};
