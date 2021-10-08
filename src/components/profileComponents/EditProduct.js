import {useState} from "react";
import axios from "axios";
let API_URL = process.env.REACT_APP_API_URL


function EditProduct(props) {

    const oldProductInfo = props.product
    const productId = oldProductInfo._id

  const oldName = oldProductInfo.name
  const oldDescription = oldProductInfo.description
  const oldAmount = oldProductInfo.amount
  const oldCategory = oldProductInfo.category
  const oldAdquisitionYear = oldProductInfo.adquisitionYear
  const oldImageId = oldProductInfo.imageId
  
  const [name, setName] = useState(oldName);
  const [description, setDescription] = useState(oldDescription);
  const [amount, setAmount] = useState(oldAmount);
  const [category, setCategory] = useState(oldCategory);
  const [adquisitionYear, setAdquisitionYear] = useState(oldAdquisitionYear);
  const [imageId, setImageId] = useState(oldImageId)

  const fileInput = ""

  const[previewSource,setPreviewSource]= useState("")



  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
 
  const handleCategory = (e) => {setCategory(e.target.value)};
  const handleYearOfAcquisition = (e) => setAdquisitionYear(e.target.value);

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
      adquisitionYear: adquisitionYear,
    };

    

    axios.put(API_URL + `/product/${productId}`, objectToSubmit)
    .then((response) => {
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
          onChange={handleYearOfAcquisition}
        ></input>
        <button type="submit">Add</button>
      </form>

    </div>
  );
}

export default EditProduct;