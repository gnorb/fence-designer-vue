<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  name: 'App',
  beforeCreate() {
    if (!this.$cookies.get('FD_APP_ACCESS_TOKEN')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass">
  @import '../node_modules/bootstrap/scss/bootstrap.scss'
  /*@import './assets/sass/bootstrap/custom-vars.scss'*/
  @import './assets/sass/style.scss'
</style>
