import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export const AnimalList = (props) => {
    /* AnimalContext is imported from provider component so that the useContext hook allows you to use 
    data structures and functions that a parent provider component exposes.*/

    // This state changes when `getAnimals()` is invoked below
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    // child components of AnimalContext.Provider { animals, getAnimals, searchTerms }

    // filteredAnimals is the current state and setFilter is the function that allows you to update the state. useState([]) is default value is an empty array
    // everytime the state is updated the component will re-render
    const [ filteredAnimals, setFiltered ] = useState([])

    // useHistory is provided by react-router-dom. It contains a push() method which we can use to change the URL. 
    // useHistory tells React which route we want to visit.
    const history = useHistory()


    // /* useEffect hook allows the component to reach out for anything that cannot be handled during render. 
    // In this case, it is the API call for the animals.*/

    /* After the return, useEffect is automatically invoked and since the dependency array is empty, 
    it only runs the first time the component renders.*/
    useEffect(() => {
        console.log("AnimalList: useEffect - getAnimals")
        getAnimals()
    }, [])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    // what the user types into a search field is considered state
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
        <div className="animal_list">
            <h1 className="animalList__Title">The Petstore's Animals</h1>

            <div className="d-flex justify-content-center">
        
            {/* when New Animal button is clicked users are rerouted to http://localhost:8088/animals/create  */}
            {/* onClick is an event listener on the button's onClick attribute */}
            {/* push() method adds new items to the end of an array. */}
            {/* history tells react which route we want to push the created animals to */}
            <Button className="createAnimalButtom" onClick={() => history.push("/animals/create")}>New Animal</Button>
            </div>

            <div className="animals">
            {/* .map() array method is used to iterate the array of animals and generate HTML for 
            each one by invoking the Animal component function.
        
            this pulls in list of animals to map through and returns an object */}
                {filteredAnimals.map(animal => {
                // "key" and "animal" are properties on an object that gets passed as an argument
                // key={{animal.id} === is equal to filteredAnimals which is a list of animals
                // animal={animal} === is re-naming one individual animal objects from filteredAnimals 
                // this return is passing in the Animal.js componet.  
                    return <Animal key={animal.id} animal={animal} />
                })}
            </div>
        </div>
        </>
    )
}