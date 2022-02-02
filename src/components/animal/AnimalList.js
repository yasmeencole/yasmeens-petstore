import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';



export const AnimalList = (props) => {
  // This state changes when `getPets()` is invoked below
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

    const [ filteredAnimals, setFiltered ] = useState([])

    const history = useHistory()


    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("AnimalList: useEffect - getAnimals")
        getAnimals()
    }, [])

      // useEffect dependency array with dependencies - will run if dependency changes (state)
      // searchTerms will cause a change
    useEffect(() => {
        if (searchTerms !== "") {
        // If the search field is not blank, display matching animals
        const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
        setFiltered(subset)
        } else {
        // If the search field is blank, display all animals
        setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (
        <>
            {/* <header className="animals__header">
                <h1>Animals</h1>
            </header> */}
        <div className="animal_list">
            <h1 className="animalList__Title">The Petstore's Animals</h1>

            <div className="d-flex justify-content-center">

            <Button className="createAnimalButtom" onClick={() => history.push("/animals/create")}>New Animal</Button>
            </div>

            <div className="animals">
                {filteredAnimals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })}
            </div>
        </div>
        </>
    )
}