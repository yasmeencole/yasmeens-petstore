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

    const {animalId} = useParams();

    const history = useHistory();


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


    //handles the delete button on the animal details. handleRelease gets the animal by id then deletes it.
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

                <Button className="statusButton">
                {status[animal.statusId - 1]?.name}
                </Button>
                <br />
                <br />

                </Card.Text>

            </Card.Body>

                <div className="d-flex justify-content-center">
                {/* this is the edit button, when clicked it sends a put request that updates the animal */}
                <Button className="animalEditButton" onClick={() => { history.push(`/animals/edit/${animal.id}`) }}>Edit</Button>
                
                <Button className="animalDeleteButton" onClick={handleRelease}>Delete</Button>
                </div>

        </Card>
        </div>
    )
}
