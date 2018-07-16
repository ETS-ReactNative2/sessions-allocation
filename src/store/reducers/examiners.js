import * as actionTypes from '../actions/actionTypes';
import {
  updateState, 
  removeElementById,
  replaceElementById,
  addId,
  objectToArray,
  sortBy
} from './utility';

const initialState = {
  examiners: null,
  error: false,
  editing: false, 
  selectedExaminer: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_EXAMINERS_SUCCESS:
      return updateState(state, {examiners: objectToArray(action.examiners, 'name'), error: false})

    case actionTypes.ADD_EXAMINER_SUCCESS:
      const examinerUpdatedWithId = addId({...action.examiner}, action.id);
      return updateState(state, {examiners: sortBy(state.examiners.concat(examinerUpdatedWithId), 'name'), error: false})

    case actionTypes.DELETE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: removeElementById(state.examiners, action.id), error: false})

    case actionTypes.UPDATE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: sortBy(replaceElementById(state.examiners, action.examiner, action.id), 'name'), error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    case actionTypes.REGISTER_EXAMINER_FAIL:
      return updateState(state, {error: action.error.response.data.error})

    case actionTypes.FETCH_EXAMINER:
      return updateState(state, {selectedExaminer: action.examiner})

    case actionTypes.DEACTIVATE_SELECTED_EXAMINER:
      return updateState(state, {selectedExaminer: null})

    default:
      return state;  
  }
}

export default reducer;