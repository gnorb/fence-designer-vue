<template>
    <b-modal v-model="modalShow" hide-footer size="xl" @hidden="closeModalFunction()" @hide="dataReset()">
        <template v-slot:modal-title>
            {{$t('views.fenceDesignerBundle.FDItem.modals.form.header')}}
        </template>
        <Loader v-if="loading"></Loader>
        <FDItemForm v-show="!loading" v-model="loading" :id="fdItemId" :closeModalFunction="closeModalFunction" :inModal="true"></FDItemForm>
    </b-modal>
</template>

<script>
import FDItemForm from '../Form'
import Loader from '../../../Layout/Loader'
export default {
    name: 'FormModal',
    components: {
        FDItemForm,
        Loader
    },
    data () {
        return {
            modalShow: false,
            fdItemId: 0,
            loading: true
        }
    },
    computed: {
        openModal: function () {
            return this.$store.state.modals.FDItem.formModal.open
        },
        id: function () {
            return this.$store.state.modals.FDItem.formModal.id
        },
        closeModal: function () {
            return this.$store.state.modals.FDItem.formModal.close
        }
    },
    watch: {
        'openModal': function () {
            this.openModalFunction()
        },
        'closeModal': function (val) {
            if (val) {
                this.$store.state.modals.FDItem.formModal.close = false
                this.modalShow = false
            }
        }
    },
    methods: {
        openModalFunction () {
            if (this.openModal && this.id > 0) {
                this.fdItemId = this.id
                this.$store.state.modals.FDItem.formModal.open = false
                this.$store.state.modals.FDItem.formModal.id = 0
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