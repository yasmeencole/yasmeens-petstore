import React, { useState } from "react"

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext()

// This component establishes what data can be used.
export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals")
        .then(response => response.json())
        .then(setAnimals)
    }

    const createAnimal = (animalObj) => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(response => response.json())
    }

    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}`)
            .then(response => response.json())
    }

    const deleteAnimals = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
        .then(getAnimals)
    }

    const updateAnimals = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals)
        }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `createAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, createAnimal, getAnimalById, deleteAnimals, updateAnimals
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}