// import React, { useContext, useEffect } from "react"
import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { StatusContext } from "./StatusProvider";


export const AnimalTable = (props) => {
    const { animals,getAnimals } = useContext(AnimalContext)
    const { status, getStatus } = useContext(StatusContext)
    const history = useHistory()


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