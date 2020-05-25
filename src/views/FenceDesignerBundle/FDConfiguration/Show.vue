<template>
    <b-row v-show="!loading">
        <b-col cols="12">
            <b-card v-if="item" :title="$t('views.fenceDesignerBundle.FDConfiguration.show.header')" class="mt-4">
                <p>
                    <b>{{ $t('views.fenceDesignerBundle.FDConfiguration.show.item.type') }}:</b> {{ item.type.name }}<br>
                    <b>{{ $t('views.fenceDesignerBundle.FDConfiguration.show.item.name') }}:</b> {{ item.name }}<br>
                    <b>{{ $t('views.fenceDesignerBundle.FDConfiguration.show.item.description') }}:</b> {{ item.description }}
                </p>
            </b-card>
        </b-col>
        <b-col cols="12" v-if="item">
            <b-row>
                <b-col>
                    <FDObjectList :configuration="this.item['@id']" v-model="loadingObjects"></FDObjectList>
                </b-col>
                <b-col>
                    <FDItemList :configuration="this.item['@id']" v-model="loadingItems"></FDItemList>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import FDItemList from '../FDItem/List'
import FDObjectList from '../FDObject/List'
export default {
    name: 'Show',
    components: {
        FDItemList,
        FDObjectList
    },
    data () {
        return {
            item: null,
            loadingItem: true,
            loadingObjects: true,
            loadingItems: true
        }
    },
    computed: {
        loading: function () {
            if (this.loadingItem || this.loadingObjects || this.loadingItems) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        loading: function (val) {
            this.$store.state.displayLoader = val
        }
    },
    created () {
        this.$store.state.displayLoader = true
        this.getItem()
    },
    methods: {
        getItem () {
            this.loadingItem = true
            let id = this.$route.params.id
            let params = {
                // pagination: false
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_configurations/' + id, params)
                .then((response) => {
                    this.item = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loadingItem = false
                })
        }
    }
}
</script>