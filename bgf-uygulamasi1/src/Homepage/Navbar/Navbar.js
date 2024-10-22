import { useNavigate } from "react-router-dom";
import "./navbar.css"


const Navbar = () =>
{
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/game");
      };

    return (
    
    <div> 
        <nav className="navbar">
         
             <img
                  className="logo"
                  src="/logo.png"
                  alt="Farkindalik Uygulamasi"
                  onClick={handleLogoClick}
        ></img>
         <h1 className="h1">SafeClicks</h1>

            <div className="rightPart">
                <a href="https://www.w3schools.com/" className="a">Hakkında</a>
                <a href="about.html" className="a">İletişim</a>
                <a href="about.html" className="a">Görüşler</a>
            </div>

            
        </nav>
    </div>

    );
}
export default Navbar;