import React, { useContext, createContext, useReducer, useEffect } from "react";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used whithin ayth provider");
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user_"))) {
      dispatchLogin(dispatch, JSON.parse(localStorage.getItem("user_")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user_", JSON.stringify(user));
  }, [user]);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// reducer

const user = null; // check token is valid  when react app is initialized ....
const token = null;

// form of login payload
export const initialState = {
  user,
  token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGGED_IN":
      return {
        ...initialState,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
        user: "",
        token: "",
      };
    case "LOGIN_ERROR": {
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    }
    default:
      throw new Error(`unHandle action on Login type : ${action.type}`);
  }
};

export const dispatchLogin = (dispatch, loginPayload) => {
  dispatch({ type: "LOGGED_IN", payload: loginPayload });
};

export const dispatchLoginError = (dispatch, loginPayload) => {
  dispatch({ type: "LOGGIN_ERROR", payload: loginPayload });
};

export const dispatchLogOut = (dispatch) => {
  if (JSON.parse(localStorage.getItem("user_"))) {
    localStorage.setItem("user_", null);
  }
  dispatch({ type: "LOGOUT" });
};
