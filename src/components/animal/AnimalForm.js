import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { StatusContext } from "./StatusProvider"
import "./Animal.css"
import { useParams, useHistory } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'


export const AnimalForm = () => {
    const { getAnimals, createAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { status, getStatus } = useContext(StatusContext)

// useState( '1' ) is setting the intial value of radios to 1
    const [radioValue] = useState( '1' ); 

    /* defines radio buttons and gives them a value of true or false
    if a animal is "Available" isAvailable === false
    if a animal; is "Sold" isAvailable === true */
    const radios = [

        { name: 'Available', value: true },
        { name: 'Sold', value: false },
    ];


    const [animal, setAnimals] = useState({
        id: "",
        name: "",
        url: "",
        type: "",
        breed: "",
        statusId: 0
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

        // Get animals. If animalId is in the URL, getAnimalById
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
            {/* <fieldset>
                <div className="animal__status">
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal Status" value={animal.status}/>
                </div>
            </fieldset> */}
            <br />
            {/* <fieldset>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        id="isAvailable"
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="isAvailable"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={handleControlledInputChange}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </fieldset> */}
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