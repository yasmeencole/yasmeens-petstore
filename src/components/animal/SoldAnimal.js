import React, { useContext, useEffect, useState }  from "react"
import { AnimalContext } from "./AnimalProvider" 
import "./Animal"
import { Animal } from "./Animal"


export const SoldAnimal = () =>{
    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    
    /* AnimalContext is imported from provider component so that the useContext hook allows you to use 
    data structures and functions that a parent provider component exposes.*/
    
    // This state changes when `getAnimals()` is invoked below
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    // child components of AnimalContext.Provider { animals, getAnimals, searchTerms }


    // filteredAnimals is the current state and setFilter is the function that allows you to update the state. useState([]) is default value is an empty array
    // everytime the state is updated the component will re-render
    const [ filteredAnimals, setFiltered ] = useState([])

    // /* here we are using the useEffect hook so that the component can reach out
    // to the API to call the animals since that was not handled during render.*/
    useEffect(() => {
        getAnimals()
        console.log(animals, "animal")
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
<section>
    <h2 className="sold__AnimalsTitle">Sold Animals</h2>

    <div className="animals">
    {
        /* .map() is a method that calls a provided call back function once for each element in the array in order to construct 
        a new array from the results. Each time the callback excutes the returned value is executed.
        */

        /* maps through list of animals(filteredAnimals) and determines if the animal is avaiable or sold. If the statusId === 2(if the statusId is equal
        to 2) the animal has been sold and a copy of the animal will be sent to the sold animals component. */

        // this pulls in the list of animals to map through and returns an object */}

        filteredAnimals.map(animal => {
            if (animal.statusId === 2)

        // "key" and "animal" are properties on an object that gets passed as an argument
        // key={{animal.id} === is equal to filteredAnimals which is a list of animals
        // animal={animal} === is re-naming one individual animal objects from filteredAnimals 
        // this return is passing in the Animal.js componet.  
        return <Animal key={animal.id} animal={animal} />
    })
    }
    </div>
</section>
</>
)
}




