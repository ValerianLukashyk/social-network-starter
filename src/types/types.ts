export type PostType = {
    id: number
    message: string
    like: number
    dislike: number
    userID: number | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type MessagesType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
export type ToggleIsFetchingType = {
    type: "TOGGLE_IS_FETCHING"
    isFetching: boolean
}

