<template>
    <b-row>
        <b-col cols="12">
            <b-row>
                <b-col>
                    <p><b>{{ $t('views.fenceDesignerBundle.FDConfiguration.form.type') }}:</b> {{ $t(item.type.name) }}</p>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDConfiguration.form.name') }}:</label>
                    <b-form-input
                            v-model="item.name"
                            type="text"
                            :placeholder="$t('views.fenceDesignerBundle.FDConfiguration.form.name')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDConfiguration.form.defaultSectionWidth') }} ({{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input
                            v-model="item.defaultSectionWidth"
                            type="number"
                            step="1"
                            :placeholder="$t('views.fenceDesignerBundle.FDConfiguration.form.defaultSectionWidth')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDConfiguration.form.description') }}:</label>
                    <b-form-textarea
                            v-model="item.description"
                            :placeholder="$t('views.fenceDesignerBundle.FDConfiguration.form.description')"
                            rows="3"
                            max-rows="6"
                    ></b-form-textarea>
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
            if (item.type && item.type['@id']) {
                item.type = item.type['@id']
            }
            // item.defaultSectionWidth = parseInt(item.defaultSectionWidth)
            if (item['@id']) {
                this.$axios
                    .put(this.$store.state.url + '/api/f_d_configurations/' + item.id, item)
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
                    .post(this.$store.state.url + '/api/f_d_configurations', item)
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
                .get(this.$store.state.url + '/api/f_d_configurations/' + id, params)
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
