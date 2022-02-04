import React, { useContext, useEffect, useState }  from "react"
import { AnimalContext } from "./AnimalProvider" 
import "./Animal"
import { Animal } from "./Animal"


export const SoldAnimal = () =>{

    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

    const [ filteredAnimals, setFiltered ] = useState([])

    // they can affect other components and can’t be done during rendering

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

        /* maps through list of animals and determines if the animal is avaiable or sold. If the statusId === 2(if the statusId is equal
        to 2) the animal has been sold and a copy of the animal will be sent to the sold animals component. */

        filteredAnimals.map(animal => {
            if (animal.statusId === 2)
        return <Animal key={animal.id} animal={animal} />
    })
    }
    </div>
</section>
</>
)
}




