import React from "react"
import "./Animal.css"
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

export const Animal = ({animal}) => {
    return (
    <Link className="cardLink" to={`/animals/detail/${animal.id}`}>
        <Card className="animal" style={{ maxWidth: '20rem', maxHeight: '20rem'}}>
        <Card.Img className="card-img" variant="top" src={animal.url}></Card.Img>
        <Card.Title className="animalCardTitle">{animal.name}</Card.Title>
        </Card>
    </Link>
)
}
