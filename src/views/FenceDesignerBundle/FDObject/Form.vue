<template>
    <b-row>
        <b-col cols="12">
            <b-row>
                <b-col>
                    <p><b>{{ $t('views.fenceDesignerBundle.FDObject.form.name') }}:</b> {{ $t(item.name) }}</p>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDObject.form.defaultWidth') }}:</label>
                    <b-form-input
                            v-model="item.defaultWidth"
                            :placeholder="$t('views.fenceDesignerBundle.FDObject.form.defaultWidth')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
                <b-col v-if="item.objectType && (item.objectType.id === 3 || item.objectType.id === 4)">
                    <label>{{ $t('views.fenceDesignerBundle.FDObject.form.defaultHeight') }}:</label>
                    <b-form-input
                            v-model="item.defaultHeight"
                            :placeholder="$t('views.fenceDesignerBundle.FDObject.form.defaultWidth')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="mt-3">
            <b-btn v-if="!sending" size="sm" variant="success" @click="setItem()">{{ $t('send') }}</b-btn>
            <b-btn v-else-if="sending" variant="success" size="sm" disabled>
                <b-spinner small type="grow"></b-spinner>
                {{ $t('sending') }}...
            </b-btn>
            <b-btn :disabled="sending" size="sm" variant="danger" class="ml-1" @click="closeModalFunction()" v-if="inModal">{{ $t('close') }}</b-btn>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Form',
    props: {
        id: {
            type: Number,
            default: null
        },
        closeModalFunction: {
            type: Function,
            default: function () {
                // nothing
            }
        },
        inModal: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            item: {},
            sending: false
        }
    },
    created () {
        this.getItem()
    },
    methods: {
        setItem () {
            this.sending = true
            let item = Object.assign({}, this.item)
            if (item.objectType && item.objectType['@id']) {
                item.objectType = item.objectType['@id']
            }
            item.defaultWidth = parseFloat(item.defaultWidth)
            item.defaultHeight = parseFloat(item.defaultHeight)
            if (item['@id']) {
                this.$axios
                    .put(this.$store.state.url + '/api/f_d_objects/' + item.id, item)
                    .then((response) => {
                        this.item = response.data
                        // this.$toast.open({
                        //     message: this.$t('notifications.updated'),
                        //     type: 'success',
                        //     position: 'bottom-left',
                        //     duration: 10000
                        // })
                        if (this.inModal) {
                            this.closeModalFunction()
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        // this.$toast.open({
                        //     message: this.$t('notifications.error'),
                        //     type: 'error',
                        //     position: 'bottom-left',
                        //     duration: 10000
                        // })
                    })
                    .finally(() => {
                        this.sending = false
                    })
            } else {
                this.$axios
                    .post(this.$store.state.url + '/api/f_d_objects', item)
                    .then((response) => {
                        this.item = response.data
                        // this.$toast.open({
                        //     message: this.$t('notifications.created'),
                        //     type: 'success',
                        //     position: 'bottom-left',
                        //     duration: 10000
                        // })
                        if (this.inModal) {
                            this.closeModalFunction()
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        // this.$toast.open({
                        //     message: this.$t('notifications.error'),
                        //     type: 'error',
                        //     position: 'bottom-left',
                        //     duration: 10000
                        // })
                    })
                    .finally(() => {
                        this.sending = false
                    })
            }
        },
        getItem () {
            let id = 0
            if (this.id) {
                id = this.id
            }
            let params = {
                // pagination: false
            }
            this.$axios
                .get(this.$store.state.url + '/api/f_d_objects/' + id, params)
                .then((response) => {
                    this.item = response.data
                })
                .catch((error) => {
                    console.log(error)
                    // this.$toast.open({
                    //     message: this.$t('notifications.error'),
                    //     type: 'error',
                    //     position: 'bottom-left',
                    //     duration: 10000
                    // })
                })
                .finally(() => {
                    if (this.inModal) {
                        this.$emit('input', false)
                    }
                })
        }
    }
}
</script>
