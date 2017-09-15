<template>
  <div class="transition">
    <div class='backlink'><nuxt-link class="novisited" :to="'/blog/'">Back to blog</nuxt-link></div>
    <h1 class="megatitle">{{ category.name }}</h1>
    <img class="mainbanner" :src="'/'+category.banner" alt="">
    <section>
      <p><h2 class="description nomargin">{{ category.description }}</h2></p>
      <hr>
      <div class="item transition" v-for="post in posts">
        <nuxt-link :to="'/blog/'+post.category.slug+'/'+post.slug" v-if="post.banner">
          <img :src="'/'+post.banner" alt=''>
        </nuxt-link>
        <div class="title"><nuxt-link :to="'/blog/'+post.category.slug+'/'+post.slug">
          <h3>{{ post.title }}</h3>
        </nuxt-link></div>
        <p>{{ post.subtitle }}</p>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  transition(to, from) {
    if (!from || from.name === 'blog') {
      return 'slide-up'
    }
    return 'slide-down'
  },
  head() {
    return {
      title: this.category.name + ' | Jonniek blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.description
        },
        {
          propery: 'og:description',
          content: this.category.description
        },
        {
          property: 'og:title',
          content: this.category.name + ' | Jonniek blog'
        }
      ]
    }
  },
  async asyncData(context) {
    const categorySlug = context.params.category
    const posts = context.store.state.posts.filter(p =>  p.category.slug === categorySlug)
    const category = posts[0].category
    return {
      category,
      posts
    }
  }
}
</script>

<style>
</style>