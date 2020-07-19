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
//删除图片
export const resDeleteImg = (name) => api('/manage/img/delete', { name }, 'POST');
//添加商品
export const resAddOrUpdateProduct = (product) => api('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');
//获取所有角色列表
export const reqRoles = () => api('/manage/role/list', 'GET')
//获取添加角色
export const reqAddRole = (roleName) => api('/manage/role/add', roleName, 'POST')
//获取更新角色
export const reqUpdataRole = (role) => api('/manage/role/update', role, 'POST')
//获取用户列表
export const reqUsers = () => api('/manage/user/list', 'GET')
//获取删除列表
export const reqDeleteUser = (userId) => api('/manage/user/delete', {userId}, 'POST')
//获取添加用户
export const reqAddOrUpdateUser = (user) => api('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')











