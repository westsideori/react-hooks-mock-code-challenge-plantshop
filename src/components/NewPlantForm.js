import React, {useState} from "react";

function NewPlantForm({handleAdd}) {

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0.00
  })

  const handleChange = (event) => {
    
    setFormData({...formData, [event.target.name]: event.target.value, price: parseFloat(event.target.value)})
  }

  console.log(formData)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPlant = formData

    fetch(`http://localhost:6001/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
      .then(resp => resp.json())
      .then((plantObj) => {
        handleAdd(plantObj)
      })
  }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
