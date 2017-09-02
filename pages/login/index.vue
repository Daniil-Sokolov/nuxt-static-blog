<template>
	<div class="cont">
		<form v-on:submit.prevent="login()">
			<input v-model="password">
			<button type="submit">Login</button>
      <div class="error">{{ error }}</div>
		</form>
	</div>
</template>

<script>
export default {
  data: function() {
    return { password: '', error: '' }
  },
  beforeCreate: function() {
    if (this.$store.state.token) {
      this.$store.dispatch('verifyToken', this.$store.state.token)
        .then(valid => {
          if (valid) this.$router.push({ path: '/admin' })
        })
    }
  },
  methods: {
    login() {
      this.error = ''
      this.$store.dispatch('login', this.password)
        .then(res => {
          console.log(res)
          this.$store.commit('SET_TOKEN', res.data.token)
          this.$store.commit('SET_TOKEN_COOKIE', res.data.token)
          this.$router.push({ path: '/admin' })
        }).catch(e => {
          this.error = e.response.data.error
        })
    }
  }
}
</script>

<style scoped>
  .error {
    min-height: 40px;
    text-align: center;
    color: #a33;
    margin: 10px;
  }
	.cont {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>