import React from "react"
import { Route } from "react-router-dom"
// import { Animal } from "./animal/Animal"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { Home } from "./Home"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
                    <Route path="/animals/create">
                <AnimalForm />
                </Route>
                <Route path="/animals/detail/:animalId(\d+)">
                    <AnimalDetail />
                </Route>
                <Route path="/animals/edit/:animalId(\d+)">
                    <AnimalForm />
                </Route>
            </AnimalProvider>
        </>
    )
}