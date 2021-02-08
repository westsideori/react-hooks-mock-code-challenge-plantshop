import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, handleUpdate, handleDelete}) {

  const plantsList = plants.map((plant) => {
    return <PlantCard key={plant.id} plant={plant} handleUpdate={handleUpdate} handleDelete={handleDelete} />
  })

  return (
    <ul className="cards">{plantsList}</ul>
  );
}

export default PlantList;
