<template>
    <b-row>
        <b-col cols="12">
            <b-row>
                <b-col>
                    <p><b>{{ $t('views.fenceDesignerBundle.FDItem.form.itemType') }}:</b> {{ $t(item.itemType.name) }}</p>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDItem.form.width') }}:</label>
                    <b-form-input
                            v-model="item.width"
                            type="number"
                            step="0.01"
                            :placeholder="$t('views.fenceDesignerBundle.FDItem.form.width')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
                <b-col v-if="item.itemType.id === 2">
                    <label>{{ $t('views.fenceDesignerBundle.FDItem.form.widthLeft') }}:</label>
                    <b-form-input
                            v-model="item.widthLeft"
                            type="number"
                            step="0.01"
                            :placeholder="$t('views.fenceDesignerBundle.FDItem.form.widthLeft')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDItem.form.height') }}:</label>
                    <b-form-input
                            v-model="item.height"
                            type="number"
                            step="0.01"
                            :placeholder="$t('views.fenceDesignerBundle.FDItem.form.height')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDItem.form.depth') }}:</label>
                    <b-form-input
                            v-model="item.depth"
                            type="number"
                            step="0.01"
                            :placeholder="$t('views.fenceDesignerBundle.FDItem.form.depth')"
                            aria-describedby="error-name"
                    ></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesignerBundle.FDItem.form.weight') }}:</label>
                    <b-form-input
                            v-model="item.weight"
                            type="number"
                            step="0.01"
                            :placeholder="$t('views.fenceDesignerBundle.FDItem.form.weight')"
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
    watch: {
        'item.widthLeft': function () {
            this.setCutPoint()
        },
        'item.width': function () {
            this.setCutPoint()
        }
    },
    created () {
        this.getItem()
    },
    methods: {
        setCutPoint () {
            this.item.widthRight = parseFloat(parseFloat(this.item.width).toFixed(2) - parseFloat(this.item.widthLeft).toFixed(2)).toFixed(2)
        },
        setItem () {
            this.sending = true
            let item = Object.assign({}, this.item)
            if (item.itemType && item.itemType['@id']) {
                item.itemType = item.itemType['@id']
            }
            item.width = parseFloat(item.width)
            item.height = parseFloat(item.height)
            item.depth = parseFloat(item.depth)
            item.weight = parseFloat(item.weight)
            item.widthLeft = parseFloat(item.widthLeft)
            item.widthRight = parseFloat(item.widthRight)
            if (item['@id']) {
                this.$axios
                    .put(this.$store.state.url + '/api/f_d_items/' + item.id, item)
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
                    .post(this.$store.state.url + '/api/f_d_items', item)
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
                .get(this.$store.state.url + '/api/f_d_items/' + id, params)
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
