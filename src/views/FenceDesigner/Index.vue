<template>
    <b-row>
        <b-col>
            <b-row>
                <b-col>
                    <GlobalSettings v-model="globalSettings"
                                    :fdConfigurationOptions="fdConfigurationOptions"
                                    :getFDConfigurationObjects="getFDConfigurationObjects"
                    ></GlobalSettings>
                </b-col>
            </b-row>
            <b-row v-if="globalSettings">
                <b-col>
                    <Canvas :globalSettings="globalSettings" :tabObjects="tabObjects"></Canvas>
                </b-col>
            </b-row>
            <b-row v-if="displayTabs">
                <b-col v-if="displayTabs">
                    <TabMain :fdConfigurationObjects="fdConfigurationObjects"
                             :globalSettings="globalSettings"
                             v-model="tabObjects"
                    ></TabMain>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import GlobalSettings from './components/GlobalSettings'
import Canvas from './components/Canvas'
import TabMain from './components/Tabses/TabMain'
export default {
    name: 'Index',
    components: {
        GlobalSettings,
        Canvas,
        TabMain
    },
    data () {
        return {
            globalSettings: null,
            fdConfigurationOptions: [],
            fdConfigurationObjects: [],
            tabObjects: []
        }
    },
    watch: {
        // ss
    },
    computed: {
        displayTabs: function () {
            if (this.globalSettings && this.globalSettings.configuration && this.fdConfigurationObjects.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    created () {
        this.getConfigurations()
    },
    methods: {
        getFDConfigurationObjects (val) {
            let params = {
                pagination: false,
                configuration: val
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_objects', {
                    params
                })
                .then((response) => {
                    let data = response.data['hydra:member']
                    this.fdConfigurationObjects = data
                })
                .catch((error) => {
                    // this.$toast.open({
                    //     message: this.$t('notifications.error'),
                    //     type: 'error',
                    //     position: 'bottom-left',
                    //     duration: 10000
                    // })
                    console.log(error)
                })
                .finally(() => {
                    this.$emit('input', false)
                })
        },
        getConfigurations () {
            let params = {
                pagination: false
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_configurations', params)
                .then((response) => {
                    let data = response.data['hydra:member']
                    let array = []
                    for (let i in data) {
                        array.push({
                            value: data[i]['@id'],
                            id: data[i].id,
                            text: data[i].name,
                            defaultSectionWidth: data[i].defaultSectionWidth
                        })
                    }
                    this.fdConfigurationOptions = array
                })
                .catch((error) => {
                    // this.$toast.open({
                    //     message: this.$t('notifications.error'),
                    //     type: 'error',
                    //     position: 'bottom-left',
                    //     duration: 10000
                    // })
                    console.log(error)
                })
                .finally(() => {
                    this.$emit('input', false)
                })
        }
    }
}
</script>