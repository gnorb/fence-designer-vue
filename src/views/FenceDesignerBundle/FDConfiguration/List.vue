<template>
    <b-row>
        <b-col>
            <v-client-table :data="rows" :columns="columns" :options="options">
                <template slot="type" slot-scope="props">
                    {{ props.row.type.name }}
                </template>
                <template slot="options" slot-scope="props">
                    <div class="float-right">
                        <b-btn size="sm" class="ml-1" variant="primary" v-tooltip.top-center="$t('edit')" @click="editItem(props.row.id)">
                            <b-icon-pencil></b-icon-pencil>
                        </b-btn>
                        <b-btn size="sm" class="ml-1" variant="success" v-tooltip.top-center="$t('details')" @click="detailsItem(props.row.id)">
                            <b-icon-three-dots></b-icon-three-dots>
                        </b-btn>
                        <b-btn size="sm" class="ml-1" variant="danger" v-tooltip.top-center="$t('remove')" @click="removeItem(props.row.id)">
                            <b-icon-trash></b-icon-trash>
                        </b-btn>
                    </div>
                </template>
            </v-client-table>
            <FDConfigurationFormModal></FDConfigurationFormModal>
        </b-col>
    </b-row>
</template>

<script>
import FDConfigurationFormModal from "./components/FormModal";
export default {
    name: 'FDConfigurationList',
    components: {
        // VueGoodTable,
        FDConfigurationFormModal
    },
    data () {
        return {
            rows: [],
            columns: ['type', 'name', 'description', 'options'],
            options: {
                filterable: false,
                resizableColumns: true,
                headings: {
                    name: this.$t('views.fenceDesignerBundle.FDConfiguration.list.headings.name'),
                    description: this.$t('views.fenceDesignerBundle.FDConfiguration.list.headings.description'),
                    type: this.$t('views.fenceDesignerBundle.FDConfiguration.list.headings.type'),
                    options: this.$t('options')
                }
            }
        }
    },
    created () {
        this.getConfigurations()
    },
    methods: {
        editItem (id) {
            this.$store.state.modals.FDConfiguration.formModal.open = true
            this.$store.state.modals.FDConfiguration.formModal.id = id
        },
        detailsItem (id) {
            this.$router.push({ name: 'FenceConfigurationShow', params: { id: id } })
        },
        getConfigurations () {
            let params = {
                // pagination: false
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_configurations', params)
                .then((response) => {
                    let data = response.data['hydra:member']
                    this.rows = data
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