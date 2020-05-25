<template>
    <b-modal v-model="modalShow" hide-footer size="xl" @hidden="closeModalFunction()" @hide="dataReset()">
        <template v-slot:modal-title>
            {{$t('views.fenceDesigner.modals.ModalGroupOfPostsAndSpans.header')}}
        </template>
        <b-row>
            <b-col>
                <label>{{$t('views.fenceDesigner.modals.ModalGroupOfPostsAndSpans.groupWidth')}} ({{ $store.state.unitOfMeasure }}):</label>
                <b-form-input v-model="group.width" placeholder="Enter your name"></b-form-input>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
export default {
    name: 'ModalGroupOfPostsAndSpans',
    props: {
        fdConfigurationObjects: {
            type: Array,
            required: true
        },
        globalSettings: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            modalShow: false,
            fdItemId: 0,
            loading: true,
            group: {
                width: 0
            }
        }
    },
    computed: {
        openModal: function () {
            return this.$store.state.modals.FenceDesigner.ModalGroupOfPostsAndSpans.open
        },
        closeModal: function () {
            return this.$store.state.modals.FenceDesigner.ModalGroupOfPostsAndSpans.close
        }
    },
    watch: {
        'openModal': function () {
            this.openModalFunction()
        },
        'closeModal': function (val) {
            if (val) {
                this.$store.state.modals.FenceDesigner.ModalGroupOfPostsAndSpans.close = false
                this.modalShow = false
            }
        }
    },
    methods: {
        openModalFunction () {
            if (this.openModal) {
                this.fdItemId = this.id
                this.$store.state.modals.FenceDesigner.ModalGroupOfPostsAndSpans.open = false
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
