// import the main React library, and two functions that it exports.
import React, { useState, createContext } from "react"


export const StatusContext = createContext()



export const StatusProvider = (props) => {

    const [status, setStatus] = useState([])

    const getStatus = () => {

    return fetch("http://localhost:8088/status")
        .then(response => response.json())
        .then(statusData => setStatus(statusData))
}

    return (

    <StatusContext.Provider value={{
    // these are the child components of MealContext.Provider
    status, getStatus
    }}>
        {props.children}
        </StatusContext.Provider>
)
}