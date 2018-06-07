import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {objectToArray} from './utility';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(response => {
        dispatch(loadExaminersSuccess(objectToArray(response.data)))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const loadExaminersSuccess = (data) => {
  return {
    type: actionTypes.LOAD_EXAMINERS_SUCCESS,
    examiners: data
  }
}

export const addExaminer = (examiner) => {
  return dispatch => {
    axios.post('/examiners.json', examiner)
      .then(response => {
        dispatch(addExaminerSuccess(examiner, response.data.name))
      })
      .catch(error => {
        dispatch(failedLoad(error))
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

export const updateExaminer = (examiner, id) => {
  return dispatch => {
    axios.put('/examiners/' + id + '.json', examiner)
      .then(response => {
        dispatch(updateExaminerSuccess(examiner, id))
      })
      .catch(error => {
        dispatch(failedLoad(error))
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

export const deleteExaminer = (id) => {
  return dispatch => {
    axios.delete('/examiners/' + id + '.json')
      .then(response => {
        dispatch(deleteExaminerSuccess(id))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const deleteExaminerSuccess = (id) => {
  return {
    type: actionTypes.DELETE_EXAMINER_SUCCESS,
    id: id
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 

export const fetchExaminer = (examiner) => {
  return {
    type: actionTypes.FETCH_EXAMINER,
    examiner: examiner
  }
}

export const deActivateSelectedExaminer = () => {
  return {
    type: actionTypes.DEACTIVATE_SELECTED_EXAMINER
  }
}