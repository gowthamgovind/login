import { SET_CURRENT_USER, VALIDATE_MOBILE, SET_GENERATE, GET_USERS} from "../actions/types";
import isEmpty from "../validations/is-empty";
import isAdmin from "../validations/is-admin";
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  errors: {},
  path: "",
  status: "",
  genStatus: "",
  users: []
};
export default function(state = initialState, action) {
  switch (action.type) {
     
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: isAdmin(action.payload),
        user: action.payload,
        path: "/"
      };
    case VALIDATE_MOBILE:     
      return {
        ...state,
        status : action.payload
      };
    case SET_GENERATE:
      return {
        ...state,
        genStatus: action.payload
      };
    case GET_USERS:
      return{
        ...state,
        users: action.payload
      }
   
    default:
      return state;
  }
}
