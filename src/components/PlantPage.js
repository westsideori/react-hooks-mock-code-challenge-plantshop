import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
      .then(resp => resp.json())
      .then((plantArray) => {
        setPlants(plantArray)
        console.log(plantArray)
      })
  }, [])

  const handleAdd = (formData) => {
    setPlants([...plants, formData])
  }

  const handleUpdate = (updatedPlant) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })

    setPlants(updatedPlants)
  }

  const handleDelete = (id) => {
    const updatedPlants = plants.filter((plant) => {
      return plant.id !== id
    })

    setPlants(updatedPlants)
  }

  const filteredPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm handleAdd={handleAdd} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={filteredPlants} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </main>
  );
}

export default PlantPage;
