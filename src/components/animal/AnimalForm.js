import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'


export const AnimalForm = () => {
    const { animals, getAnimals, createAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)


    const radios = [

        { name: 'Good', value: true },
        { name: 'Bad', value: false },
    ];


    const [animal, setAnimals] = useState({
        id: "",
        name: "",
        url: "",
        type: "",
        status: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const { animalId } = useParams();

    const history = useHistory();


// Reach out to the world and get animals state on initialization

    useEffect(() => {
        getAnimals()
    }, [])

// handleControlledInputChange is responsible for changing the event
    const handleControlledInputChange = (event) => {

        const newAnimal = { ...animal }


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

/* This is how we check for whether the form is being used for editing or creating. 
If the URL that got us here has an id number in it, we know we want to update an 
existing record of an review. 
*/
        if (animalId){
            //PUT - update
            updateAnimal({
                id: animal.id,
                name: animal.name,
                url: animal.url,
                type: animal.type,
                status: animal.status
            })

            .then(() => history.push(`/aniamls/detail/${animal.id}`))

        }else {
            //POST - add
            createAnimal({
                id: animal.id,
                name: animal.name,
                url: animal.url,
                type: animal.type,
                status: animal.status
            })

            .then(() => history.push("/aniamls"))
        }
    }

        // Get animals. If animalId is in the URL, getFoodById
    useEffect(() => {
        getAnimals().then(() => {
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

        return (
        <Form className="animalForm">
            <h2 className="animalFormTitle">{animalId ? "Edit Animal" : "Add New Animal"}</h2>
                        {/* dropdown to select a Type of Meal */}
            {/* <fieldset>
                <div className="form-group">
                <label htmlFor="meal">Type of Meal: </label>
                <select value={food.mealTypeId} id="mealTypeId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Select a meal type</option>
                    {meals.map(meal => (
                    <option key={meal.id} value={meal.id}>
                        {meal.name}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset> */}
            {/* <fieldset>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        id="isGood"
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="isGood"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={handleControlledInputChange}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </fieldset> */}
            <fieldset>
                <div className="animal__name">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name of Animal" value={animal.name}/>
                </div>
            </fieldset>
            {/* input for picture url */}
            <fieldset>
                <div className="animal__url">
                    <label htmlFor="url">Link:</label>
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
                <div className="animal__status">
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal Status" value={animal.status}/>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}

                onClick={event => {
                    // Prevent browser from submitting the form and refreshing the page
                    event.preventDefault()
                    handleClickSaveAnimal()
                }}>
                {animalId ? "Save Animal" : "Add Animal"}
            </button>
        </Form>
    )
}