import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const BASE_URL = 'http://localhost:3000/api'

const get = (url, params) => fetcher(url, 'GET', null, params)
const post = (url, data, params) => fetcher(url, 'POST', data, params)
// const put = (url, data, params) => fetcher(url, 'PUT', data, params)
// const del = (url, data, params) => fetcher(url, 'DELETE', data, params)

const fetcher = (url, method, data, params) => {
  let config = {
    method,
    data,
    params,
    url: BASE_URL + url
  }
  console.log(config)
  return axios(config)
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
        const { data } = await get('/posts')
        commit('SET_POSTS', data)

        const { catdata } = await get('/categories')
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
      login({ commit }, password) {
        return post('/login', { password })
      },
      logout({ commit }) {
        // TODO LOGOUT
      },
      verifyToken({ commit }, token) {
        return post('/verifytoken', { token })
          .then(res => {
            return true
          })
          .catch(e => {
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
