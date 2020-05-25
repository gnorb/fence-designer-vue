<template>
    <b-modal v-model="modalShow" hide-footer size="xl" @hidden="closeModalFunction()" @hide="dataReset()">
        <template v-slot:modal-title>
            {{$t('views.fenceDesignerBundle.FDObject.modals.form.header')}}
        </template>
        <Loader v-if="loading"></Loader>
        <FDObjectForm v-show="!loading" v-model="loading" :id="fdObjectid" :closeModalFunction="closeModalFunction" :inModal="true"></FDObjectForm>
    </b-modal>
</template>

<script>
import FDObjectForm from '../Form'
import Loader from '../../../Layout/Loader'
export default {
    name: 'FormModal',
    components: {
        FDObjectForm,
        Loader
    },
    data () {
        return {
            modalShow: false,
            fdObjectid: 0,
            loading: true
        }
    },
    computed: {
        openModal: function () {
            return this.$store.state.modals.FDObject.formModal.open
        },
        id: function () {
            return this.$store.state.modals.FDObject.formModal.id
        },
        closeModal: function () {
            return this.$store.state.modals.FDObject.formModal.close
        }
    },
    watch: {
        'openModal': function () {
            this.openModalFunction()
        },
        'closeModal': function (val) {
            if (val) {
                this.$store.state.modals.FDObject.formModal.close = false
                this.modalShow = false
            }
        }
    },
    methods: {
        openModalFunction () {
            if (this.openModal && this.id > 0) {
                this.fdObjectid = this.id
                this.$store.state.modals.FDObject.formModal.open = false
                this.$store.state.modals.FDObject.formModal.id = 0
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