<template>
  <div class="transition">
    <div class='backlink'>
      <nuxt-link
        class="novisited"
        :to="'/blog/'+post.category.slug"
      >Back to {{ post.category.name}}</nuxt-link>
    </div>
    <section class="header">
      <div class="navlinks">
        <nuxt-link
          class="prevlink novisited"
          v-if="previous"
          :to="{ name: 'blog-category-slug', params: { slug: previous.slug, animation: 'slide-right' }}"
        >&lt;- {{ previous.title }}</nuxt-link>

        <nuxt-link
          class="nextlink novisited"
          v-if="next"
          :to="{ name: 'blog-category-slug', params: { slug: next.slug, animation: 'slide-left' }}"
        >{{ next.title }} -&gt;</nuxt-link>
      </div>

      <h1>{{ post.title }}</h1>
      <h2>{{ post.subtitle }}</h2>
      <hr>

      <div class='post-meta'>{{ formatDate(new Date(post.created)) }}</div>
    </section>
    <section :class="section.width" v-for="section in post.sections" v-html="section.content"></section>
    <section class="fat">
      <nuxt-link
        class="prevlink novisited"
        v-if="previous"
        :to="{ name: 'blog-category-slug', params: { slug: previous.slug, animation: 'slide-right' }}"
      >&lt;- {{ previous.title }}</nuxt-link>

      <nuxt-link
        class="nextlink novisited"
        v-if="next"
        :to="{ name: 'blog-category-slug', params: { slug: next.slug, animation: 'slide-left' }}"
      >{{ next.title }} -&gt;</nuxt-link>
    </section>
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
    return 'animation' in to.params ? to.params.animation : 'slide-up'
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
          name: 'blog-category-slug',
          params: {
            slug: this.next.slug,
            animation: 'slide-left'
          }
        })
      } else if (e.key === 'ArrowLeft' && this.previous) {
        this.$router.push({
          name: 'blog-category-slug',
          params: {
            slug: this.previous.slug,
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
      const month = date.getUTCMonth()
      return `${months[month]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
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
    const previous = index > 0 ? posts[index - 1] : null
    const next = posts.length > index + 1
      ? posts[index + 1] : null
    return ({
      previous,
      next,
      post
    })
  }
}
</script>

