import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";



export const AnimalDetail = () => {

    const { getAnimalById, deleteAnimal } = useContext(AnimalContext)

    const [animal, setAnimals] = useState({})


    const {animalId} = useParams();


    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", animal)
        getAnimalById(animalId)
        .then((response) => {
            setAnimals(response)
        })
    }, [])


    //handles the delete button on the animal details. handleRelease gets the animal by id then deletes it.
    const handleRelease = () => {
        deleteAnimal(animal.id)
        .then(() => {
            history.push("/animals")
        })
    }

    
    return (

        <Card className="animalCard" style={{ width: '20rem' }}>
            <Card.Img variant="top" src={animal.url} />
            <Card.Body>
                <Card.Title className="animalDetailsName">
                    <h2>
                    {animal.name}
                    </h2>
                </Card.Title>

                <Card.Text>
                About this animal:
                <br />
                <br />

                Type: {animal.type}
                <br />
                <br />
                Breed: {animal.breed}
                <br />
                <br />
                Status: {animal.status}
                <br />
                <br />

                </Card.Text>

            </Card.Body>
            {/* </Card> */}

                {/* {parseInt(sessionStorage.getItem("app_user_id")) === animal.userId ? */}
                <div>
                {/* this is the edit button, when clicked it sends a put request that updates the animal */}
                <Button className="animalEditButton" onClick={() => { history.push(`/animals/edit/${animal.id}`) }}>Edit</Button>
                
                <Button className="animalDeleteButton" onClick={handleRelease}>Delete</Button>
                </div>
                        {/* : ""} */}
        </Card>
    )
}
