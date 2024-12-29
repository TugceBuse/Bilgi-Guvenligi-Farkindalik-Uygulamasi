import "./SignPage.css";

const SignPage = () => {

    return (
      <div className="sign_page">
            <div className="box2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                <form className="inputPart2">
                   <img src="./user (1).png" alt="user"/> 
                   <div className="textbox2">
                        <div className="textbox_signAd">
                            <input type="text" placeholder=" AD" name="ad" required/>
                        </div>

                        <div className="textbox_signSoyad">
                            <input type="text" placeholder=" SOYAD" name="soyad" required/>
                        </div>

                        <div className="textbox_signkullanıcıAdı">  
                            <input type="text" placeholder=" KULLANICI ADI" name="kullanıcıAdı" required/>
                        </div>
     
                        <div className="textbox_email">
                            <input type="text" placeholder=" EMAİL" name="email" required/>
                        </div>
                        
                        <div className="pswd">
                            <input type="password" placeholder=" ŞİFRE" name="password" required/>
                        </div>
                    </div>
                    <input type="submit" className="btn" value="Kayıt Ol"/>
                </form>
               
            </div> 
            <squre className="circle1"/>
            <squre className="circle2"/>
      </div>
    );
  };
  
  export default SignPage;