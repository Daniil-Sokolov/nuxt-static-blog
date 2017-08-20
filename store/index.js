import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: []
    },
    actions: {
      async nuxtServerInit({ commit }, { req }) {
        const response = await axios.get('http://localhost/wp-json/wp/v2/posts')
        commit("SET_POSTS", response.data)
      }
    },
    mutations: {
      SET_POSTS(state, data){
        state.posts = data
      }
    }
  })
}

export default createStore