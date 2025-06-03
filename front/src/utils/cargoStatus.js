// src/utils/cargoStatus.js
export const statusSteps = [
  {
    status: "Kargo kaydı oluşturuldu.",
    desc: "Gönderiniz için kargo kaydı alındı.",
    icon: "📝",
    durationSeconds: 60
  },
  {
    status: "Kargo şubeye ulaştı.",
    desc: "Kargonuz çıkış şubesine ulaştı.",
    icon: "📦",
    durationSeconds: 60
  },
  {
    status: "Transfer merkezinde.",
    desc: "Kargonuz transfer merkezinde işlem görüyor.",
    icon: "🏢",
    durationSeconds: 60
  },
  {
    status: "Dağıtıma çıktı.",
    desc: "Kargonuz dağıtım için yola çıktı.",
    icon: "🚚",
    durationSeconds: 60,
    mail: {
      type: "cargo",
      title: "Kargonuz Dağıtıma Çıktı!",
      precontent: "Kargonuz dağıtıma çıktı. Tahmini teslimat için kargo sayfasını kontrol edebilirsiniz.",
      content: ({ trackingNo, shippingCompany }) => (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', color: "#222", fontSize: "16px" }}>
          <h2 style={{ color: "#258cff", margin: "0 0 10px 0" }}>
            Kargonuz Dağıtıma Çıktı! 🚚
          </h2>
          <p>
            <span style={{ color: "#258cff", fontWeight: 600 }}>
              {trackingNo}
            </span> takip numaralı gönderiniz, bugün <b>{shippingCompany}</b> kargo tarafından dağıtıma çıkarılmıştır.
          </p>
          <div style={{
            background: "#e8f5ff",
            padding: "10px 14px",
            borderRadius: 8,
            margin: "10px 0 16px 0",
            borderLeft: "4px solid #258cff"
          }}>
            <b>Tahmini teslimat:</b> Aynı gün içerisinde, saat 17:00’ye kadar yapılacaktır.
          </div>
          <ul style={{ margin: "8px 0 16px 20px", color: "white" }}>
            <li>Kargonuz dağıtım görevlisinde.</li>
            <li>Teslimat sırasında SMS ile ayrıca bilgilendirileceksiniz.</li>
            <li>Evde olmamanız durumunda şubeden teslim alabilirsiniz.</li>
          </ul> 
        </div>
      )
    }
  },
  {
    status: "Teslimat bekleniyor.",
    desc: "Kargonuz teslimat adresinizde bekleniyor.",
    icon: "🏠",
    durationSeconds: 60
  },
  {
    status: "Teslim edildi.",
    desc: "Kargonuz alıcıya teslim edildi.",
    icon: "✅",
    durationSeconds: null,
    mail: {
      type: "cargo",
      title: "Kargonuz Teslim Edildi!",
      precontent: "Kargonuz başarıyla teslim edilmiştir. İyi günlerde kullanın!",
      content: ({ trackingNo, shippingCompany }) => (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', color: "#222", fontSize: "16px" }}>
          <h2 style={{ color: "#22bb55", margin: "0 0 10px 0" }}>
            Kargonuz Teslim Edildi! 🎉
          </h2>

          <p>
            <span style={{ color: "#22bb55", fontWeight: 600 }}>{trackingNo}</span> takip numaralı gönderiniz,
            <b> {shippingCompany} </b>
            kargo tarafından başarıyla teslim edilmiştir.
          </p>
          <div style={{
            background: "#e8ffe8",
            padding: "10px 14px",
            borderRadius: 8,
            margin: "10px 0 16px 0",
            borderLeft: "4px solid #22bb55"
          }}>
            <b>Teslimat Tarihi:</b> {new Date().toLocaleDateString('tr-TR')}
          </div>
          <div style={{
            margin: "8px 0 12px 0",
            color: "white",
            fontWeight: 700
          }}>
            Ürününüzü iyi günlerde kullanmanızı dileriz!<br />
            <span style={{ color: "white", fontWeight: 600 }}>
              Teslimatla ilgili destek almak için bizimle iletişime geçebilirsiniz.
            </span>
          </div>
        </div>
      )
    }
  }
];
