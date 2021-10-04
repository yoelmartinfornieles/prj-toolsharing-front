import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function Carrusel() {

    return (
      <AwesomeSlider className="carrusel" animation="cubeAnimation">
        <div className="c1">
            <h1>A workshop with miles of tools.</h1>
            <img src="./photo2.jpg" />
        </div>
        <div className="c2">
            <h1>The right tool at the right time.</h1>
            <img src="./photo1.jpeg" />
        </div>
     
      </AwesomeSlider>
    );
}

export default Carrusel;