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
                                    <input type="text" placeholder=" AD" name="username" required/>
                                </div>

                                <div className="textbox_signSoyad">
                                    <input type="text" placeholder=" SOYAD" name="username" required/>
                                </div>
                   </div>
                                

                        <div className="textbox_email">
                            <input type="text" placeholder=" EMAİL" name="username" required/>
                        </div>
                        
                        <div className="textbox">
                            <input type="password" placeholder=" ŞİFRE" name="password" required/>
                        </div>
                        <input type="submit" className="btn" value="Giriş Yap"/>
                        <div className="signIn">
                            <p>Henüz hesabınız yok mu? </p>
                            <a href="https://www.w3schools.com/">Kayıt Ol</a>
                        </div>
                        <p style={{color:"white", marginTop:15}}>Şifremi Unuttum</p>
                </form>
               
            </div> 
            <squre className="circle1"/>
            <squre className="circle2"/>
      </div>
    );
  };
  
  export default SignPage;