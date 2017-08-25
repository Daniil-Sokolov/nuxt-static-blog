import Vuex from 'vuex'
import axios from 'node-fetch'

const BASE_URL = 'http://localhost:3001/api'
const api = (url) => BASE_URL + url

const get = (url, query) => axios(api(url) + stringifyQuery(query))
const post = (url, body, query) => fetcher(api(url), 'POST', body)
// const put = (url, body, query) => fetcher(api(url), 'PUT', body)
// const del = (url, body, query) => fetcher(api(url), 'DELETE', body)

const fetcher = (url, method, body, query) => {
  const finalurl = query ? url + stringifyQuery(query) : url
  const payload = {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {}
  }
  console.log(payload)
  return axios(finalurl, payload)
}

const stringifyQuery = query => {
  let output = '?'
  if (typeof query !== 'object' || Object.keys(query).length === 0) return ''

  for (let key in query) {
    if (query[key] !== null) {
      if (output !== '?') output += '&'
      output += `${key}=${encodeURIComponent(query[key])}`
    }
  }
  return output
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      categories: []
    },
    actions: {
      async nuxtServerInit({ commit }, { req }) {
        const response = await get('/posts')
        commit('SET_POSTS', response.data)
      },
      getCategories() {
        return get('/categories')
      },
      saveCategory(context, body) {
        console.log(body)
        return post('/categories', body)
      }
    },
    mutations: {
      SET_POSTS(state, data) {
        state.posts = data
      }
    }
  })
}

export default createStore
