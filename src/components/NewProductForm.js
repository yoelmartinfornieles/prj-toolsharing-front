import { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function NewProductForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState([]);
  const [yearOfAcquisition, setYearOfAcquisition] = useState(0);

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  const handlePhoto = (e) => setPhoto(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleYearOfAcquisition = (e) => setYearOfAcquisition(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    let objectToSubmit = {
      name: name,
      description: description,
      amount: amount,
      photo: photo,
      category: category,
      yearOfAcquisition: yearOfAcquisition,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/new-product`, objectToSubmit, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        console.log(result);
        props.history(`/product/${result.data._id}`)
      });
  };

  return (
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
      <label>Photo:</label>
      <input
        type="text"
        name="photo"
        value={photo}
        onChange={handlePhoto}
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
  );
}

export default NewProductForm;
