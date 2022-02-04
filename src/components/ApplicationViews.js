import React from "react"
import { Route } from "react-router-dom"
// import { Animal } from "./animal/Animal"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
// import { Home } from "./Home"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { StatusProvider } from "./animal/StatusProvider"
import { SoldAnimal } from "./animal/SoldAnimal"
import { AnimalSearch } from "./animal/AnimalSearch"
import { AnimalTable } from "./animal/AnimalTable"

export const ApplicationViews = () => {
    return (
        <>

            {/* Render the animal list when http://localhost:3000/animals */}
            <StatusProvider>
                <AnimalProvider>
                    {/* Render the location list when http://localhost:3000/ */}
                    <Route exact path="/">
                        {/* <Home /> */}
                        <AnimalSearch />
                        <AnimalList />

                    </Route>
                    <Route exact path="/animals">
                        <AnimalSearch />
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
                    <Route path="/animalTable">
                        <AnimalTable />
                    </Route>
                    <Route path="/soldAnimals">
                        <AnimalSearch />
                        <SoldAnimal />
                    </Route>
                </AnimalProvider>
            </StatusProvider>

            {/* <StatusProvider>
                <AnimalProvider>
                </AnimalProvider>
            </StatusProvider> */}
        </>
    )
}