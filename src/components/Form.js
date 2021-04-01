import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const initialFormState = { name: "", phone: "", email: "" }
  const [formFields, setformFields] = useState(initialFormState)
  const [validationError, setValidationError] = useState({})

  const onChangeHandler = (event) => {
    event.persist()
    event.preventDefault()
    // console.log(event)
    const name = event.target.id
    const value = event.target.value
    setformFields({ ...formFields, [name]: value })
  }

  const validationChecks = () => {
    let errors = {}
    if (formFields.name.length < 4) {
      errors.name = 'Name must have more than 3 letter characters'
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi
    // credit for regex pattern goes to: ihateregex.io
    if (!phoneRegex.test(formFields.phone)) {
      errors.phone = 'Phone number must match format xxx-xxx-xxxx or +1xxxoooxxxx'
    }

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm
    if (!emailRegex.test(formFields.email)) {
      errors.email = "invalid email format please follow format name@domain.com or name@sub.domain.com"
    }

    setValidationError(errors)
    return Object.keys(errors).length
  }


  const onSubmitHandler = (event) => {
    event.preventDefault()

    let currentErrors = validationChecks()
    if (currentErrors === 0) {
      props.addPerson(formFields)
      setformFields(initialFormState)
    }
  }


  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => { onSubmitHandler(event) }}>
      <div>
        <TextField
          type="text"
          onChange={(event) => { onChangeHandler(event) }}
          value={formFields.name}
          error={validationError.hasOwnProperty("name")}
          id="name"
          label="Name"
          placeholder="First & Last Name"
          helperText={(validationError.hasOwnProperty("name")) ? validationError.name : ""}
        />
      </div>
      <div>
        <TextField
          type="tel"
          onChange={(event) => { onChangeHandler(event) }}
          value={formFields.phone}
          error={validationError.hasOwnProperty("phone")}
          id="phone"
          label="Phone Number"
          placeholder="xxx-xxx-xxxx"
          helperText={(validationError.hasOwnProperty("phone")) ? validationError.phone : ""}
        />
      </div>
      <div>
        <TextField
          type="email"
          onChange={(event) => { onChangeHandler(event) }}
          value={formFields.email}
          error={validationError.hasOwnProperty("email")}
          id="email"
          label="Email"
          placeholder="john.doe@gmail.com"
          helperText={(validationError.hasOwnProperty("email")) ? validationError.email : ""}
        />
      </div>
      <button type="submit">Add New Person</button>
    </form>
  );

}
