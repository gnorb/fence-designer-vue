<template>
    <b-modal v-model="modalShow" id="fenceItemCreateFormModal" ref="fenceItemCreateFormModal" hide-footer @hidden="closeModalFunction()">
        <template v-slot:modal-title>
            {{$t('modals.fenceItemCreateFormModal.header')}}
        </template>
        <div class="d-block text-center">
            <h3>Hello From This Modal!</h3>
        </div>
        <b-button class="mt-3" block @click="closeModalFunction()">Close Me</b-button>
    </b-modal>
</template>

<script>
export default {
    name: 'FenceItemCreateFormModal',
    computed: {
        openModal: function () {
            return this.$store.state.modals.fenceItemCreateFormModal.open
        },
        closeModal: function () {
            return this.$store.state.modals.fenceItemCreateFormModal.close
        }
    },
    data () {
        return {
            modalShow: false
        }
    },
    watch: {
        'openModal': function (val) {
            if (val) {
                this.$store.state.modals.fenceItemCreateFormModal.open = false
                this.modalShow = true
            }
        },
        'closeModal': function (val) {
            if (val) {
                this.$store.state.modals.fenceItemCreateFormModal.close = false
                this.modalShow = false
            }
        }
    },
    methods: {
        closeModalFunction () {
            this.modalShow = false
        }
    }
}
</script>
