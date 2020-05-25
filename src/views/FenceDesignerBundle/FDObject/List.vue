<template>
    <b-card :title="$t('views.fenceDesignerBundle.FDObject.list.header')" class="mt-4">
        <v-client-table :data="rows" :columns="columns" :options="options">
            <template slot="name" slot-scope="props">
                {{ $t(props.row.name) }}
            </template>
            <template slot="defaultWidth" slot-scope="props">
                <template v-if="props.row.objectType.id === 1 || props.row.objectType.id === 2">
                    {{ props.row.defaultWidth }} {{ $store.state.unitOfMeasure }}
                </template>
                <template v-else-if="props.row.objectType.id === 4 || props.row.objectType.id === 3">
                    {{ props.row.defaultWidth }} <template v-if="props.row.defaultWidth === 1">{{ $t('bricks.one') }}</template>
                    <template v-else-if="props.row.defaultWidth > 1 && props.row.defaultWidth < 5">{{ $t('bricks.twoToFour') }}</template>
                    <template v-else-if="props.row.defaultWidth >= 5">{{ $t('bricks.FiveAndMore') }}</template>
                </template>
            </template>
            <template slot="defaultHeight" slot-scope="props">
                <template v-if="props.row.objectType.id === 4 || props.row.objectType.id === 3">
                    {{ props.row.defaultHeight }} <template v-if="props.row.defaultWidth === 1">{{ $t('bricks.one') }}</template>
                    <template v-else-if="props.row.defaultWidth > 1 && props.row.defaultWidth < 5">{{ $t('bricks.twoToFour') }}</template>
                    <template v-else-if="props.row.defaultWidth >= 5">{{ $t('bricks.FiveAndMore') }}</template>
                </template>
                <template v-else-if="props.row.objectType.id === 1 || props.row.objectType.id === 2">
                    -
                </template>
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
            columns: ['name', 'defaultWidth', 'defaultHeight', 'options'],
            options: {
                filterable: false,
                resizableColumns: true,
                headings: {
                    name: this.$t('views.fenceDesignerBundle.FDObject.list.headings.name'),
                    defaultWidth: this.$t('views.fenceDesignerBundle.FDObject.list.headings.defaultWidth'),
                    defaultHeight: this.$t('views.fenceDesignerBundle.FDObject.list.headings.defaultHeight'),
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
            this.$store.state.modals.FDObject.formModal.open = true
            this.$store.state.modals.FDObject.formModal.id = id
        },
        getItems () {
            this.$emit('input', true)
            let params = {}
            if (this.configuration) {
                params['configuration'] = this.configuration
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_objects', params)
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