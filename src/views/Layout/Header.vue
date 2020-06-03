<template>
    <b-row>
        <b-col>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="javascript:void(0)" @click="changeRouter('/')">FenceDesigner</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item @click="changeRouter('/fenceconfiguration')">Konfiguracja ogrodzeń</b-nav-item>
<!--                        <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
<!--                        <b-nav-form>-->
<!--                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
<!--                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
<!--                        </b-nav-form>-->

<!--                        <b-nav-item-dropdown text="Lang" right>-->
<!--                            <b-dropdown-item href="#">EN</b-dropdown-item>-->
<!--                            <b-dropdown-item href="#">ES</b-dropdown-item>-->
<!--                            <b-dropdown-item href="#">RU</b-dropdown-item>-->
<!--                            <b-dropdown-item href="#">FA</b-dropdown-item>-->
<!--                        </b-nav-item-dropdown>-->

<!--                        <b-nav-item-dropdown text="Aspect" right v-model="chosenAspect">-->
<!--                            <template v-for="(aspect, index) in aspects">-->
<!--                                <b-dropdown-item :key="'aspect-' + index" :active="aspect.text === chosenAspect" @click="changeAspect(aspect.value)">{{ aspect.text }}</b-dropdown-item>-->
<!--                            </template>-->
<!--                        </b-nav-item-dropdown>-->

                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <em>{{ username }}</em>
                            </template>
                            <b-dropdown-item href="#">{{ $t('views.layout.header.profile') }}</b-dropdown-item>
                            <b-dropdown-item @click="logout()">{{ $t('views.layout.header.signOut') }}</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item>
                            <countdown :time="expirationDate">
                                <template slot-scope="props">{{ $t('views.layout.header.autoLogOut1') }} {{ props.minutes }} {{ $t('views.layout.header.autoLogOut2') }}</template>
                            </countdown>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            aspects: [
                { text: '4:3 (SD)', value: '4:3' },
                { text: '1:1 (Square)', value: '1:1' },
                { text: '16:9 (HD)', value: '16:9' },
                { text: '1.85:1 (Widescreen)', value: '1.85:1' },
                { text: '2:1 (Univisium/Superscope)', value: '2:1' },
                { text: '21:9 (Anamorphic)', value: '21:9' },
                { text: '1.43:1 (IMAX)', value: '1.43:1' },
                { text: '3:2 (35mm Film)', value: '3:2' },
                { text: '3:1 (APS-P)', value: '3:1' },
                { text: '4/3 (Same as 4:3)', value: 4 / 3 },
                { text: '16/9 (Same as 16:9)', value: 16 / 9 },
                { text: '3 (Same as 3:1)', value: 3 },
                { text: '2 (Same as 2:1)', value: 2 },
                { text: '1.85 (Same as 1.85:1)', value: 1.85 },
                { text: '1.5', value: 1.5 },
                { text: '1 (Same as 1:1)', value: 1 }
            ]
        }
    },
    computed: {
        chosenAspect: function () {
            return this.$store.state.aspect
        },
        username: function () {
            return this.$cookies.get('FD_APP_USER_NAME')
        },
        expirationDate: function () {
            return this.$moment.unix(this.$cookies.get('FD_APP_EXP_DATE')).diff(this.$moment(), 'miliseconds')
        }
    },
    methods: {
        changeRouter (url) {
            this.$router.push(url)
        },
        changeAspect (value) {
            this.$store.state.aspect = value
        },
        logout () {
            this.$store.state.user.id = 0
            this.$store.state.user.username = ''
            this.$store.state.user.email = ''
            this.$store.state.user.roles = []
            this.$store.state.user.expiration = ''
            this.$cookies.remove('FD_APP_ACCESS_TOKEN')
            this.$cookies.remove('FD_APP_USER_NAME')
            this.$cookies.remove('FD_APP_EXP_DATE')
            this.$router.push('/login')
        }
    }
}
</script>