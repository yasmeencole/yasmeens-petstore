import React, { useState } from "react"

/* 
export const AnimalContext = createContext()

createContext() - creates a context object when react renders a component that 
subscribes to this context object. It will read the current context value from the 
closest matching provider above it in the tree.

createContext() - creates the context to be used by other components that need data.
The context is imported and used by individual components that need data.
*/

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext()
// Nothing is stored in the context when it is defined.

/*
export const AnimalProvider = (props) => {}
This component establishes what data can be used, because it is the parent component.

contextProvider is what you want to wrap all of the code that needs access to the 
information in the context. It has a single prop value. Which is going to be whatever 
the value of the context is.

all components and their children have access to the context. 

context is used for passing down props to any of the children. 

Props - are arguments that are passed into react components. Component recieves the
argument as a props object. 
Props are how you pass data from one component to another, as a parameter. 
Props are a representation on all the data.
*/

// AnimalProvider establishes what data can be used.
export const AnimalProvider = (props) => {
    /* data provider component will allow other components to use the data in the context.
    Define a single property(props) for each provider defined in your system and react 
    will send an object to each child component */

    /* 
    useState([]) - is a hook (function) that allows you to have state variables in 
    functional components. You pass the inital state to this function and it returns a 
    variable w/ the current state value & another function to update this value. 

    is to hold and set the array of animals. useState() defines a variable 
    that holds the state of the component, and a function that updates it. 

    animals = current state
    setAnimals = function that allows us to update the current state. Every time setState
    is called it re-renders our component. 
    useState([]) = default state/value
    */   

    // The useState([]) hook is used to define a variable that holds the state of the component, and a function that updates it.

    // The useState([]) hook - defines the variable which will hold the data and defines the function to be used to modify that state.
    const [animals, setAnimals] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    // These functions perform state transitions in my database and ensure the application stays in sync
    
    // the getAnimals function fetches data from json database and then returns it
    const getAnimals = () => {
    // Request the data fetch("http://localhost:8088/animals")

    // the fetch call is going to get the "animals" 
        return fetch("http://localhost:8088/animals")
        // Convert the JSON string response to a JavaScript data structure (object or array)
        // a string is returned from the fetch then .json converts the string into the data structure that is set up in my json database
        .then(response => response.json())
        .then(setAnimals)
    }

    // post request that creates a new animal when add button is clicked
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

    // delete request that deletes a animal when delete button is clicked
    const deleteAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
        .then(getAnimals)
    }

    // put request that updates a animal when edit button is clicked
    const updateAnimal = animal => {
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

    /*
    other components can access the array of objects being stored in the animals 
    variable, and they can invoke the getAnimals, createAnimal, getAnimalById, deleteAnimal, etc. functions.
    */
    return (
        <AnimalContext.Provider value={{
            // child components of AnimalContext.Provider
            animals, getAnimals, createAnimal, getAnimalById, deleteAnimal, updateAnimal, searchTerms, setSearchTerms
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}