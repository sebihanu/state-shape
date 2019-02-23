import * as types from 'actions/feature1Types';
import initialState from '../utils/initialState';

const reducer1 = (state = initialState.state1, action) => {  
  switch (action.type) {
    case types.ACTION1: {      
      return {
        ...state,
        k1: action.payload
      }
    }

    default:
      return state
  }
}

export default reducer1