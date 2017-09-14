<template>
  <div>
    <h1>
      Jonniek
    </h1>
    <section>
      <hr>
      <div class="category transition">
        <div class="title"><nuxt-link :to="'/blog'">
          <h3>Blog</h3>
        </nuxt-link></div>
        <p>I write about stuff I find interesting or useful</p>
      </div>
    </section>
    <section class="footer">
      <a href="https://github.com/jonniek/nuxt-static-blog" target="_blank" rel="noopener">About page on github</a>
    </section>
  </div>
</template>

<script>
export default {
  transition(to, from) {
    return 'slide-down'
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
.footer{
  margin: 20px auto;
  text-align: center;
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
