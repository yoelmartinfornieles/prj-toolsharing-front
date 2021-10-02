import { useState } from "react";
//import {useHistory} from "react-router-dom"
import axios from "axios";
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

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
 
  const handleCategory = (e) => setCategory(e.target.value);
  const handleYearOfAcquisition = (e) => setYearOfAcquisition(e.target.value);


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









  const handleSubmit = (e) => {
    e.preventDefault();

    let objectToSubmit = {
      name: name,
      description: description,
      amount: amount,
      photo:imageId,
      category: category,
      yearOfAcquisition: yearOfAcquisition,
    };

    axios.post(API_URL + "/product", objectToSubmit)
    .then(response => console.log(response))




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
