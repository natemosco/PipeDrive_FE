import React from 'react'
import { Link } from "react-router-dom"

export default function Navigation(props) {

  return (
    <div className="nav">
      <Link to="/">
        <button className="navbutton" onClick={props.refresh}>List All People</button>
      </Link>
      <Link to="/addPerson">
        <button className="navbutton">Add Person</button>
      </Link>
    </div>
  )
}
