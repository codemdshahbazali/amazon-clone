import React, { createContext, useContext, useReducer } from 'react';

//Preapre the dataLayer
export const StateContext = createContext();

//Wraps our app and provide the Data Layer to all the components of the app
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

//Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
