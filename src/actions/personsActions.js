import axios from "axios"

const baseUrl = "https://pipedrive-people-project.herokuapp.com/api/persons"

export const GET_ALL_PERSONS = "GET_ALL_PERSONS"
export const DELETE_PERFORMED = "DELETE_PERFORMED"
export const PERSON_WAS_ADDED = "PERSON_WAS_ADDED"

export const getAllPersons = () => dispatch => {
  axios
    .get(baseUrl)
    .then(res => {
      console.log('\n****************', res)
      dispatch({
        type: GET_ALL_PERSONS,
        payload: res.data.data
      })
    })
    .catch(error => {
      console.log(error, 'Error from get baseUrl');
    });
}

export const deleteOnePerson = (id) => async (dispatch) => {
  let completed = undefined
  axios
    .delete(`${baseUrl}/${id}`)
    .then(res => {
      console.log(res)
      dispatch({
        type: DELETE_PERFORMED,
        payload: null
      })
    })
    .catch(err => {
      console.log(err, "error, person was unable to be deleted")
    })
  return completed
}

export const addOnePerson = (data) => (dispatch) => {
  const newPerson = {
    name: data.name,
    email: [data.email],
    phone: [data.phone]
  }

  axios.post(baseUrl, newPerson)
    .then(res => {
      console.log(res)
      dispatch({
        type: PERSON_WAS_ADDED,
        payload: null
      })
    })
    .catch(err => {
      console.log(err, "error, person was unable to be created")
    })

}
