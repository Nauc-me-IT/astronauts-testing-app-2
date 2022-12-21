export const REQUEST_ASTRONAUTS = 'REQUEST_ASTRONAUTS'
export const RECEIVE_ASTRONAUTS = 'RECEIVE_ASTRONAUTS'
export const REQUEST_ASTRONAUTS_FAILURE = 'REQUEST_ASTRONAUTS_FAILURE'

export const EDIT_ASTRONAUT = 'EDIT_ASTRONAUT'
export const EDIT_ASTRONAUT_SUCCESS = 'EDIT_ASTRONAUT_SUCCESS'
export const EDIT_ASTRONAUT_FAILURE = 'EDIT_ASTRONAUT_FAILURE'

export const ADD_ASTRONAUT = 'ADD_ASTRONAUT'
export const ADD_ASTRONAUT_SUCCESS = 'ADD_ASTRONAUT_SUCCESS'
export const ADD_ASTRONAUT_FAILURE = 'ADD_ASTRONAUT_FAILURE'

export const DELETE_ASTRONAUT = 'DELETE_ASTRONAUT'
export const DELETE_ASTRONAUT_SUCCESS = 'DELETE_ASTRONAUT_SUCCESS'
export const DELETE_ASTRONAUT_FAILURE = 'DELETE_ASTRONAUT_FAILURE'

export function reducer(state = { isFetching: false, astronauts: [], error: '' }, action) {
  let astronauts = []
  let astronaut
  let objIndex
  switch (action.type) {
    case REQUEST_ASTRONAUTS:
      return { ...state, isFetching: true }
    case RECEIVE_ASTRONAUTS:
      astronauts = action.payload.astronauts
      return { ...state, isFetching: false, astronauts, error: '' }
    case REQUEST_ASTRONAUTS_FAILURE:
      return { ...state, isFetching: false, error: action.payload.error }
    case EDIT_ASTRONAUT:
      return { ...state, isFetching: true }
    case EDIT_ASTRONAUT_SUCCESS:
      astronaut = action.payload.astronaut
      objIndex = state.astronauts.findIndex((obj => obj.id === astronaut.id))
      astronauts = [...state.astronauts]
      astronauts[objIndex] = astronaut
      return { ...state, isFetching: false, astronauts }
    case EDIT_ASTRONAUT_FAILURE:
      return { ...state, isFetching: false, error: action.payload.error }
    case ADD_ASTRONAUT:
      return { ...state, isFetching: true }
    case ADD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        astronauts: [...state.astronauts, action.payload.astronaut],
      }
    case ADD_ASTRONAUT_FAILURE:
      return { ...state, isFetching: false, error: action.payload.error }
    case DELETE_ASTRONAUT:
      return { ...state, isFetching: true }
    case DELETE_ASTRONAUT_SUCCESS:
      astronauts = state.astronauts.filter(astr => astr.id !== action.payload.astronautId)
      return { ...state, isFetching: false, astronauts }
    case DELETE_ASTRONAUT_FAILURE:
      return { ...state, isFetching: false, error: action.payload.error }
    default:
      return state
  }
}
