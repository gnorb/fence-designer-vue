<template>
    <div style="overflow: hidden; min-height: 100vh;">
        <b-row id="headerRow" ref="headerRow">
            <b-col>
                <Header></Header>
            </b-col>
        </b-row>
        <b-row id="contentRow" ref="contentRow">
            <b-col>
                <Loader v-if="displayLoader"></Loader>
                <b-container fluid>
                    <router-view></router-view>
                </b-container>
            </b-col>
        </b-row>
        <b-row id="footerRow" ref="footerRow" class="mt-4">
            <b-col>
                <Footer></Footer>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Header from "./views/Layout/Header";
import Footer from "./views/Layout/Footer";
import Loader from "./views/Layout/Loader";
export default {
    name: 'Layout',
    components: {
        Header,
        Footer,
        Loader
    },
    watch: {
        '$route' (to) {
            if (to.meta && to.meta.title) {
                document.title = this.$t(to.meta.title) + ' | ' + this.$t('appName')
            } else {
                document.title = this.$t('appName')
            }

        },
    },
    computed: {
        aspect: function () {
            return this.$store.state.aspect
        },
        displayLoader: function () {
            return this.$store.state.displayLoader
        }
    },
    methods: {
        // setContentHeight () {
        //     let height = this.windowHeight - (this.headerHeight + this.footerHeight)
        //     this.$refs.contentRow.style.height = height
        // }
    }
}
</script>