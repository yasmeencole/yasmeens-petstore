import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Petstore.css"


// Petstore is a container component. It contains other components that are
// responsible for the presentation and behavior of the application. 

export const Petstore = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)

// NavBar - is the Presentation Component, it directly expresses HTML.
// ApplicationViews - is a Controller Component, it is responsible for controling the behavior
// of the system and maps URLs to components.