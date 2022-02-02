import React, { useContext, useEffect }  from "react"
import { AnimalContext } from "./AnimalProvider" 
import "./Animal"
import { Animal } from "./Animal"


export const SoldAnimal = () =>{

    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    const { animals, getAnimals } = useContext(AnimalContext)

    // they can affect other components and can’t be done during rendering

    useEffect(() => {
        getAnimals()
        console.log(animals, "animal")
    }, [])



return (
<>
<section>
    <h2 className="sold__AnimalsTitle">Sold Animals</h2>

    <div className="animals">
    {
        /* .map() is a method that calls a provided call back function once for each element in the array in order to construct 
        a new array from the results. 
        
        each time the callback excutes the returned value us executed 
        */
        // maps through list of foods and determines if the food is bad. If the food.isGood is === to False
        //  then the food is considered bad and it will send a copy of the food to the bad foods component.

        animals.map(animal => {
            if (animal.statusId === 2)
        return <Animal key={animal.id} animal={animal} />
    })
    }
    </div>
</section>
</>
)
}




