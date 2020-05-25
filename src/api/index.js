/**
 * 包含应用中所有接口请求函数的模块
 */
import api from './api'
//登录
export const reqLogin = (username, password) => api('/login', { username, password }, 'POST')


