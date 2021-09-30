import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function Carrusel() {

    return(
        <AwesomeSlider className="carrusel" animation="cubeAnimation">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </AwesomeSlider>)
}

export default Carrusel;