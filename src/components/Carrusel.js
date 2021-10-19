
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
 
const AutoplaySlider = withAutoplay(AwesomeSlider);

function Carrusel() {

    return (
      <AutoplaySlider 
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      className="carrusel">
        <div className="c1">
            <h1>A workshop with miles of tools.</h1>
            <img src="./photo2.jpg" alt="carrusel 1"/>
        </div>
        <div className="c2">
            <h1>The right tool at the right time.</h1>
            <img src="./photo1.jpeg" alt="carrusel 2"/>
        </div>
      </AutoplaySlider>
    );
}






export default Carrusel;
