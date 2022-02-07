// import React, { useContext, useEffect } from "react"
import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { StatusContext } from "./StatusProvider";


export const AnimalTable = (props) => {
    /* AnimalContext and StatusContext are imported from their provider components so that the useContext hook can use 
    data structures and functions that a parent provider component exposes.*/
    const { animals, getAnimals } = useContext(AnimalContext)
    const { status, getStatus } = useContext(StatusContext)

    // useHistory is provided by react-router-dom. It contains a push() method which we can use to change the URL. 
    // useHistory tells React which route we want to visit.
    const history = useHistory()

    // getStatus and getAnimals from the API
    useEffect(() => {
        getStatus().then()
        getAnimals()
        console.log("Fetching animals data from API")
    }, [])


    return (
        <>
        <div>

        <div className="table__header">
            <h1>Table of Animals</h1>
        </div>
        <div className="d-flex justify-content-center">
            <Button className="createAnimalTableButtom" onClick={() => history.push("/animals/create")}>New Animal</Button>
        </div>
        <table>
            <tbody className="table">
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Status</th>
            </tr>
            {/* .map() array method is used to iterate the array of animals and generate HTML for 
            each one by invoking the Animal component function. This pulls in list of animals to map through and returns an object in a tabluar format*/}
                {
                    
                    animals.map(animal => {
                        return <tr key={`table--${animal.id}`} className="animal">
                                <td className="animal__table">{animal.name}</td>
                                <td>{animal.type}</td>
                                <td>{animal.breed}</td>
                                <td>{status[animal.statusId - 1]?.name}</td>
                        </tr>
                    })
                }
            </tbody >
        </table>
        </div>
        </>
    )
}