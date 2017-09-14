<template>
  <div class="transition main">
    <div class='backlink'><nuxt-link class="novisited" :to="'/blog/'">Back to blog</nuxt-link></div>
    <h1 class="big">{{ category.name }}</h1>
    <img class="mainbanner" :src="'/'+category.banner" alt="">
    <section>
      <p class="description">{{ category.description }}</p>
      <hr>
      <div class="article transition" v-for="post in posts">
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

<style scoped>
.main {
  text-align: center;
}
section {
  text-align: left;
}
h1{
  display: block;
  text-align: center;
  font-size: 50px;
  font-size: 8vw;
  font-weight: bold;
  color: #35495e;
  letter-spacing: 1px;
  margin:20px 0;
}
@media (min-width: 1100px){
  h1{
    font-size: 80px;
  }
}
h2{
  color: #35495e;
  text-align: center
}
.description{
  max-width: 400px;
  margin:30px auto 60px auto;
  text-align: center;
}
.title{
  text-align: center;
  margin:10px 0;
  font-size: 20px;
}
.title a{
  display: inline-block;
}
.article{
  display: inline-block;
  width: 33%;
  vertical-align: top;
  padding: 10px 15px;
}
.article p{
  text-align: center;
  max-width: 350px;
  margin:auto;
}
@media (max-width: 780px){
  .article{
    width: 50%;
  }
}
@media (max-width: 580px){
  .article{
    width: 100%;
  }
  h1{
    font-size: 40px;
  }
}
</style>