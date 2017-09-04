<template>
  <div class="front">
    <h1>
      Jonniek blog
    </h1>
    <section>
      
      <h2>Categories</h2>
      <hr>
      <div class="category transition" v-for="category in categories">
        <img v-if="category.banner!==''" :src="category.banner" alt=''>
        
        <div class="title"><nuxt-link :to="'/'+category.slug">
          <h3>{{ category.name }}</h3>
        </nuxt-link></div>
        <p>{{ category.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  transition(from, to) {
    if (from && from.name === 'category') {
      return 'slide-up'
    }
    return 'slide-down'
  },
  async asyncData(context) {
    const categories = context.store.state.posts.reduce((categories, post) => {
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
h1{
  display: block;
  text-align: center;
  font-size: 50px;
  font-size: 10vw;
  font-weight: bold;
  color: #35495e;
  letter-spacing: 1px;
}
@media (min-width: 1100px){
  h1{
    font-size: 110px;
  }
}
h2{
  color: #35495e;
  text-align: center
}
.title{
  text-align: center;
  margin:10px 0;
  font-size: 20px;
}
.title a{
  display: inline-block;
}
.category{
  display: inline-block;
  width: 33%;
  vertical-align: top;
  padding: 10px 15px;
}
.category p{
  text-align: center; 
  max-width: 350px;
  margin:auto;
}
@media (max-width: 780px){
  .category{
    width: 100%;
  }
}
@media (max-width: 580px){
  .category{
    width: 100%;
  }
  h1{
    font-size: 40px;
  }
}
</style>
