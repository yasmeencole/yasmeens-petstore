import React from "react"
import "./Animal.css"

export const Animal = ({animal}) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <div className="animal__breed">{animal.breed}</div>
    </section>
)