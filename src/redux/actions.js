import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'
import { reqLogin } from '../api/index'
import storageUtile from '../utils/storageUtile'

//同步action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

export const logout = () => {
    storageUtile.removeUser()
    return { type: RESET_USER }

}

//异步action
export const Login = (username, passworld) => {
    return async dispath => {
        const result = await reqLogin(username, passworld);
        if (result.status === 0) {
            const user = result.data
            storageUtile.saveUser(user)
            dispath(receiveUser(user))
        } else {
            const msg = result.msg;
            dispath(showErrorMsg(msg))
        }
    }
}
