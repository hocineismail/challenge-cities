import React from "react";
import { appState } from "./reducer";
import { Action, State } from "../typed/app";

// AppContext is a React context that provides access to the  global state and dispatch function.
// The context is created using React.createContext and initialized with the default values.
// This context is typically (like redux and NgRx) used in combination with a reducer to manage the global state and actions.

export const AppContext = React.createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: appState,
    dispatch: () => undefined,
});
