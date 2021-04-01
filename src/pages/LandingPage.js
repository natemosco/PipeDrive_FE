import React, { useState, useEffect } from "react"

import { Route, Switch, withRouter } from "react-router-dom"
import { bindActionCreators, compose } from "redux"

import { connect } from "react-redux"

import { getAllPersons, deleteOnePerson } from "../actions"

import Navigation from "../components/Navigation"
import DisplayTable from "../components/DisplayTable"

function LandingPage(props) {
  const { getAllPersons, deleteOnePerson } = props
  const [personsArr, setpersonsArr] = useState(props.allPersonsList)
  const refresh = () => { getAllPersons() }
  const handleDeleteOnePerson = (id) => { deleteOnePerson(id) }

  useEffect(() => {
    setpersonsArr(props.allPersonsList)
    if (props.allPersonsList.length === 0 || props.refreshNeeded === true) {
      getAllPersons()
    }
  }, [props.allPersonsList, props.refreshNeeded])

  return (
    <div className="landingPage">
      <Navigation refresh={refresh} />
      <DisplayTable
        entries={personsArr}
        deleteOnePerson={handleDeleteOnePerson}
      />

    </div>
  )
}
const mapStateToProps = ({ persons }) => ({
  allPersonsList: persons.allPersonsList,
  refreshNeeded: persons.refreshAfterDeleteNeeded
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllPersons, deleteOnePerson }, dispatch)

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LandingPage);
