import {
  GET_ALL_PERSONS,
  DELETE_PERFORMED,
  PERSON_WAS_ADDED
} from "../actions"


const initialState = {
  allPersonsList: [],
  refreshAfterDeleteNeeded: false,
  personAddedSuccessfully: false
}

export const personsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PERSONS:
      return {
        ...state,
        allPersonsList: payload,
        refreshAfterDeleteNeeded: false,
        personAddedSuccessfully: false
      }
      break;
    //==============================================================
    case DELETE_PERFORMED:
      return {
        ...state,
        refreshAfterDeleteNeeded: true
      }
      break;
    //==============================================================
    case PERSON_WAS_ADDED:
      return {
        ...state,
        personAddedSuccessfully: true
      }
    default:
      return state;
  }
}