import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { StatusContext } from "./StatusProvider";


export const AnimalDetail = () => {

    const { getAnimalById, deleteAnimal } = useContext(AnimalContext)
    const { status, getStatus } = useContext(StatusContext)

    const [animal, setAnimals] = useState({})

    // useParams from react-router-dom allowing the app to read a parameter from the URL.
    // this will serve as a variable to hold the actual value that will be in the URL
    const {animalId} = useParams();
    
    // useHistory is provided by react-router-dom. It contains a push() method which we can use to change the URL. 
    // useHistory tells React which route we want to visit.
    const history = useHistory();

    // getStatus is loaded into the useEffect hook so that we can have access to the status API
    useEffect(() => {
        getStatus().then(
            console.log("useEffect", animal),
            getAnimalById(animalId)
            .then((response) => {
                setAnimals(response)
                // console.log(response)
                // console.log(status)
            })
        )
    }, [])

    // Will be responsible for the delete button that will allow the user to delete an animal.
    // Then invoke the function when the button is clicked. Once the delete operation is complete, redirect the user back to the list of animals.
    // Handles the delete button on the animal details. handleRelease gets the animal by id then deletes it.
    const handleRelease = () => {
        deleteAnimal(animal.id)
        .then(() => {
            history.push("/animals")
        })
    }

    
    return (
        <div className="d-flex justify-content-center">
        <Card className="animalCard" style={{ width: '20rem' }}>
            <Card.Img variant="top" src={animal.url} />
            <Card.Body>
                <Card.Title className="animalDetailsName">
                    <h2>{animal.name}</h2>
                </Card.Title>

                <Card.Text>
                <b>About this animal:</b>
                <br />
                <br />

                <b>Type:</b> {animal.type}
                <br />
                <br />

                <b>Breed:</b> {animal.breed}
                <br />
                <br />
                {/* status[0] == "Available"
                status[1] == "Sold" */}

                {/* we have to subtract 1 from animalId
                otherwise we might get status[2] which doesn't exist */}
                <Button className="statusButton">
                {status[animal.statusId - 1]?.name}
                </Button>
                {/* the Optional chaining (?.) operator is used to prevent nested values from breaking the code. */}
                <br />
                <br />

                </Card.Text>

            </Card.Body>

                <div className="d-flex justify-content-center">
                {/* this is the edit button, when clicked it sends a put request that updates the animal */}
                <Button className="animalEditButton" onClick={() => { history.push(`/animals/edit/${animal.id}`) }}>Edit</Button>
                
                {/* this is the delete button, when clicked it sends a delete request that deletes the animal */}
                <Button className="animalDeleteButton" onClick={handleRelease}>Delete</Button>
                </div>

        </Card>
        </div>
    )
}
