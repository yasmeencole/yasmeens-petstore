import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"

export const AnimalList = (props) => {
  // This state changes when `getPets()` is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)

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
            {/* <div className="pets">
                {
                pets.map(pet => {
                    console.log({pets})
                    return (
                    <div className="pet" id={`pet--${pet.id}`}>
                        <div className="pet__name">
                        Name: { pet.name }
                        </div>
                        <div className="pet__breed">
                        Breed: { pet.breed }
                        </div>
                    </div>
                    )
                })
            }
            </div> */}
        <div className="animal_list">
            {/* <h1>My Animals</h1>

            <button onClick={() => history.push("/animals/create")}>
                Add Animal
            </button> */}

            <div className="animals">
                {animals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })}
            </div>
        </div>
        </>
    )
}