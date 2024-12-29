import React, { useState, useRef } from 'react';
import './Setup.css';
import { MakeDraggable } from '../../utils/Draggable';
import { useUIContext } from '../../Contexts/UIContext';
import { useGameContext } from '../../Contexts/GameContext';

export const useSetup = () => {
    const { toggleWindow } = useUIContext();
    

    const openHandler = () => {
        toggleWindow('setup');
    };
    
    const closeHandler = () => {
        toggleWindow('setup');
    };
    
    return { openHandler, closeHandler };
    }

const Setup = ({ closeHandler, updateDownloadedStatus }) => {

    const SetupRef = useRef(null);


    const [step, setStep] = useState(1);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleNextStep = () => {
      setStep(step + 1);
    };
    const handleFinish = () => {
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false); 
            setStep(step + 1);
            updateDownloadedStatus('antivirus', true);
        }, 5000);
       
    };
    const handlePreviousStep = () => {
      setStep(step - 1);
    };

    return (
    <div className="setup-overlay">
        <div className="setup-window"  ref={SetupRef}>
            <div className="setup-header">
                <div className="setup-header-left">
                    <img className='setup-img' src="/icons/setting.png" alt="Setup" />
                    <h2>Setup</h2>
                </div>
                <button className="setup-close" onClick={closeHandler}>×</button>
            </div>

            <div className="setup-content">
                <div className='setup-content-left'></div>
                <div className="setup-container">
                    <h3>Antivirüs Kurulumu</h3>
                    {step === 1 && (
                        <div className="setup-step">
                        <h4>Adım 1: Lisans Sözleşmesi</h4>
                        <p>Lisans sözleşmesini okuyun ve kabul edin.</p>
                        <textarea 
                        style={{color: "white", backgroundColor:"#1a2837", height:150}} readOnly value="Lütfen dikkatlice okuyunuz:
                        Bu yazılımı yüklemeden veya kullanmadan önce aşağıdaki lisans sözleşmesini dikkatlice okumanız gerekmektedir. Antivirüs programını yükleyerek veya kullanarak, bu sözleşme hükümlerini kabul ettiğinizi onaylıyorsunuz. Eğer bu şartları kabul etmiyorsanız, lütfen yükleme işlemini sonlandırın ve yazılımı kullanmayın.

                        1. Lisansın Kapsamı
                        Bu lisans, yazılımın yalnızca kişisel ve ticari olmayan kullanım için bir kopyasının yüklenmesi ve çalıştırılması hakkını verir. Yazılımın hiçbir kısmı, önceden izin alınmaksızın kopyalanamaz, değiştirilemez veya dağıtılamaz.

                        2. Kullanıcı Sorumlulukları
                        Kullanıcı, yazılımın yalnızca yasal amaçlarla kullanılacağından emin olmalıdır.
                        Yazılım, kötüye kullanım veya izinsiz erişim için kullanılamaz.
                        Kullanıcı, yazılımı kullandığı cihazın güvenliğini sağlamakla sorumludur.
                        3. Kısıtlamalar
                        Yazılımın tersine mühendisliği, kaynak koda dönüştürülmesi, değiştirilmesi veya yeniden dağıtılması yasaktır.
                        Lisans, yazılımın birden fazla cihazda izinsiz olarak kullanılmasını kapsamamaktadır.
                        4. Veri Toplama ve Gizlilik
                        Yazılım, yalnızca kullanıcı deneyimini geliştirmek amacıyla anonim veriler toplayabilir. Toplanan veriler hiçbir şekilde üçüncü taraflarla paylaşılmayacaktır.

                        5. Garanti ve Sorumluluk Sınırlamaları
                        Bu yazılım, olduğu gibi ve mevcut haliyle sunulmaktadır. Yazılım sağlayıcısı, yazılımın hatasız, kesintisiz çalışacağını veya belirli bir amaca uygun olacağını garanti etmez. Sağlayıcı, yazılımın kullanımından kaynaklanabilecek herhangi bir zarardan sorumlu tutulamaz.

                        6. Lisans İptali
                        Kullanıcı, bu sözleşme koşullarını ihlal ettiği takdirde, lisans otomatik olarak iptal edilir. Lisans iptali durumunda kullanıcı, yazılımı tüm cihazlardan kaldırmayı ve kullanımı durdurmayı kabul eder.

                        7. Güncellemeler ve Destek
                        Bu yazılım düzenli olarak güncellenebilir. Güncellemeler, mevcut lisansınız kapsamında sunulacaktır. Ancak, belirli özellikler için ek lisans veya ücret talep edilebilir.

                        8. Yasal Hükümler
                        Bu sözleşme, yazılım sağlayıcısının bulunduğu ülke yasalarına tabidir. Uyuşmazlık durumunda, anlaşmazlıklar [Belirli Bir Şehir veya Mahkeme] yargı yetkisine tabi olacaktır.

                        Kabul Ediyorum
                        Kullanıcı olarak bu sözleşmenin şartlarını kabul ettiğinizi onaylıyorsunuz." />
                        <div className="setup-buttons">
                            <button onClick={handleNextStep}>Kabul Ediyorum</button>
                        </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="setup-step">
                        <h4>Adım 2: Kurulum Yeri Seçimi</h4>
                        <p>Antivirüs uygulamasının kurulum yeri:</p>
                        <div style={{width:300, height:40, fontSize:13, backgroundColor:"#1a2837", color:"white", alignContent:"center"}}>
                        C:\Users\AppData\Local\Programs\ShieldSecure</div>
                        <div className="setup-buttons">
                            <button onClick={handlePreviousStep}>Geri</button>
                            <button onClick={handleNextStep}>İleri</button>
                        </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="setup-step">
                        <h4>Adım 3: Kurulum</h4>
                        <p>Kurulumu başlatmak için butona tıklayın.</p>
                        <div className="setup-buttons">
                            <button onClick={handlePreviousStep}>Geri</button>
                            <button className="download-button" onClick={handleFinish} disabled={buttonLoading} >Kurulumu Başlat</button>
                        </div>
                        {buttonLoading ? <div className="progress-bar2">
                            Kuruluyor...
                                <div>
                                    <img src="/icons/setting1.png" alt="Setup"/>
                                    <img src="/icons/setting2.png" alt="Setup"/>
                                    <img src="/icons/setting3.png" alt="Setup"/>
                                </div>
                                
                            </div> : ''}
                        </div>
                    )}
                    {step === 4 && (
                        <div className="setup-step">
                        <h4>Kurulum Tamamlandı</h4>
                        <p>Antivirüs uygulaması başarıyla kuruldu.</p>
                        <div className="setup-buttons">
                            <button onClick={closeHandler}>Tamam</button>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );

}

export default Setup;