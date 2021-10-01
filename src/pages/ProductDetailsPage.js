import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FavButton from '../components/FavButton'

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetailsPage (props) {
  const [product, setProduct] = useState(null)
  const [isFav, setIsFav] = useState(false)
  const {id} = useParams()
  console.log ("id: ", id)
  console.log('is fav??',isFav)
  
//-----IF-IS---LOG------
  const { isLoggedIn, user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState ("")
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  console.log('this is the current user:', userId)



	useEffect(() => {
		console.log("useEffect")
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			console.log ("response111: ", response.data.favorites)
			setUserInfo(response)
      if(response.data.favorites.includes(id)){
        setIsFav(true)
        console.log('lo tengo!')
      }
		 }
		)
	}, 
	[])
//--------------------------


  useEffect(() => {

    axios
      .get (API_URL+"/product/"+id)
      .then (response => {
        setProduct (response.data)
        console.log ("product: ", response.data)
      }
    ) 
  }, 
  [])

  const handleSubmitFav = (e) => {
    e.preventDefault()
     
    axios
      .post (API_URL+"/fav/"+id, {userId})
      .then (response => {
        setIsFav(true)

        console.log("product Fav: ", response.data)
      }
    ) 

  }

  const handleSubmitDeleteFav = (e) => {
    e.preventDefault()
     
    axios
      .put (API_URL+"/fav/"+id, {userId})
      .then (response => {
        setIsFav(false)

        console.log("product delete Fav: ", response.data)
      }
    ) 

  }
  
  if (product) {
  
  return (
    <>
        <FavButton handleSubmitFav={handleSubmitFav} handleSubmitDeleteFav={handleSubmitDeleteFav} isFav={isFav}/>
    

      <p>{product.name}</p>
      <p>{product.reviews[0]}</p>
    </>
  );
  }

  else {
    return (
      <p>tunsfisch</p>
    )
  }
}

export default ProductDetailsPage;

/* const [project, setProject] = useState(null);
const projectId = props.match.params.id;


const getProject = () => {
  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

  // Send the token through the request "Authorization" Headers
  axios
    .get(
      `${API_URL}/projects/${projectId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const oneProject = response.data;
      setProject(oneProject);
    })
    .catch((error) => console.log(error));
};


useEffect(()=> {
  getProject();
}, [] );


return (
  <div className="ProjectDetails">
    {project && (
      <>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </>
    )}

    
    <AddTask refreshProject={getProject} projectId={projectId} />          

    { project && project.tasks.map((task) => <TaskCard key={task._id} {...task} /> )} 

    <Link to="/projects">
      <button>Back to projects</button>
    </Link>
        
    <Link to={`/projects/edit/${projectId}`}>
      <button>Edit Project</button>
    </Link>
    
  </div>
);
} */