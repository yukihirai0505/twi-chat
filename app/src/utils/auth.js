import { auth } from '../config/config'


export const getUserName = () => auth.currentUser.displayName
export const getPhotoURL = () => auth.currentUser.photoURL
