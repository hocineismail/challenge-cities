import { City } from "./cities";



export type Action =
    | { type: "SET_CITY"; payload: { city: City } }
    | { type: "TOGGLE_MODAL" }
    | { type: "SET_THEME"; payload: { theme: string } };
export interface State {
    city: City | null;
    isModalVisible: boolean;
    theme: string | null
}
