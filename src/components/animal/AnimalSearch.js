import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
// import "./Animal"

export const AnimalSearch = () => {
    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.

    const { setSearchTerms } = useContext(AnimalContext)

    return (
        <>
        {/* Animal Search: */}
        <div className="d-flex justify-content-center" style={{alignItems: 'center', marginBottom: '20px'}}>

        <input className="animalSearch" type="text" style={{border: '1px solid lightgray', borderRadius: '30px', 
            width: '40vh', height: '35px', marginLeft: '10px', marginTop: '10px',  paddingLeft: '20px'}}
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search... " />
        </div>
        </>
    )
}