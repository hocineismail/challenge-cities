import { City } from "./cities";
// Type of action used to manage the global state
export type Action =
    | { type: "SET_CITY"; payload: { city: City } }
    | { type: "TOGGLE_MODAL" }
    | { type: "SET_THEME"; payload: { theme: string } };

// Type of the global state of the application
export type State = {
    city: City | null;
    isModalVisible: boolean;
    theme: string | null
}
