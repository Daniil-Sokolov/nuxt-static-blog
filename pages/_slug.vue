<template>
  <div class="article">
    <section class="header">
      <p><nuxt-link to="/">Home</nuxt-link></p>

      <nuxt-link v-if="previous" :to="{ name: 'slug', params: { slug: previous, animation: 'slide-right' }}">&lt; Prev</nuxt-link>
      <a v-else class="disabled">&lt; Prev</a>
      <nuxt-link v-if="next" :to="{ name: 'slug', params: { slug: next, animation: 'slide-left' }}">Next &gt;</nuxt-link>
      <a v-else class="disabled">Next &gt;</a>
      <h1>{{ title }}</h1>
    </section>
    <section :class="section.width" v-for="section in sections" v-html="section.content"></section>
  </div>
</template>

<script>

import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/monokai.css'
['javascript', 'python', 'bash', 'css', 'lua'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

export default {

  transition(to, from) {
    if (!from || from.name === 'index') {
      return 'slide-up'
    }
    if (to.name === 'index') {
      return 'slide-up'
    }
    return 'animation' in to.params ? to.params.animation : 'slide-up'
  },
  methods: {
    handleKeyPress(e) {
      if (e.key === 'ArrowRight' && this.next) {
        this.$router.push({
          name: 'slug',
          params: {
            slug: this.next,
            animation: 'slide-left'
          }
        })
      } else if (e.key === 'ArrowLeft' && this.previous) {
        this.$router.push({
          name: 'slug',
          params: {
            slug: this.previous,
            animation: 'slide-right'
          }
        })
      }
    }
  },
  mounted: function() {
    window.addEventListener('keypress', this.handleKeyPress)
    document.querySelectorAll('code').forEach(function(e) {
      console.log('highlighting ', e)
      hljs.highlightBlock(e)
    })
  },
  beforeDestroy: function() {
    window.removeEventListener('keypress', this.handleKeyPress)
    console.log('DESTROYED')
  },
  async asyncData(context) {
    const slug = context.params.slug
    const index = context.store.state.posts.reduce((index, p, i) => {
      if (p.slug === slug) return i
      return index
    }, -1)
    if (index === -1) return

    const post = context.store.state.posts[index]
    const previous = index > 0 ? context.store.state.posts[index - 1].slug : null
    const next = context.store.state.posts.length > index + 1
      ? context.store.state.posts[index + 1].slug : null
    return ({
      previous,
      next,
      title: post.title,
      sections: post.sections
    })
  }
}
</script>

<style scoped> 
</style>
