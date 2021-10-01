import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetailsPage (props) {
  const [product, setProduct] = useState(null)
  const {id} = useParams()
  console.log ("id: ", id)

  useEffect(() => {

    axios
      .get (API_URL+"/product/"+id)
      .then (response => {
        setProduct (response.data)
        console.log ("product: ", product)
      }
    ) 
  }, 
  [])

  if (product) {
  
  return (
    <>
      <p>{product.name}</p>
      <p>{product.reviews[0]}</p>
    </>
  )
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