/**
 * 包含应用中所有接口请求函数的模块
 */
import api from './api'
//登录
export const reqLogin = (username, password) => api('/login', { username, password }, 'POST')
//获取分类列表
export const reqCategorys = (parentId) => api('/manage/category/list', { parentId }, 'GET')
//添加分类
export const reqAddCategory = (parentId, categoryName) => api('/manage/category/add', { parentId, categoryName }, 'POST')
//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => api('/manage/category/update', { categoryId, categoryName }, 'POST')
//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => api('/manage/product/list', { pageNum, pageSize }, 'GET')
//搜索商品分页列表
export const reqSearchProducts = ({ pageNum, pageSize, searchName, seachType }) => api('/manage/product/search', { pageNum, pageSize, [seachType]: searchName }, 'GET')
//获取分类
export const reqCategory = (categoryId) => api('/manage/category/info', { categoryId }, 'GET')
//更新商品的状态
export const reqUpdateStatus = (productId, status) => api('/manage/product/updateStatus', { productId, status }, 'POST')

