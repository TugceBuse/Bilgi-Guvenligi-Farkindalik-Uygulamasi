import React from "react";
import WorkSpaceModel from "./WorkSpaceModel";
import "./homeContainer.css";

const HomeContainer = () => {
  return (
      <div className="moving-background">
        {/* Bilgilendirme Kısmı */}
        <div className="FirstPart">
            <div className="circle"></div>
            <div className="line"></div>

          <div style={{display:"flex", flexDirection:"column"}}>
            <h1>Hoş Geldiniz!</h1>
            <h3>Bu simülasyon, bilgi güvenliği farkındalığınızı artırmak, </h3> 

            <div style={{display:"flex", flexDirection:"column"}}>
              <h3>olası siber saldırılara karşı sizi hazırlamak amacıyla tasarlanmıştır. </h3>
              <h3>Çalışma ortamında karşılaşabileceğiniz tehditler ve </h3>
              <h3>hatalarla ilgili çeşitli senaryolarla kendinizi test edebilir, doğru güvenlik alışkanlıkları kazanabilirsiniz.</h3>
              <h4>Başlamak için aşağıdaki “Simülasyonu Başlat” butonuna tıklayınız.</h4>
            </div>
          </div>
      </div>
      
      {/* Model */}
      <WorkSpaceModel />
   </div>
  );
};

export default HomeContainer;