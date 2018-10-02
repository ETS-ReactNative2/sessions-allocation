import * as actionTypes from './actionTypes';
import axios from '../../../axios';
import { logResponse } from '../general/general';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(response => {
        dispatch(loadExaminersSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const loadExaminersSuccess = (examiners, user) => {
  return {
    type: actionTypes.LOAD_EXAMINERS_SUCCESS,
    examiners: examiners,
    user: user
  }
}

export const addExaminer = (examiner, token) => {
  return dispatch => {
    axios.post('/examiners.json?auth=' + token, examiner)
      .then(response => {
        dispatch(addExaminerSuccess(examiner, response.data.name));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'added'}));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const addExaminerSuccess = (examiner, id) => {
  return {
    type: actionTypes.ADD_EXAMINER_SUCCESS,
    examiner: examiner,
    id: id
  }
}

export const updateExaminer = (examiner, id, token) => {
  return dispatch => {
    axios.put('/examiners/' + id + '.json?auth=' + token, examiner)
      .then(() => {
        dispatch(updateExaminerSuccess(examiner, id));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'updated'}));
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const updateExaminerSuccess = (examiner, id) => {
  return {
    type: actionTypes.UPDATE_EXAMINER_SUCCESS,
    examiner: examiner,
    id: id
  }
}

export const deleteExaminer = (examiner, token) => {
  const {id} = examiner;
  return dispatch => {
    axios.delete('/examiners/' + id + '.json?auth=' + token)
      .then(() => {
        dispatch(deleteExaminerSuccess(id));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'deleted'}));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const deleteExaminerSuccess = (id) => {
  return {
    type: actionTypes.DELETE_EXAMINER_SUCCESS,
    id: id
  }
}

export const fetchExaminer = (id) => {
  return {
    type: actionTypes.FETCH_EXAMINER,
    id: id,
  }
}

export const fetchExaminerOnLoad = (examiners, user) => {
  return {
    type: actionTypes.FETCH_EXAMINER_ON_LOAD,
    examiners: examiners,
    user: user
  }
}

export const clearSelectedExaminer = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_EXAMINER
  }
};

export const filterExaminer = (value, filterBy) => {
  return {
    type: actionTypes.FILTER_EXAMINER,
    value: value,
    filterBy: filterBy
  }
};