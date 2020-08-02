import { combineReducers } from 'redux'
import storageUtile from '../utils/storageUtile'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'


//头部reducer
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

//当前登录用户reducer
const initUser = storageUtile.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return { ...state, errorMsg }
        case RESET_USER:
            return {}
        default:
            return state
    }
}

//向外默认暴露的是合并产生总的reducer函数
export default combineReducers({
    headTitle,
    user
})
