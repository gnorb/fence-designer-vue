import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import moment from 'moment'
import i18n from './assets/languages/languages.js'
import VueCookies from 'vue-cookies'
import VueForm from 'vue-form'
import { ClientTable} from 'vue-tables-2'
import VTooltip from 'v-tooltip'
import VueCountdown from '@chenfengyuan/vue-countdown';

i18n.locale = 'pl'

Vue.use(VTooltip)
Vue.use(ClientTable)
Vue.use(BootstrapVueIcons)
Vue.use(VueCookies)
Vue.use(VueForm)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(require('vue-cookies'))
Vue.component(VueCountdown.name, VueCountdown)

// locale.use(lang) // to change if more languages will be available
Vue.prototype.$lang = i18n

Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
store.state.url = 'http://localhost:8000'
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:8000'
Vue.prototype.$axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + VueCookies.get('FD_APP_ACCESS_TOKEN'),
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data'
}

setInterval(function() {
  if (router.history.current.name !== 'Login' && (!(this.$cookies.get('FD_APP_USER_NAME')) || !(this.$cookies.get('FD_APP_ACCESS_TOKEN')) || !(this.$cookies.get('FD_APP_EXP_DATE')))) {
    router.push('/login')
  }
},
500);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
