import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

const BASE_URL = 'http://localhost:3000/api'
const api = (url) => BASE_URL + url

const get = (url, query) => fetch(api(url), 'GET', null, query)
const post = (url, body, query) => fetcher(api(url), 'POST', body, query)
// const put = (url, body, query) => fetcher(api(url), 'PUT', body, query)
// const del = (url, body, query) => fetcher(api(url), 'DELETE', body, query)

const fetcher = (url, method, body, query) => {
  const finalurl = query ? url + stringifyQuery(query) : url
  let payload = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  if (body) {
    payload.body = JSON.stringify(body)
  }
  return fetch(finalurl, payload)
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
      categories: [],
      token: ''
    },
    actions: {
      async nuxtServerInit({ commit }, { req }) {
        const response = await get('/posts')
        const data = await response.json()
        commit('SET_POSTS', data)

        const catres = await get('/categories')
        const catdata = await catres.json()
        commit('SET_CATEGORIES', catdata)

        if (req.cookies && req.cookies.token) {
          commit('SET_TOKEN', req.cookies.token)
        }
      },
      saveCategory(context, body) {
        return post('/categories', body)
      },
      savePost(context, body) {
        return post('/posts', body)
      },
      login({ commit }, { password }) {
        return post('/login', { password })
      },
      verifyToken({ commit }, { token }) {
        return post('/verifytoken', { token })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            return res.success
          })
          .catch(e => {
            console.warn(e)
            return false
          })
      }
    },
    mutations: {
      SET_POSTS(state, data) {
        state.posts = data
      },
      SET_CATEGORIES(state, data) {
        state.categories = data
      },
      SET_TOKEN_COOKIE: function(state, token) {
        if (typeof document !== 'undefined') {
          let exp = new Date()
          exp.setDate(exp.getDate() + 14)
          document.cookie = `token=${token};expires=${exp.toUTCString()}`
        }
      },
      SET_TOKEN: function(state, token) {
        state.token = token
      }
    }
  })
}

export default createStore
