import fetch from 'isomorphic-unfetch'

import * as actions from './reducers'

export function fetchAstronauts() {
  return async (dispatch) => {
    dispatch({ type: actions.REQUEST_ASTRONAUTS })

    try {
      const response = await fetch('http://localhost:3004/astronauts')
      const json = await response.json()
      dispatch({ type: actions.RECEIVE_ASTRONAUTS, payload: { astronauts: json } })
    } catch (error) {
      dispatch({ type: actions.REQUEST_ASTRONAUTS_FAILURE, payload: { error } })
    }
  }
}

export function editAstronaut(astronaut) {
  return async (dispatch) => {
    dispatch({ type: actions.EDIT_ASTRONAUT, payload: { astronaut } })

    try {
      const response = await fetch(
        `http://localhost:3004/astronauts/${astronaut.id}`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(astronaut),
        },
      )
      const json = await response.json()
      dispatch({ type: actions.EDIT_ASTRONAUT_SUCCESS, payload: { astronaut: json } })
    } catch (error) {
      dispatch({ type: actions.EDIT_ASTRONAUT_FAILURE, payload: { error } })
    }
  }
}

export function addAstronaut(astronaut) {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_ASTRONAUT, payload: { astronaut } })

    try {
      const response = await fetch(
        'http://localhost:3004/astronauts',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(astronaut),
        },
      )
      const json = await response.json()
      dispatch({ type: actions.ADD_ASTRONAUT_SUCCESS, payload: { astronaut: json } })
    } catch (error) {
      dispatch({ type: actions.ADD_ASTRONAUT_FAILURE, payload: { error } })
    }
  }
}

export function deleteAstronaut(astronautId) {
  return async (dispatch) => {
    dispatch({ type: actions.DELETE_ASTRONAUT, payload: { astronautId } })

    try {
      const response = await fetch(
        `http://localhost:3004/astronauts/${astronautId}`,
        {
          method: 'delete',
        },
      )
      await response.json()
      dispatch({ type: actions.DELETE_ASTRONAUT_SUCCESS, payload: { astronautId } })
    } catch (error) {
      dispatch({ type: actions.DELETE_ASTRONAUT_FAILURE, payload: { error } })
    }
  }
}
