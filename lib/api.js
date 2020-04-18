const axios = require('axios')

const isServer = typeof window === 'undefined'
// const BASE_URL =  process.env.NODE_ENV === 'development'
//   ? 'http://localhost:3003/' : 'https://apiblog.shyshyshy.icu/'
const BASE_URL =  process.env.NODE_ENV === 'development'
  ? 'https://apiblog.shyshyshy.icu/' : 'https://apiblog.shyshyshy.icu/'
async function get(url, params) {
  console.log('BASE_URL', BASE_URL)
  return await axios.get(`${BASE_URL}${url}`, { params })
}

async function post(url, data) {
  const params = new FormData()
  if (!data) return null
  Object.getOwnPropertyNames(data).forEach(key => {
    params.append(key, data[key])
  })
  console.log('data to post', params)
  return await axios.post(`${BASE_URL}${url}`, params,{
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
}

async function submitPost(data) {
  return await post('api/post/submitPost', data)
}

async function getIndexData(pageNumber, pageSize = 10 ) {
  return await get('api/post/getIndexData', { pageNumber, pageSize })
}

async function getTableData(tableName, tableType) {
  console.log('getTableData', tableType, tableName)
  return await get('api/post/getTableData', { tableName, tableType})
}

async function getPostDetail(postId) {
  console.log('getPostDetail', postId)
  return await get('api/post/getPostDetail', { postId })
}

async function deletePost(postId, adminCode) {
  return await post('api/post/deletePost', { postId, adminCode })
}

async function adminLogin(username, password) {
  return await post('api/post/login', { username, password })
}


module.exports = {
  submitPost,
  getIndexData,
  getTableData,
  getPostDetail,
  deletePost,
  adminLogin
}
