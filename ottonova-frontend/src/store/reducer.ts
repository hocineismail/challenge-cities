

import { SET_CITY, TOGGLE_MODAL, SET_THEME, } from "../constants/store";
import { Action, State } from "../typed/app";
import { setThemeStorage } from "../utils/helper";

export const appState: State = {
    city: null, // details of the city, like, name, name-native...
    isModalVisible: false, // isModalVisible is the status of the Modal is visible or not, the default value is false
    theme: null, // currently selected theme for the application, 
};

// appReducer is the application's reducer function, responsible for updating the state based on dispatched actions.
// It takes two parameters: 'state', which represents the current state, and 'action', the dispatched action object.

// - 'SET_CITY': Updates the 'city' with city details and sets 'isModalVisible' to true.
// - 'TOGGLE_MODAL': Resets 'city' to null and sets 'isModalVisible' to false.
// - 'SET_THEME': Sets the selected 'theme' and saves it to the local storage using 'setThemeStorage' helper function.

// The default case throws an error to handle any unknown action types.
export const appReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state,
                city: action.payload.city,
                isModalVisible: true
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                city: null,
                isModalVisible: false
            }
        case SET_THEME:
            setThemeStorage(action.payload.theme)
            return {
                ...state,
                theme: action.payload.theme
            }
        default:
            throw new Error();
    }
}

