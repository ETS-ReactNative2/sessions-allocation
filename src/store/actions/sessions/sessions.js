import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import {logResponse, logError} from '../general';
import {loadPeriods, updatePeriods} from '../periods';
import { filterOutOldSessions } from './utilities';

export const loadSessions = () => {
  return dispatch => {
    axios.get('/sessions.json')
      .then(response => {
        const currentSessions = filterOutOldSessions(response.data);
        dispatch(loadSessionsSuccess(currentSessions));
        response.data && dispatch(loadPeriods(currentSessions));
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const loadSessionsSuccess = (data) => {
  return {
    type: actionTypes.LOAD_SESSIONS_SUCCESS,
    sessions: data
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 

export const addSession = (sessions, session, token) => {
  return dispatch => {
    axios.post('/sessions.json?auth=' + token, session)
      .then(response => {
        dispatch(addSessionSuccess(session, response.data.name));
        dispatch(logResponse(session, {type: 'session', action: 'added'}));
        dispatch(updatePeriods(sessions.concat({...session})));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'added'}));
      })
  }
}

export const addSessionSuccess = (session, id) => {
  return {
    type: actionTypes.ADD_SESSION_SUCCESS,
    session: session,
    id: id
  }
}

export const deleteSession = (sessions, session, token) => {
  return dispatch => {
    axios.delete('/sessions/' + session.id + '.json?auth=' + token)
      .then(() => {
        dispatch(deleteSessionSuccess(sessions));
        dispatch(logResponse(session, {type: 'session', action: 'deleted'}));
        dispatch(updatePeriods(sessions));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'delete'}));
      })
  }
}

export const deleteSessionSuccess = (sessions) => {
  return {
    type: actionTypes.DELETE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const updateSession = (sessions, session, id, token) => {
  return dispatch => {
    axios.put('/sessions/' + id + '.json?auth=' + token, session)
      .then(() => {
        dispatch(updateSessionSuccess(sessions));
        dispatch(logResponse(session, {type: 'session', action: 'updated'}));
        dispatch(updatePeriods(sessions));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'update'}));
      })
  }
}

export const updateSessionSuccess = (sessions) => {
  return {
    type: actionTypes.UPDATE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const fetchSession = (session) => {
  return {
    type: actionTypes.FETCH_SESSION,
    session: session
  }
}

export const deActivateSelectedSession = () => {
  return {
    type: actionTypes.DEACTIVATE_SELECTED_SESSION
  }
}

export const filterSessions = (period, sessions) => {
  return {
    type: actionTypes.FILTER_SESSIONS,
    period: period
  }
}
