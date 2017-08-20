<template>
  <div class="article">
    <div class="content">
      <p><nuxt-link to="/">Home</nuxt-link></p>

      <nuxt-link v-if="previous" :to="{ path: '/'+previous, query: { t: 'l'}}">&lt; Prev</nuxt-link>
      <a v-else class="disabled">&lt; Prev</a>
      <span>{{ page }}/{{ totalPages }}</span>
      <nuxt-link v-if="next" :to="{ path: '/'+next }">Next &gt;</nuxt-link>
      <a v-else class="disabled">Next &gt;</a>
      <h1>{{ title }}</h1>
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>

console.log()

export default {

  transition(to, from) {
    if (!from) return 'slide-right'
    return 't' in to.query ? 'slide-right' : 'slide-left'
  },
  methods: {
    handleKeyPress(e){
      if(e.key === "ArrowRight" && this.next){
        this.$router.push('/'+this.next)
      }else if(e.key === "ArrowLeft" && this.previous){
        this.$router.push('/'+this.previous)
      }
    }
  },
  mounted: function() {
    window.addEventListener('keypress', this.handleKeyPress);
  },
  beforeDestroy: function() {
    window.removeEventListener('keypress', this.handleKeyPress);
  },
  async asyncData(context) {
    const slug = context.params.slug
    const index = context.store.state.posts.reduce( (index, p, i) => {
      if(p.slug===slug) return i
      return index
    }, -1)
    if (index === -1) return

    const post = context.store.state.posts[index]
    const previous = index > 0 ? context.store.state.posts[index-1].slug : null
    const next = context.store.state.posts.length > index + 1 ?
      context.store.state.posts[index+1].slug : null
    return ({
      previous,
      next,
      title: post.title.rendered,
      content: post.content.rendered
    })
  }
}

</script>

<style scoped> 
  .article {
    max-width: 1100px;
    margin:auto;
  }
  .content{
    width: 100%;
    max-width: 770px;
    padding:15px;
    margin: auto;
  }
</style>
