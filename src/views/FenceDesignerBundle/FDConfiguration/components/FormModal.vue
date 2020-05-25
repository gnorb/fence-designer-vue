<template>
    <b-modal v-model="modalShow" hide-footer size="xl" @hidden="closeModalFunction()" @hide="dataReset()">
        <template v-slot:modal-title>
            {{$t('views.fenceDesignerBundle.FDConfiguration.modals.form.header')}}
        </template>
        <Loader v-if="loading"></Loader>
        <FDConfigurationForm v-show="!loading" v-model="loading" :id="fdConfigurationId" :closeModalFunction="closeModalFunction" :inModal="true"></FDConfigurationForm>
    </b-modal>
</template>

<script>
import FDConfigurationForm from '../Form'
import Loader from '../../../Layout/Loader'
export default {
    name: 'FormModal',
    components: {
        FDConfigurationForm,
        Loader
    },
    data () {
        return {
            modalShow: false,
            fdConfigurationId: 0,
            loading: true
        }
    },
    computed: {
        openModal: function () {
            return this.$store.state.modals.FDConfiguration.formModal.open
        },
        id: function () {
            return this.$store.state.modals.FDConfiguration.formModal.id
        },
        closeModal: function () {
            return this.$store.state.modals.FDConfiguration.formModal.close
        }
    },
    watch: {
        'openModal': function () {
            this.openModalFunction()
        },
        'closeModal': function (val) {
            if (val) {
                this.$store.state.modals.FDConfiguration.formModal.close = false
                this.modalShow = false
            }
        }
    },
    methods: {
        openModalFunction () {
            if (this.openModal && this.id > 0) {
                this.fdConfigurationId = this.id
                this.$store.state.modals.FDConfiguration.formModal.open = false
                this.$store.state.modals.FDConfiguration.formModal.id = 0
                this.modalShow = true
            }
        },
        closeModalFunction () {
            this.modalShow = false
        },
        dataReset () {
            this.loading = true
        }
    }
}
</script>