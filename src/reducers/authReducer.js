const initialState = {
  uid: null,
  token: null,
  expiresAt: null,
  isLoading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case "LOADING":
      return {
        ...state, isLoading: true
      }

    case "LOGIN":
      return {
        ...state, uid: action.payload.uid,
        token: action.payload.token, expiresAt: action.payload.expiresAt, isLoading: false
      }

    case "REGISTER":
      return {
        ...state, uid: action.payload.uid,
        token: action.payload.token, expiresAt: action.payload.expiresAt, isLoading: false
      }

    case "ERROR":
      return {
        ...state, error: action.payload.error, isLoading: false
      }

    default:
      return {...state};
  }
}

export default authReducer;