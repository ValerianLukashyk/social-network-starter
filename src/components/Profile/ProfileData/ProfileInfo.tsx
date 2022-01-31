import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './ProfileInfo.module.css'
import userPhoto from '../../../img/user.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileText from './ProfileText'
import ProfileTextFormReduxForm from './ProfileTextForm'
import { ProfileType } from '../../../types/types'
import { LoadingOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { getUserProfile } from '../../../Redux/Selectors/profile-selectors'
import { savePhoto, saveProfile, updateStatus } from '../../../Redux/profileReducer'
import { AppStateType } from "../../../Redux/redux-store";
import { useParams } from 'react-router-dom';


const ProfileInfo: React.FC = () => {
    let [editMode, setEditMode] = useState(false)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const params = useParams<{ userID: any }>()
    const isOwner = !params.userID
    const profile = useSelector(getUserProfile)

    const dispatch = useDispatch()

    if (!profile) {
        return <LoadingOutlined style={{
            fontSize: 58,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: ' 35vh auto'
        }} />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const onSubmit = (formData: ProfileType) => {
        try {
            dispatch(saveProfile(formData))
            setEditMode(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
            <div className={s.profileInfo}>
                <div className={s.userBlocks}>
                    <label htmlFor="file">
                        <Tooltip placement="bottomLeft" title={'Click to change photo'}>
                            <img
                                alt={profile.fullName}
                                src={profile.photos.large ? profile.photos.large : userPhoto}
                                className={s.ava}
                            />
                        </Tooltip>
                    </label>
                    {isOwner &&
                        <input type={'file'} accept="image/png, .jpeg, .jpg, image/gif" id={'file'} className={s.inputImg}
                            onChange={onMainPhotoSelected} />}
                </div>
                <div className={s.userBlocks}>
                    {editMode
                        ? <ProfileTextFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
                        : <ProfileText
                            goToEditMode={() => {
                                setEditMode(true)
                            }}
                            profile={profile}
                            isOwner={isOwner}
                        />}
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo