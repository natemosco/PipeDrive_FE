import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators, compose } from 'redux'
import Navigation from "../components/Navigation"
import { getAllPersons, addOnePerson } from "../actions"

import Form from "../components/Form"


export const AddPersons = (props) => {
  const { personAddedSuccessfully, getAllPersons, addOnePerson } = props
  const [addedSuccess, setAddedSuccess] = useState(personAddedSuccessfully)
  const refresh = () => { getAllPersons() }
  const addPerson = (personData) => { addOnePerson(personData) }

  useEffect(() => {
    setAddedSuccess(personAddedSuccessfully)
  }, [personAddedSuccessfully])

  return (
    <div>
      <Navigation refresh={refresh} />
      <Form addPerson={addPerson} addedSuccess={addedSuccess}></Form>
    </div>
  )
}

const mapStateToProps = ({ persons }) => ({
  personAddedSuccessfully: persons.personAddedSuccessfully
})

const mapDispatchToProps = dispatch => bindActionCreators({ getAllPersons, addOnePerson }, dispatch)

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AddPersons)
