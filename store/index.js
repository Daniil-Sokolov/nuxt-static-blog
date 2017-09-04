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
  const config = {
    method,
    data,
    params,
    url: BASE_URL + url
  }
  return axios(config)
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      categories: []
    },
    actions: {
      async nuxtServerInit({ commit }, { req }) {
        const post_res = await get('/posts')
        commit('SET_POSTS', post_res.data)

        let cat_res = await get('/categories')
        commit('SET_CATEGORIES', cat_res.data)

        if (req && req.cookies && req.cookies.token) {
          commit('SET_TOKEN', req.cookies.token)
        }
      },
    },
    mutations: {
      SET_POSTS(state, data) {
        state.posts = data
      },
      SET_CATEGORIES(state, data) {
        state.categories = data
      }
    }
  })
}

export default createStore
