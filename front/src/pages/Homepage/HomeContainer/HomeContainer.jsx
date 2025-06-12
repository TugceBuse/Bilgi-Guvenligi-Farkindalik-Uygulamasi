import React from "react";
import WorkSpaceModel from "./WorkSpaceModel";
import "./homeContainer.css";

const HomeContainer = () => {
  return (
      <div className="moving-background">
           
        {/* Bilgilendirme Kısmı */}
        <div className="FirstPart">
          <div className="canvas-section">
            <WorkSpaceModel />
          </div>

          <div className="line"></div>

          <div className="text-section">
            <h1>Hoş Geldiniz!</h1>
            <h3>Bu simülasyon, bilgi güvenliği farkındalığınızı artırmak, </h3> 
            <h3>olası siber saldırılara karşı sizi hazırlamak amacıyla tasarlanmıştır. </h3>
            <h3>Çalışma ortamında karşılaşabileceğiniz tehditler ve </h3>
            <h3>hatalarla ilgili çeşitli senaryolarla kendinizi test edebilir, doğru güvenlik alışkanlıkları kazanabilirsiniz.</h3>
            <h4>Başlamak için aşağıdaki “Simülasyonu Başlat” butonuna tıklayınız.</h4>
          </div>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <h3>🎣 Phishing Nedir?</h3>
            <p>Kötü niyetli kişiler sahte e-postalarla sizi kandırarak şifrelerinizi ele geçirmeye çalışır.</p>
          </div>

          <div className="info-card">
            <h3>🛡 Güçlü Parola Oluştur</h3>
            <p>Uzun, karmaşık ve tahmin edilmesi zor parolalar kullanmak hesabınızı korur.</p>
          </div>

          <div className="info-card">
            <h3>⚠ Güncellemeleri Aksatma</h3>
            <p>Sistem güncellemeleri güvenlik açıklarını kapatır. İhmal etme.</p>
          </div>

          <div className="info-card">
            <h3>📁 Bilinmeyen Dosyalara Dikkat</h3>
            <p>Tanımadığın kişilerden gelen eklere asla tıklama. Virüs olabilir!</p>
          </div>

          <div className="info-card">
            <h3>🔐 İki Faktörlü Kimlik Doğrulama</h3>
            <p>Parolanıza ek olarak SMS veya uygulama ile gelen doğrulama kodunu kullanarak hesap güvenliğinizi ikiye katlayın.</p>
          </div>

          <div className="info-card">
            <h3>🌐 Sahte Siteleri Tanı</h3>
            <p>Gerçek gibi görünen sahte siteler, giriş bilgilerinizi çalmak için tasarlanmıştır. URL’yi dikkatle kontrol edin.</p>
          </div>
          <div className="info-card">
            <h3>🛠 Sahte Güncellemelere Dikkat</h3>
            <p>Saldırganlar, sahte sistem güncellemeleriyle cihazınıza zararlı yazılım yüklemeye çalışabilir. Yalnızca resmi kaynakları kullanın.</p>
          </div>
        </div>
      {/* Model */}

   </div>
  );
};

export default HomeContainer;