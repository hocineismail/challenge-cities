

import { OPEN_MODAL, CLOSE_MODAL, SWITCH_THEME, } from "../constants/store";
import { City } from "../typed/cities";


export interface AppInit {
    city: City | null;
    isModalVisible: boolean;
    theme: string | null
}

export interface AppAction {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any
}
export const appState: AppInit = {
    city: null,
    isModalVisible: false,
    theme: null
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function appReducer(state: AppInit, action: AppAction): any {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                city: action.payload,
                isModalVisible: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                city: null,
                isModalVisible: false
            }
        case SWITCH_THEME:
            return {
                ...state,
                theme: action.payload === "DARK" ? action.payload : state.theme === "DARK" ? "LIGHT" : "DARK"
            }
        default:
            throw new Error();
    }
}
