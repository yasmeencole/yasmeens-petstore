import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';



export const AnimalList = (props) => {
  // This state changes when `getPets()` is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)
    const history = useHistory()


    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("AnimalList: useEffect - getAnimals")
        getAnimals()
    }, [])


    return (
        <>
            <header className="animals__header">
                <h1>Animals</h1>
            </header>
        <div className="animal_list">
            <h1>My Animals</h1>

            <Button className="createAnimalButtom" onClick={() => history.push("/animals/create")}>New Animal</Button>

            <div className="animals">
                {animals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })}
            </div>
        </div>
        </>
    )
}