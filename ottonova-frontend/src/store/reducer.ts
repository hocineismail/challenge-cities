

import { SET_CITY, TOGGLE_MODAL, SET_THEME, } from "../constants/store";
import { Action, State } from "../typed/app";

export const appState: State = {
    city: null,
    isModalVisible: false,
    theme: null,
};

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
function setThemeStorage(theme: string): void {
    window.localStorage.setItem("theme", theme)
}