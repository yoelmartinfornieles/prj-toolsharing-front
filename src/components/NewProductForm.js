import { useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function NewProductForm(props) {
  const actualYear = new Date().getFullYear()
  //let history = useHistory()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("assembly");
  const [adquisitionYear, setAdquisitionYear] = useState(actualYear);
  const [imageId, setImageId] = useState("")

  const [isCheck, setIsCheck] = useState(false)
  const [isImgErr, setIsImgErr] = useState(false)


  const [letters, setLetters] = useState(0)


  let history = useHistory()

  //const[fileInput,setFileInput]= useState("")
  const fileInput = ""

  const[previewSource,setPreviewSource]= useState("")

  /* ------Logged User ----- */

  const { user } = useContext(AuthContext);
	/* const [userInfo, setUserInfo] = useState ("") */
	let API_URL = process.env.REACT_APP_API_URL
	let userId = user._id

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => {
    setDescription(e.target.value)
    let text = e.target.value
    setLetters(text.length)

    
  };
  const handleAmount = (e) => setAmount(e.target.value);
 
  const handleCategory = (e) => {setCategory(e.target.value)};
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
    if(!previewSource) return;
   uploadImage(previewSource)
}

const uploadImage = async (base64EncodedImage) => {

try {
    const res = await fetch(API_URL+"/upload", {
        method: "POST",
        body: JSON.stringify({data: base64EncodedImage}),
        headers: {"Content-type": "application/json"}
    })
    const data = await res.json()
    setImageId(data.response)
    setIsCheck(true)
    setIsImgErr(false)

} catch (err){
    console.error(err)
    setIsImgErr(true)
}

}

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
    })
    .catch(error => console.log("error: ", error))
    
  }

  //description word counter

  
  return (

    <div className="new-product-form">
      {!isCheck &&
      <div>
          <form className="new-product-form-photo" onSubmit={handleSubmitImage} >
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

        }
        {isCheck &&
          <div className="upload-succes">
          <h4> Upload successful</h4>
          </div>
        }
        {isImgErr &&
          <div className="img-error">
          <h4>Not valid image</h4>
          </div>
        }
      <form  className="new-product-form-text"onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" required maxLength="25"value={name} onChange={handleName}></input>
        <label>Description:</label>
        <textarea
          required
          maxLength="200"
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
        ></textarea>
        <h3>Letters left: {200-letters}</h3>
        <label>Amount:</label>
        <input
          required
          type="number"
          name="amount"
          value={amount}
          onChange={handleAmount}
        ></input>


        <label>Category:</label>
        <select
          required
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
          required
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
