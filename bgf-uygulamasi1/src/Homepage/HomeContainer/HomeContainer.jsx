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

                  <h1>Merhaba,</h1>
                  <h2>Güzel Bir Deneyim Yaşamaya Hazır Mısın?</h2>

            

        </div>
         
     
      <WorkSpaceModel />
      
   </div>
   
  );
};

export default HomeContainer;