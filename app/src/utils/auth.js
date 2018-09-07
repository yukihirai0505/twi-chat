import { auth } from '../config/firebase'


export const getUserName = () => auth.currentUser.displayName
export const getPhotoURL = () => auth.currentUser.photoURL
