import * as actionTypes from '../../actions/venues/actionTypes';
import { objectToArray, sortBy} from '../utility';

const initial = {
  venues: [],
  error: false,
  selectedVenue: null
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.ADD_VENUE_SUCCESS: 
      return {...state, venues: state.venues.concat(action.venue)};
    
    case actionTypes.LOAD_VENUE_SUCCESS: 
      return {...state, venues: sortBy(objectToArray(action.venues), 'name')};

    case actionTypes.DELETE_VENUE_SUCCESS:
      return {...state, venues: state.venues.filter(v => v.id !== action.venue.id)};

    case actionTypes.FETCH_VENUE:
      return {...state, selectedVenue: state.venues.filter(v => v.id === action.id)}

    default:
      return state;  
  }
}

export default reducer;