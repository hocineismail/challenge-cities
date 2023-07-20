import { City } from "./cities";

export interface AppInit {
    city: City | null;
    isModalVisible: boolean;
    theme: string | null
}
export interface AppActionType {
    city: City | null;
    isModalVisible?: boolean;
    theme?: string | null
}
export interface AppAction {
    type: string;
    payload: AppActionType
}