<template>
    <b-row>
        <b-col>
            <h3 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepOne.header') }}</h3>
            <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepOne.subheader') }}</h6>
            <b-row class="mt-3">
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.name') }}:</label>
                    <b-form-input
                            v-model="data.name"
                            :state="nameError"
                            :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.name')"
                            aria-describedby="error-name"
                    ></b-form-input>
                    <b-form-invalid-feedback id="error-name">
                        {{ $t('views.fenceConfiguration.fenceConfigurator.data.nameError') }}
                    </b-form-invalid-feedback>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.fenceType') }}:</label>
                    <b-form-select v-model="data.type" :options="fenceTypes"></b-form-select>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.description') }}:</label>
                    <b-form-textarea
                            v-model="data.description"
                            :state="descriptionError"
                            :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.description')"
                            rows="3"
                            max-rows="6"
                            aria-describedby="error-description"
                    ></b-form-textarea>
                    <b-form-invalid-feedback id="error-description">
                        {{ $t('views.fenceConfiguration.fenceConfigurator.data.descriptionError') }}
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import store from '../../../../../store'
export default {
    name: 'StepOne',
    props: {
        data: {
            type: Object,
            required: true
        },
        errors: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            fenceTypes: []
        }
    },
    computed: {
        nameError: function () {
            if (this.errors.includes('name')) {
                return false
            } else {
                return null
            }
        },
        descriptionError: function () {
            if (this.errors.includes('description')) {
                return false
            } else {
                return null
            }
        }
    },
    watch: {
        'data.name': function () {
            this.$emit('input', this.data)
        },
        'data.type': function (val) {
            this.updateFenceTypeName(val)
            this.$emit('input', this.data)
        },
        'data.description': function () {
            this.$emit('input', this.data)
        }
    },
    created() {
        this.getFenceTypes()
    },
    methods: {
        updateFenceTypeName (val) {
            for (let i in this.fenceTypes) {
                if (val === this.fenceTypes[i].value) {
                    this.data.fenceTypeName = this.fenceTypes[i].text
                }
            }
        },
        getFenceTypes () {
            let params = {
                // pagination: false
            }
            this.$axios
                .get(store.state.url + '/api/f_d_types', params)
                .then((response) => {
                    let list = response.data['hydra:member']
                    let array = []
                    for (let i in list) {
                        let object = {
                            value: list[i]['@id'],
                            text: list[i].name
                        }
                        array.push(object)
                    }
                    this.fenceTypes = array
                    if (this.fenceTypes.length > 0) {
                        this.data.type = this.fenceTypes[0].value
                    }
                    this.updateFenceTypeName(this.data.type)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    // always executed
                })
        }
    }
}
</script>