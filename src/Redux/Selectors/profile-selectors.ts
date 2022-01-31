import {AppStateType} from "../redux-store";


export const getUserProfile = (state: AppStateType) => {
    return state.profilePage.profile
}