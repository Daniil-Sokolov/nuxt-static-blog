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
      nuxtServerInit({ commit }, { req }) {
        return axios.all([get('/posts'), get('/categories')])
          .then(axios.spread(function(postsRes, catRes) {
            let pdata = postsRes.data
            let cdata = catRes.data

            let categories = {}
            for (let index in cdata) {
              categories[cdata[index]._id] = cdata[index]
            }

            for (let index in pdata) {
              pdata[index].category = categories[pdata[index].category]
            }
            commit('SET_POSTS', pdata)
            commit('SET_CATEGORIES', cdata)
          }))
      },
      saveCategory(context, body) {
        return post('/categories', body)
      },
      savePost(context, body) {
        return post('/posts', body)
      }
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
