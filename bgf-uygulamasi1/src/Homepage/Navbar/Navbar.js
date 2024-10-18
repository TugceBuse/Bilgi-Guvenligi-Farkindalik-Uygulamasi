import { useNavigate } from "react-router-dom";
import "./navbar.css"


const Navbar = () =>
{
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/desktop");
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
      
       
        </nav>
    </div>

    );
}
export default Navbar;