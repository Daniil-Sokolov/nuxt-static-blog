<template>
  <div>
    <h1 class="megatitle bold">
      Jonniek
    </h1>
    <section>
      <h2 class="description"></h2>
      <hr>
      <div class="item transition">
        <div class="title"><nuxt-link :to="'/blog'">
          <h3>Blog</h3>
        </nuxt-link></div>
        <p>I write about stuff I find interesting or useful</p>
      </div>
    </section>
    <section class="footer">
    </section>
  </div>
</template>

<script>
export default {
  transition: 'slide-down'
}
</script>
