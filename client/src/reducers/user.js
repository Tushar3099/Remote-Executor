import { SET_AUTH_SUCCESS, SET_AUTH_FAIL } from '../actions/type';

const initialState = {
  name: '',
  email: '',
  image: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload
      };
    case 'SET_USER':
      return { ...state, ...action.payload };
    case SET_AUTH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
