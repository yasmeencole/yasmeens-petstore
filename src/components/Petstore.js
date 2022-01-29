import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Petstore.css"
// import { Animal } from "./animal/Animal"

export const Petstore = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)