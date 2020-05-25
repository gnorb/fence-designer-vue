<template>
    <b-card :title="$t('views.fenceDesignerBundle.FDItem.list.header')" class="mt-4">
        <v-client-table :data="rows" :columns="columns" :options="options">
            <template slot="width" slot-scope="props">
                {{ props.row.width }} {{ $store.state.unitOfMeasure }}
            </template>
            <template slot="height" slot-scope="props">
                {{ props.row.height }} {{ $store.state.unitOfMeasure }}
            </template>
            <template slot="weight" slot-scope="props">
                {{ props.row.weight }} {{ $store.state.unitOfMeasureWeight }}
            </template>
            <template slot="depth" slot-scope="props">
                {{ props.row.depth }} {{ $store.state.unitOfMeasureWeight }}
            </template>
            <template slot="itemType" slot-scope="props">
                {{ props.row.itemType.name }}
            </template>
            <template slot="options" slot-scope="props">
                <div class="float-right">
                    <b-btn size="sm" class="ml-1" variant="primary" v-tooltip.top-center="$t('edit')" @click="editItem(props.row.id)">
                        <b-icon-pencil></b-icon-pencil>
                    </b-btn>
<!--                    <b-btn size="sm" class="ml-1" variant="success" v-tooltip.top-center="$t('details')" @click="detailsItem(props.row.id)">-->
<!--                        <b-icon-three-dots></b-icon-three-dots>-->
<!--                    </b-btn>-->
                    <b-btn size="sm" class="ml-1" variant="danger" v-tooltip.top-center="$t('remove')" @click="removeItem(props.row.id)">
                        <b-icon-trash></b-icon-trash>
                    </b-btn>
                </div>
            </template>
        </v-client-table>
        <FormModal></FormModal>
    </b-card>
</template>

<script>
import FormModal from "./components/FormModal";
export default {
    name: 'List',
    components: {
        FormModal
    },
    props: {
        configuration: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            rows: [],
            columns: ['itemType', 'width', 'height', 'depth', 'weight', 'options'],
            options: {
                filterable: false,
                resizableColumns: true,
                headings: {
                    width: this.$t('views.fenceDesignerBundle.FDItem.list.headings.width'),
                    height: this.$t('views.fenceDesignerBundle.FDItem.list.headings.height'),
                    weight: this.$t('views.fenceDesignerBundle.FDItem.list.headings.weight'),
                    depth: this.$t('views.fenceDesignerBundle.FDItem.list.headings.depth'),
                    itemType: this.$t('views.fenceDesignerBundle.FDItem.list.headings.itemType'),
                    options: this.$t('options')
                }
            }
        }
    },
    created () {
        this.getItems()
    },
    methods: {
        editItem (id) {
            this.$store.state.modals.FDItem.formModal.open = true
            this.$store.state.modals.FDItem.formModal.id = id
        },
        getItems () {
            this.$emit('input', true)
            let params = {}
            if (this.configuration) {
                params['configuration'] = this.configuration
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_items', params)
                .then((response) => {
                    let data = response.data['hydra:member']
                    // for (let i in data) {
                    //     if (data[i].type && data[i].type.name) {
                    //         data[i].type = data[i].type.name
                    //     }
                    // }
                    this.rows = data
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.$emit('input', false)
                })
        }
    }
}
</script>