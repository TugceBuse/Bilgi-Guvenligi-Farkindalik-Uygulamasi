import "./LoginPage.css";

const LoginPage = () => {

    return (
      <div className="login_page">
            <div className="box">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                <form className="inputPart">
                   <img src="./user (1).png" alt="user"/> 
                        <div className="textbox">
                            <input type="text" placeholder=" Kullanıcı Adı" name="username" required/>
                        </div>
                        
                        <div className="textbox">
                            <input type="password" placeholder=" Şifre" name="password" required/>
                        </div>
                        <input type="submit" className="btn" value="Giriş Yap"/>
                        <div className="signIn">
                            <p>Henüz hesabınız yok mu? </p>
                            <a href="https://www.w3schools.com/">Kayıt Ol</a>
                        </div>
                        <p style={{color:"white", marginTop:15}}>Şifremi Unuttum</p>
                </form>
               
            </div> 
            <circle className="circle1"/>
            <circle className="circle2"/>
      </div>
    );
  };
  
  export default LoginPage;