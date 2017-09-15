<template>
  <div>
    <div class='backlink'><nuxt-link class="novisited" :to="'/'">Back to home</nuxt-link></div>
    <h1 class="megatitle">
      Jonniek blog
    </h1>
    <section>
      <h2 class="blu aligncenter">Categories</h2>
      <hr>
      <div class="item transition" v-for="category in categories">
        <nuxt-link :to="'/blog/'+category.slug">
          <img :src="'/'+category.banner" alt="">
        </nuxt-link>
        <div class="title"><nuxt-link :to="'/blog/'+category.slug">
          <h3>{{ category.name }}</h3>
        </nuxt-link></div>
        <p>{{ category.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  transition(to, from) {
    if (!from || from.name === 'index') {
      return 'slide-up'
    }
    return 'slide-down'
  },
  head() {
    return {
      title: 'Jonniek blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'I write about stuff I find interesting or useful'
        },
        {
          propery: 'og:description',
          content: 'I write about stuff I find interesting or useful'
        },
        {
          property: 'og:title',
          content: 'Jonniek blog'
        }
      ]
    }
  },
  async asyncData(context) {
    const categories = context.store.state.posts.reduce((categories, post) => {
      if (!post.category) return categories
      let unique = true
      for (let index in categories) {
        if (categories[index].slug === post.category.slug) {
          unique = false
        }
      }
      if (unique) { categories.push(post.category) }
      return categories
    }, [])
    return { categories }
  }
}
</script>

<style scoped>
</style>
