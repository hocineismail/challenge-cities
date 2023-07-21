import React from "react";
import { appState } from "./reducer";
import { Action, State } from "../typed/app";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const AppContext = React.createContext<any>(null);// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const AppContext = React.createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: appState,
    dispatch: () => undefined,
});