<template>
    <div id="loginBox">
        <b-card>
            <b-row>
                <b-col>
                    <h5 class="text-center">{{ $t('views.login.header') }}</h5>
                </b-col>
            </b-row>
            <vue-form :state="formstate" @submit.prevent="login">
                <b-row class="mt-2">
                    <b-col>
                        <b-alert variant="danger" :show="wrongData" class="text-center">{{ $t('views.login.wrongData') }}</b-alert>
                        <p class="text-center mb-1">{{ $t('views.login.email') }}:</p>
                        <b-form-input
                                v-model="data.username"
                                type="text"
                                class="text-center"
                                :placeholder="$t('views.login.email')"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col>
                        <p class="text-center mb-1">{{ $t('views.login.password') }}:</p>
                        <b-form-input
                                v-model="data.password"
                                type="password"
                                class="text-center"
                                :placeholder="$t('views.login.password')"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col>
                        <b-btn v-if="!sending" variant="success" class="w-100" type="submit">{{ $t('views.login.login') }}</b-btn>
                        <b-btn v-else-if="sending" variant="success" class="w-100" disabled>
                            <b-spinner small type="grow"></b-spinner>
                            {{ $t('views.login.logging') }}...
                        </b-btn>
                    </b-col>
                </b-row>
            </vue-form>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
    name: 'Login',
    data () {
        return {
            formstate: {},
            data: {
                username: '',
                password: ''
            },
            sending: false,
            wrongData: false
        }
    },
    methods: {
        login () {
            this.wrongData = false
            this.sending = true
            let data = this.data
            this.$axios
                .post('/api/auth/login', data)
                .then((response) => {
                    this.$cookies.set('FD_APP_ACCESS_TOKEN', response.data.token)
                    this.$cookies.set('FD_APP_USER_NAME', response.data.userdata.username)
                    this.$store.state.user.id = response.data.userdata.id
                    this.$store.state.user.username = response.data.userdata.username
                    this.$store.state.user.email = response.data.userdata.email
                    this.$store.state.user.roles = response.data.userdata.roles
                    this.$axios.defaults.headers.common = {
                        'Authorization': 'Bearer ' + VueCookies.get('FD_APP_ACCESS_TOKEN')
                    }
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.wrongData = true
                    console.log(error)
                })
                .finally(() => {
                    this.sending = false
                })
        }
    }
}
</script>