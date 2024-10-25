import React from "react";
import WorkSpaceModel from "./WorkSpaceModel";
import "./homeContainer.css";

const HomeContainer = () => {
  return (
   <div className="moving-background">
        
        <div className="FirstPart">
            <div className="circle">
            <div className="line">
            
            </div>
              
            </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                          <h1>Merhaba,</h1>
                          <h2>Güzel Bir Deneyime Hoşgeldin!</h2> 

                          <div style={{display:"flex", flexDirection:"column"}}>
                          <h3>Başlayacağın simülasyon oyunu oltalama saldırılarına karşı seni hazırlayacak, </h3>
                          <h3>bilgilerini koruman adına aktiviteler yapmanı sağlayacak.</h3>
                          <h4>Peki Sen Buna Hazır Mısın?</h4>
                          </div>
                    </div>

        </div>


       
        
         
     
      <WorkSpaceModel />
      
   </div>
   
  );
};

export default HomeContainer;