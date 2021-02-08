import React, { useState } from "react";

function PlantCard({plant, handleUpdate, handleDelete}) {

  const [inStock, setInStock] = useState(true)
  const [editing, setEditing] = useState(false)
  const [updatedPrice, setUpdatedPrice] = useState(plant.price)

  const toggleStock = () => {
    setInStock(!inStock)
  }

  const toggleEdit = () => {
    setEditing(true)
  }

  const savePlant = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({price: updatedPrice})
    })
      .then(resp => resp.json())
      .then((updatedPlant) => handleUpdate(updatedPlant))
    setEditing(false)
  }

  const deletePlant = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
      .then(handleDelete(plant.id))
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {editing ? <input type="number" step="0.01" placeholder={plant.price} value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} /> : <p>Price: {plant.price}</p>}
      {inStock ? (
        <button className="primary" onClick={toggleStock}>In Stock</button>
      ) : (
        <button onClick={toggleStock}>Out of Stock</button>
      )}
      {editing ? <button onClick={savePlant}>Save</button> : <button onClick={toggleEdit}>Edit</button>}
      <button onClick={deletePlant}>Delete</button>
    </li>
  );
}

export default PlantCard;
