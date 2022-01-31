import s from "./Profile.module.css";
import ProfileInfo from "./ProfileData/ProfileInfo";
import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TheWall from "./TheWall/TheWall";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { AppStateType } from "../../Redux/redux-store";
import {getUserProfile, getStatus, } from '../../Redux/profileReducer'

const Profile: React.FC = () => {
    const id = useSelector((state: AppStateType) => state.auth.id)
    const dispatch = useDispatch()
    const params = useParams<{userID?: any}>()
    const history = useHistory()
    
    const refreshProfile = useCallback(() => {
        let user: number | null = params.userID
        
        if (!user) {
            user = id
            if (!user) {
                //TODO: replace push with redirect
                history.push("/login")
            }
        }
        if (user) {
            dispatch(getUserProfile(user))
            dispatch(getStatus(user))
        } else {
            console.error("ID should exists in URI params or in state ('authorizedUserID')")
        }
    },[dispatch, params.userID, history, id])

    useEffect(()=>{
        refreshProfile()
    }, [refreshProfile])

    return (
        <div className={s.content}>
            <ProfileInfo />
            <TheWall />
        </div>
    );
};

export default Profile;
