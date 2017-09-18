<template>
  <div class="transition">
    <div class='backlink'>
      <nuxt-link
        class="novisited"
        :to="'/blog/'+post.category.slug"
      >Back to {{ post.category.name}}</nuxt-link>
    </div>
    <section class="header">

      <nuxt-link
        class="prevlink novisited"
        v-if="previous"
        :to="{ name: 'category-slug', params: { slug: previous, animation: 'slide-right' }}"
      >&lt; Prev</nuxt-link>
      <a v-else class="disabled prevlink">&lt; Prev</a>

      <nuxt-link
        class="nextlink novisited"
        v-if="next"
        :to="{ name: 'category-slug', params: { slug: next, animation: 'slide-left' }}"
      >Next &gt;</nuxt-link>
      <a v-else class="disabled nextlink">Next &gt;</a>

      <h1>{{ post.title }}</h1>
      <h2>{{ post.subtitle }}</h2>
      <hr>

      <div class='post-meta'>{{ formatDate(new Date(post.created)) }}</div>
    </section>
    <section :class="section.width" v-for="section in post.sections" v-html="section.content"></section>
  </div>
</template>

<script>
/*
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/pojoaque.css'
['javascript', 'python', 'bash', 'css', 'lua'].forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
}) */

export default {
  transition(to, from) {
    return 'slide-up'
  },
  head() {
    return {
      title: `${this.post.title} | ${this.post.category.name} | Jonniek blog`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.subtitle
        },
        {
          propery: 'og:description',
          content: this.post.subtitle
        },
        {
          property: 'og:title',
          content: `${this.post.title} | ${this.post.category.name}`
        }
      ]
    }
  },
  methods: {
    handleKeyPress(e) {
      if (e.key === 'ArrowRight' && this.next) {
        this.$router.push({
          name: 'category-slug',
          params: {
            slug: this.next,
            animation: 'slide-left'
          }
        })
      } else if (e.key === 'ArrowLeft' && this.previous) {
        this.$router.push({
          name: 'category-slug',
          params: {
            slug: this.previous,
            animation: 'slide-right'
          }
        })
      }
    },
    formatDate(date) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const month = date.getUTCMonth() + 1
      return `${date.getUTCDate()} ${months[month]} ${date.getUTCFullYear()}`
    }
  },
  mounted: function() {
    window.addEventListener('keypress', this.handleKeyPress)
    /* document.querySelectorAll('code').forEach(function(e) {
      hljs.highlightBlock(e)
    }) */
  },
  beforeDestroy: function() {
    window.removeEventListener('keypress', this.handleKeyPress)
  },
  async asyncData(context) {
    const slug = context.params.slug
    const category = context.params.category
    const posts = context.store.state.posts.filter(p => p.category.slug === category)
    const index = posts.reduce((index, p, i) => {
      if (p.slug === slug) return i
      return index
    }, -1)
    if (index === -1) return

    const post = posts[index]
    const previous = index > 0 ? posts[index - 1].slug : null
    const next = posts.length > index + 1
      ? posts[index + 1].slug : null
    return ({
      previous,
      next,
      post
    })
  }
}
</script>

