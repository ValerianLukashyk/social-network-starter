import lfj from '../../../img/lfj.png'
import working from '../../../img/working.png'
import React from 'react'
import s from './ProfileInfo.module.css'
import Contacts from './Contacts/Contacts'
import {ContactsType, ProfileType} from '../../../types/types'
import {EditFilled, MailOutlined} from '@ant-design/icons'
import {Tooltip} from 'antd'
import {Link} from 'react-router-dom'


type ProfileTextType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileText: React.FC<ProfileTextType> = ({profile, isOwner, goToEditMode}) => {
    let userId = profile.userId
    
    return (
        <div className={s.userInfo}>
            <div className={s.userText}>
                <div className={s.name}>{profile.fullName}</div>
                <div className={s.text}>{profile.aboutMe}</div>
                <div className={s.lfj}><img alt={profile.aboutMe} className={s.job}
                                            src={profile.lookingForAJob ? lfj : working}/>
                    {profile.lookingForAJob ? <div>{profile.lookingForAJobDescription}</div> :
                        <div>Already Working</div>}
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap',}}>
                    {Object.keys(profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key}
                                         contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
                </div>
            </div>

            <Tooltip title={'Edit Profile'}>{isOwner &&
            <EditFilled style={{fontSize: '1.5em', position: 'absolute', right: 20, top: 20}}
                        onClick={goToEditMode}/>}</Tooltip>
            <Tooltip title={'Send Message'}>
                {!isOwner && <Link to={`/dialogs/${userId}`}><MailOutlined style={{fontSize: '1.5em', position: 'absolute', right: 20, top: 20}}/></Link>}
            </Tooltip>
        </div>
    )
}

export default ProfileText