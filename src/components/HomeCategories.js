import axios from "axios"

function HomeCategories(props) {
  console.log("props: ", props)

  const {setProductsByCategory, setThereAreProducts} = props

  const handleClick = (e) => {
      let API_URL = process.env.REACT_APP_API_URL
      //e.preventDefault()
      let categoryToSearch = e.target.id
      console.log ("category :", categoryToSearch)
      axios
        .get (API_URL+"/product/category/"+categoryToSearch)
        .then (response => {
          console.log ("productsByCategory :", response.data)
          setProductsByCategory (response);
          setThereAreProducts(true);
        })
  }


  return (
    <div className="home-scroll">
      <div className="gradient-left"></div>
      <div className="home-categories">

        <button onClick = {handleClick} id="assembly" className="categorie-container">
          <img id="assembly" src="./tool-icons/h-montaje.png" alt = "Herramientas de montaje"/>
          <h3 id="assembly">
            Assembly
            <br />
            tools
          </h3>
        </button>

        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-corte.png" alt = "Herramientas de corte" />
          <h3>
            Herramientas
            <br />
            de corte
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-golpe.png" alt = "Herramientas de golpe"/>
          <h3>
            Herramientas
            <br />
            de golpe
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-pintura.png" alt = "Herramientas de pintura" />
          <h3>
            Herramientas
            <br />
            de pintura
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-sugecion.png" alt = "Herramientas de sujección"/>
          <h3>
            Herramientas
            <br />
            de sujección
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-jardin.png" alt="Herramientas de jardín"/>
          <h3>
            Herramientas
            <br />
            de jardín
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-medicion.png" alt = "Herramientas de medicion"/>
          <h3>
            Herramientas
            <br />
            de medición
          </h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-aspiradora.png" alt = "Herramientas de aspiradora"/>
          <h3>Apiradoras</h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-escaleras.png" alt = "Herramientas de escaleras"/>
          <h3>Escaleras</h3>
        </a>
        <a href="/" className="categorie-container">
          <img src="./tool-icons/h-industrial.png" alt = "Herramientas de industrial"/>
          <h3>
            Herramientas
            <br />
            industriales
          </h3>
        </a>
      </div>
      <div className="gradient-right"></div>
    </div>
  );
}

export default HomeCategories;
