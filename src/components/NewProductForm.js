import { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/auth.context";
const API_URL = process.env.REACT_APP_API_URL;

function NewProductForm(props) {
  //let history = useHistory()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState([]);
  const [yearOfAcquisition, setYearOfAcquisition] = useState(0);
  const [imageId, setImageId] = useState("")

  //const[fileInput,setFileInput]= useState("")
  const fileInput = ""

  const[previewSource,setPreviewSource]= useState("")

  /* ------Logged User ----- */

  const { isLoggedIn, user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState ("")
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  console.log('this is the current user:', userId)

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
 
  const handleCategory = (e) => setCategory(e.target.value);
  const handleYearOfAcquisition = (e) => setYearOfAcquisition(e.target.value);

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

  useEffect(() => {
		console.log("useEffect")
		axios
		 .get (API_URL+"/user/"+userId)
		 .then ((response)=> {
			setUserInfo(response.data)
    
		 }
		)
	}, 
	[])


  /* Add product ID to user & user ID to product */


  const handleSubmit = (e) => {
    e.preventDefault();

    let objectToSubmit = {
      name: name,
      description: description,
      amount: amount,
      photo:imageId,
      category: category,
      yearOfAcquisition: yearOfAcquisition,
      ownerId: userId
    };

    let productId
    let updatedUser

    let p1 = axios.post(API_URL + "/product", objectToSubmit)
    .then((response) => {

      productId = response.data._id
      updatedUser = JSON.parse(JSON.stringify(userInfo))
      updatedUser.products.push(productId)
    })

    Promise.all([p1])
    .then(response => {
      axios.put((API_URL + `/user/${userInfo._id}`), updatedUser)
        .then((response) => {
          console.log("RESPONSE: " , response.data)
          setUserInfo(response.data)})
        .catch((error) => {console.log("error", error)})
    })
    
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

          <option value="handTools">Hand tools</option>
          <option value="portableElectricTools">Portable electric tools</option>
          <option value="workBench">Work Bench</option>

        </select>
        <label>Year of acquisition:</label>
        <input
          type="number"
          name="YearOfAcquisition"
          value={yearOfAcquisition}
          onChange={handleYearOfAcquisition}
        ></input>
        <button type="submit">Add</button>
      </form>

    </div>
  );
}

export default NewProductForm;
