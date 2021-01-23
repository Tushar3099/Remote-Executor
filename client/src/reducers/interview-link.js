import {
  SET_INTERVIEW_LINK_LOADING_TRUE,
  INTERVIEW_LINK_GENERATION_SUCCESS,
  FETCH_HOSTED_LINKS_SUCCESS
} from '../actions/type';

const initialState = {
  loading: false,
  generatedLinkAsInterviewer: '',
  hostedLinks: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_INTERVIEW_LINK_LOADING_TRUE:
      return {
        ...state,
        loading: true
      };
    case INTERVIEW_LINK_GENERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        generatedLinkAsInterviewer: payload
      };
    case FETCH_HOSTED_LINKS_SUCCESS:
      return {
        ...state,
        hostedLinks: action.payload
      };
    default:
      return state;
  }
}
