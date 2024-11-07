import "./LoginPage.css";

const LoginPage = () => {

    return (
      <div>
            <div className="box">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                <form className="inputPart">
                   <img src="./user (1).png" alt="user"/> 
                        <div className="textbox">
                            <input style={{width:250, height:35, fontSize:18}} type="text" placeholder=" Kullanıcı Adı" name="username" required/>
                        </div>
                        
                        <div className="textbox">
                            <input style={{width:250, height:35, fontSize:18}} type="password" placeholder=" Şifre" name="password" required/>
                        </div>
                        <input type="submit" className="btn" value="Giriş Yap"/>
                        <p className="signIn" >Henüz hesabınız yok mu? <a href="https://www.w3schools.com/">Kayıt Ol</a></p>
                        <p style={{color:"white", marginTop:15}}>Şifremi Unuttum</p>
                </form>
               
            </div> 
            <circle className="circle1"/>
            <circle className="circle2"/>
      </div>
    );
  };
  
  export default LoginPage;