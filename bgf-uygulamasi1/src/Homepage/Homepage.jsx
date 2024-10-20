import Navbar from "./Navbar/Navbar";
import Homepage2 from "./Homepage2";
import HomeContainer from "./HomeContainer/HomeContainer";  

const Homepage = () => {
    return (
      <div>
        <Navbar />
      
        <div className="homeContainer">
          <Homepage2 />
           <HomeContainer />

        </div>
       
      </div>
    );
  };
  
  export default Homepage;