import { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function NewProductForm(props) {
  //let history = useHistory()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("assembly");
  const [adquisitionYear, setAdquisitionYear] = useState(0);
  const [imageId, setImageId] = useState("")

  let history = useHistory()

  //const[fileInput,setFileInput]= useState("")
  const fileInput = ""

  const[previewSource,setPreviewSource]= useState("")

  /* ------Logged User ----- */

  const { user } = useContext(AuthContext);
	/* const [userInfo, setUserInfo] = useState ("") */
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  console.log('this is the current user:', userId)

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
 
  const handleCategory = (e) => {setCategory(e.target.value)
  console.log("category", category)};
  const handleAdquisitionYear = (e) => setAdquisitionYear(e.target.value);

  /* ----- Image ------ */
  const handleFileChange =(e)=>{
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=() =>{
        setPreviewSource(reader.result)
    }
  }

  const handleSubmitImage = (e) => {

    e.preventDefault()
    console.log("image send")
    if(!previewSource) return;
   uploadImage(previewSource)
}

const uploadImage = async (base64EncodedImage) => {

  console.log("image uploaded")
try {
    const res = await fetch(API_URL+"/upload", {
        method: "POST",
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {"Content-type": "application/json"}
    })
    const data = await res.json()
    console.log(data.response)
    setImageId(data.response)

} catch (err){
    console.error(err)
}

}

  /* ------Logged User ----- */

 /*  useEffect(() => {
		console.log("useEffect")
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			setUserInfo(response.data)
    
		 }
		)
	},  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
	/* []) */


  /* Add product ID to user & user ID to product */


  const handleSubmit = (e) => {
    e.preventDefault();

    let objectToSubmit = {
      name: name,
      description: description,
      amount: amount,
      photo:imageId,
      category: category,
      adquisitionYear: adquisitionYear,
      owner: userId
    };

   axios
    .post(API_URL + "/product", objectToSubmit)
    .then((response) => {
      history.push("/profile")
      console.log("creado")
      /* productId = response.data._id
      updatedUser = JSON.parse(JSON.stringify(userInfo))
      updatedUser.products.push(productId) */
    })
    .catch(error => console.log("error: ", error))

    /* Promise.all([p1])
    .then(response => {
      axios.put((API_URL + `/user/${userInfo._id}`), updatedUser)
        .then((response) => {
          console.log("RESPONSE: " , response.data)
          setUserInfo(response.data)})
        .catch((error) => {console.log("error", error)})
    }) */
    
  }
  
  return (

    <div>
      <div>
          <form onSubmit={handleSubmitImage} >
            <input multiple 
              type="file"
              name="image" 
              onChange={handleFileChange} 
              value={fileInput} />
              <button type="submit">Select Photo</button>
          </form>
          {previewSource && (
            <img src={previewSource} alt=""/>
            )}
      </div>


      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName}></input>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
        ></input>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={handleAmount}
        ></input>


        <label>Category:</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleCategory}
        >

          <option value="assembly">Assembly Tools</option>
          <option value="cutting">Cutting Tools</option>
          <option value="hammering">Hammering Tools</option>
          <option value="painting">Painting Tools</option>
          <option value="clamping">Clamping Tools</option>
          <option value="gardening">Gardering Tools</option>
          <option value="measuring">Measuring Tools</option>
          <option value="vacuum cleaners">Vacuum cleaners</option>
          <option value="stairs">Stairs</option>
          <option value="industrial">Industrial Tools</option>

        </select>
        <label>Year of acquisition:</label>
        <input
          type="number"
          name="YearOfAcquisition"
          value={adquisitionYear}
          onChange={handleAdquisitionYear}
        ></input>
        <button type="submit">Add</button>
      </form>

    </div>
  );
}

export default NewProductForm;
