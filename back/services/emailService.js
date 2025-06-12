const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // TLS kullanımı için secure false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, type, data = {}) => {
  try {
    let subject = '';
    let html = '';

    // İçerik oluşturma
    switch (type) {
      case 'Aktivasyon':
        if (!data.firstName || !data.activationUrl) {
          throw new Error('Aktivasyon için gerekli veriler eksik.');
        }
        subject = 'E-posta Doğrulama';
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h1 style="color: #007bff;">E-posta Doğrulama</h1>
            <p>Merhaba ${data.firstName},</p>
            <p>Hesabınızı aktif hale getirmek için aşağıdaki bağlantıya tıklayın:</p>
            <a href="${data.activationUrl}" style="color: #fff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">E-posta doğrula</a>
          </div>
        `;
        break;

      case 'Şifre Sıfırlama':
        if (!data.resetUrl) {
          throw new Error('Şifre sıfırlama için gerekli veriler eksik.');
        }
        subject = 'Şifre Sıfırlama Talebi';
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h1 style="color: #007bff;">Şifre Sıfırlama</h1>
            <p>Hesabınızın şifresini sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
            <a href="${data.resetUrl}" style="color: #fff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Şifreyi sıfırla</a>
          </div>
        `;
        break;

      default:
        throw new Error('Geçersiz e-posta türü.');
    }

    // E-posta gönderme
    const mailOptions = {
      from: process.env.EMAIL_USER, // Gönderici
      to,                          // Alıcı
      subject,                     // Konu
      html,                        // HTML formatında içerik
    };

    await transporter.sendMail(mailOptions);
    console.log(`E-posta başarıyla gönderildi: ${to}`);
  } catch (err) {
    console.error('E-posta gönderimi başarısız:', err.message, err.stack);
    throw new Error(`E-posta gönderilemedi: ${err.message}`);
  }
};

module.exports = { sendEmail };
