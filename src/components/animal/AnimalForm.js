import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { StatusContext } from "./StatusProvider"
import "./Animal.css"
import { useParams, useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'


export const AnimalForm = () => {
    const { getAnimals, createAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { status, getStatus } = useContext(StatusContext)

    // Here the inital state of the form inputs are define with the useState() hook
    const [animal, setAnimals] = useState({
        id: "",
        name: "",
        url: "",
        type: "",
        breed: "",
        statusId: 0
    });

    //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
    const [isLoading, setIsLoading] = useState(true);
    
    // The form can be used for editing and adding an animal, you need access to the animal id for fetching the animal you want to edit
    // useParams from react-router-dom allowing the app to read a parameter from the URL.
    // this will serve as a variable to hold the actual value that will be in the URL
    const { animalId } = useParams();

    // useHistory() tells React to render the animal form component.
    const history = useHistory();


// Reach out to the API and get animals state on initialization
    useEffect(() => {
        getAnimals()
    }, [])

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    // handleControlledInputChange is responsible for changing the event
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array, always create a copy, make changes, and then set state.
        
        The spread syntax (...) allows an iterable such as an array expression or string to be expanded in 
        places where zero or more arguments (for function calls) or elements (for array literals) are 
        expected, or an object expression to be expanded in places where zero or more key-value pairs
        (for object literals) are expected.

        Spread syntax can be used when all elements from an object or array meeds to be included in a list of some kind

        ... = function passes all the values in the array
        animal =  is the array name
        */
        const newAnimal = { ...animal }
        // ...animal is a copy of const [animal, setAnimals] = useState({})


// this tells the button to grab the id of the new animal that has been created
        if (event.target.id) {
            newAnimal[event.target.id] = event.target.value
/*
if there is no id then grab the name of the new animal that was created
this will grab the value, which is the "name". The name is as a string and it needs to be 
converted to a boolean of true and false.
*/
        }else {
            if (event.target.value === "true") {
                newAnimal[event.target.name] = true
            }
            else {
                newAnimal[event.target.name] = false
            }
        }
        // update state
        setAnimals(newAnimal)
    }

    const handleClickSaveAnimal = () => {
        setIsLoading(true);
        // setIsLoading(true) - ensures the user cannot repeatedly click the button while the API is being updated.

/* This is how we check for whether the form is being used for editing or creating. 
If the URL that got us here has an id number in it, we know we want to update an 
existing record of an animal. 
*/
        if (animalId){
            //PUT - update
            updateAnimal({
                id: animal.id,
                name: animal.name,
                url: animal.url,
                type: animal.type,
                breed: animal.breed,
                statusId: parseInt(animal.statusId)
            })

            .then(() => history.push(`/animals/detail/${animal.id}`))

        }else {
            //POST - add
            createAnimal({
                id: animal.id,
                name: animal.name,
                url: animal.url,
                type: animal.type,
                breed: animal.breed,
                statusId: parseInt(animal.statusId)
            })

            .then(() => history.push("/animals"))
        }
    }

        // Get animals and status. If animalId is in the URL, getAnimalById
    useEffect(() => {
        getAnimals().then(getStatus).then(() => {
            // if there is data
        if (animalId) {
            getAnimalById(animalId)
            .then(animal => {
                setAnimals(animal)
                setIsLoading(false)
            })
        } else {
            // else - there is no data
            setIsLoading(false)
        }
        })
    }, [])
    // Once the API has updated, change the view to display updated data
    // This component will populate the input fields with the current values from the API. We will obtain all necessary values using a useEffect() hook.

        return (
        <div className="animalForm">   
        <Form>
            <h2 className="animalFormTitle">{animalId ? "Edit Animal" : "Add New Animal"}</h2>
                        {/* dropdown to select Avaibility Status */}
            <fieldset>
                <div className="form-group">
                <label htmlFor="status">Status of Animal: </label>
                <select value={animal.statusId} id="statusId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Select animal status</option>
                    {status.map(status => (
                    <option key={status.id} value={status.id}>
                        {status.name}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="animal__name">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name of Animal" value={animal.name}/>
                </div>
            </fieldset>
            {/* input for picture url */}
            <fieldset>
                <div className="animal__url">
                    <label htmlFor="url">Image:</label>
                    <input type="url" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="https://example.com" pattern="https://.*" value={animal.url}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="animal__type">
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Type of Animal" value={animal.type}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="animal__breed">
                    <label htmlFor="breed">Breed:</label>
                    <input type="text" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal Breed" value={animal.breed}/>
                </div>
            </fieldset>
            <br />
            <div className="d-flex justify-content-center">
            <button className="btn btn-primary"
                disabled={isLoading}

                onClick={event => {
                    // Prevent browser from submitting the form and refreshing the page
                    event.preventDefault()
                    handleClickSaveAnimal()
                }}>
                {animalId ? "Save Animal" : "Add Animal"}
            </button>
            </div>
        </Form>
        </div> 
    )
}