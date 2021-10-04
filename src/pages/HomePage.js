import Carrusel from "../components/carrusel"
import HomeCategories from "../components/HomeCategories";

function HomePage() {
  
  return (
    <div className="home-page">
    <div className="top-home">
      <h1>What are you looking for?</h1>
    </div>
      <HomeCategories/>
        <Carrusel/> 
      <div className="info-home">
        <h1>Find a solution to bring your ideas to life or offer your tools to get the most out of them.</h1>
        <div>
          <img src="./how-it-works.png" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;