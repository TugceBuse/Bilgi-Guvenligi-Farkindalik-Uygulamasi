import { useGameContext } from '../Context';
import { useState } from 'react';

//Manuel ayarlanmış RansomwareButton compenent'i
const RansomwareButton = ({ label }) => {
  const { setIsransomware, setFile1 } = useGameContext();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setIsransomware(true);
      setFile1(true);
    }, 3000); // 3 saniye sonra indirme işlemi tamamlanır ve ransomware tetiklenir
  };

  return (
    <button onClick={handleDownload}>
      {label}
      {downloading && <div className="download-progress"></div>}
    </button>
  );
};

export const mails = [
    /* 1.Mail Content*/
  {Name:'IT Departmanı', from:'IT.Destek@globalbank-support.com',
  title: 'IT Departmanı', precontent: `-Hesabınız Geçici Olarak Askıya Alındı!`, read: false,
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Merhaba Onur,</b><br/><br/>
              Son yapılan sistem güncellemelerimiz sırasında hesabınızda güvenlik açığı tespit edilmiştir. 
              Bu nedenle hesabınız geçici olarak askıya alınmıştır. 
              Hesabınıza yeniden erişebilmeniz için aşağıdaki bağlantıdan giriş yaparak bilgilerinizi güncellemeniz gerekmektedir.<br/><br/>

              Bağlantı: <span style={{color:"orange", textDecoration: "underline", cursor:"pointer"}}>Hesabı Yeniden Etkinleştir!</span><br/><br/>
              
              Bu işlemi 24 saat içinde gerçekleştirmezseniz, hesabınız kalıcı olarak kapatılacaktır ve tüm verileriniz silinecektir.
              E-posta güvenliği politikamız gereğince, bu bağlantının gizliliğini koruyun ve kimseyle paylaşmayın.<br/><br/><br/>

              <b>Teşekkürler,<br/><br/>
              GlobalBank IT Destek Ekibi</b><br/>
              <b>E-posta:</b> <span style={{color:"orange", cursor:"pointer"}}>destek@globalbank.com</span><br/>
              <b>Telefon:</b> +90 212 555 0101
            </pre>
      </div>
    )
   },

   /* 2.Mail Content*/
   {Name:'UPS Kargo Şirketi', from:'info@shipmenttracker.com',
   title: 'UPS Kargo Şirketi', precontent: `-Paketiniz Teslim Edilemedi!`, read: false,
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Değerli Müşterimiz,</b><br/><br/>
              Sizin için hazırlanan gönderimizle ilgili bir teslimat sorunu oluştu. [Order #123456] numaralı siparişiniz teslim edilememiştir. 
              Bunun temel nedeni, adres bilgilerinizde eksiklik veya yanlışlık olabileceğidir.<br/><br/>

              Teslimat sürecinde yaşanan bu aksaklığı en kısa sürede çözmek ve paketinizi yeniden yönlendirebilmek için lütfen aşağıdaki bağlantıya tıklayarak adres bilgilerinizi doğrulayınız:<br/><br/>

              <span style={{color:"orange", textDecoration: "underline", cursor:"pointer"}}
              title='https://shipmenttracker.com/track/123456'
              >Paketimi Güncelle</span><br/><br/>
              
              Güncellenen bilgilerle paketinizin yeniden sevkiyatını gerçekleştirebiliriz. Eğer adres doğrulama işlemi gerçekleştirilmezse, gönderinizi teslim edemeyeceğimiz için siparişiniz otomatik olarak 3 iş günü içerisinde iade edilecektir.

              Siparişinizin durumu hakkında anlık bildirim almak ve kargo sürecinizi kesintisiz takip etmek için bilgilerinizi eksiksiz doldurduğunuzdan emin olun.<br/><br/>

              Eğer bu mesajı yanlışlıkla aldıysanız ya da başka bir konuda yardıma ihtiyaç duyuyorsanız, lütfen bizimle iletişime geçmekten çekinmeyin.<br/><br/>
              Gönderinizin güvenliği ve memnuniyetiniz bizim önceliğimizdir.<br/><br/><br/>

              <b>Teşekkürler,<br/><br/>
              Kargo Takip Ekibi</b><br/>
              <b>Info:</b> info@shipmenttracker.com<br/>
              <b>Info:</b> shipmenttracker.com
            </pre>
      </div>
    )
   },
        /* 3.Mail Content*/
   {Name:'Global Jobs', from:'hr@global-jobs.com',
   title: 'Global Jobs', precontent: `-Özel Bir İş Teklifimiz Var! Size Uygun Pozisyon Açıldı`, read: false, 
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Merhaba,</b><br/><br/>
              Profesyonel yetenekleriniz ve iş deneyimlerinizle ilgili profilinizi inceledik. Sizden etkilendiğimizi ve ekibimize katılmanızın bizim için büyük bir fırsat olacağını düşündük.<br/><br/>
              Şu anda sizin uzmanlık alanınıza uygun bir pozisyon için başvurunuzu kabul etmeye hazırız. Pozisyon, büyüme odaklı bir kariyer fırsatı sunarken, yeteneklerinizi en iyi şekilde kullanabileceğiniz bir ortam sağlamayı hedeflemektedir.<br/><br/>
              
              <b>Pozisyon Detayları:<br/><br/>
              <div className='dots' ></div> Pozisyon Adı:</b> Kıdemli Yazılım Uzmanı<br/>
              <div className='dots' ></div> <b>Lokasyon:</b> Uzaktan Çalışma / Hibrit Model<br/>
              <div className='dots' ></div> <b>Başlangıç Tarihi:</b> 01/12/2024<br/>
              <div className='dots' ></div> <b>Maaş Aralığı:</b> Pozisyonla ilgili detayları görmek için tıklayın.<br/><br/>
              Pozisyonla ilgili ayrıntıları incelemek ve başvuru işleminizi tamamlamak için lütfen aşağıdaki bağlantıya tıklayın:<br/><br/>

              <span style={{color:"orange", textDecoration: "underline", cursor:"pointer"}}
              title='https://global-jbos.com/track/#45%33'>
              Pozisyon Detaylarını Gör
              </span><br/><br/>
              
              Başvurunuzu tamamlamak için, lütfen ilgili formu doldurup özgeçmişinizi yükleyiniz. 
              Bu işlemi 48 saat içerisinde tamamlamanızı rica ediyoruz. 
              Sürecin sonunda, mülakat davetiyeniz tarafınıza gönderilecektir.<br/><br/>
              Sorularınız için bizimle <span style={{color:"orange", textDecoration: "underline"}}>
               hr@global-jobs.com
              </span> adresinden iletişime geçebilirsiniz.

              <b>Teşekkürler,<br/><br/>
              İnsan Kaynakları Departmanı<br/>
              Global Jobs</b><br/>
              global-jobs.com<br/>
            </pre>
      </div>
    )
   },

   /* 4.Mail Content*/
   {Name:'Trusted Platformu', from:'no-reply@trustedplatform.com',
   title: 'Trusted Platformu', precontent: `Üyeliğiniz Başarıyla Oluşturuldu!`, read: false,
    content: 
    (
      <div className="mail-content">
          <pre>
              <b>Merhaba Tuğçe,</b><br/><br/>
              Platformumuza hoş geldiniz! Üyeliğiniz başarıyla oluşturuldu. 
              Hesabınızı hemen kullanmaya başlayabilirsiniz.<br/><br/>

              Güvenliğinizi sağlamak için bir sonraki adımda hesabınızı doğrulamanız gerekiyor. Aşağıdaki bağlantıya tıklayarak işlemi kolayca gerçekleştirebilirsiniz:<br/><br/>

              <button className="verify-button"
              title='https://trustedplatform.com/track/123456'
              >Hesabımı Doğrula</button><br/><br/>
              
              Eğer bu işlemi siz başlatmadıysanız veya herhangi bir sorunla karşılaşırsanız, bizimle hemen iletişime geçebilirsiniz.<br/><br/><br/>

              <b>Teşekkürler,<br/><br/>
              Trusted Platform Ekibi</b><br/>
            </pre>
      </div>
    )
   },

   /* 5.Mail Content*/
   {Name:'Ahmet Karaköse', from:'aht-krkse@gmail.com',
    title: 'Ahmet Karaköse', precontent: `Üyeliğiniz Başarıyla Oluşturuldu!`, read: false,
     content: 
     (
       <div className="mail-content">
          <div className="attachments">
              <ul>
                <li>
                <RansomwareButton label='file1.pdf' />
                </li>

                <li>
                <RansomwareButton label='file2.docx' />
                </li>

                <li>
                  <button onClick={() => null}>File3.jpg</button>
                </li>

              </ul>
          </div>
          <pre>
                Selam Onur! Anlaştığımız gibi istediğin işlemi tamamladım. Dosyalar Ektee!<br/><br/>
                <b>İyi çalışmalar.</b><br/><br/>
          </pre>
       </div>
     )
    },
  ];


  
  export const sentMails = [
    {
      Name: 'John Doe',
      from: 'me@myemail.com',
      title: 'Meeting Reminder',
      precontent: 'Reminder: Meeting at 3 PM',
      content: (
        <div className="mail-content">
          <pre>
            <b>Hi John,</b><br/><br/>
            This is a reminder for our meeting scheduled at 3 PM today. Please make sure to join on time.<br/><br/>
            Best regards,<br/>
            Your Name
          </pre>
        </div>
      )
    }
  ];
         
