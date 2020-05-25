<template>
    <b-row>
        <b-col>
            <StepOne v-show="presentStep === 1" :data="data" v-model="data" :errors="errorsStepOne"></StepOne>
            <StepTwo v-show="presentStep === 2" :data="data" v-model="data"></StepTwo>
            <StepThree v-show="presentStep === 3" :data="data" v-model="data"></StepThree>
            <Summary v-show="presentStep === 4" :data="data"></Summary>
            <b-progress variant="secondary" :value="presentStep" :max="stepsQuantity" class="mt-3 mb-2"></b-progress>
            <b-row>
                <b-col>
                    <b-btn v-if="!sending" size="sm" variant="danger" @click="closeConfigurator()" class="mr-1">{{ $t('cancel') }}</b-btn>
                    <b-btn v-if="displayPreviousStepButton" size="sm" @click="goToPreviousStep()" variant="dark">{{$t('views.fenceConfiguration.fenceConfigurator.previousStep')}}</b-btn>
                    <b-btn v-if="displayNextStepButton" size="sm" @click="goToNextStep()" variant="dark" class="float-right">{{$t('views.fenceConfiguration.fenceConfigurator.nextStep')}}</b-btn>
                    <b-btn v-if="presentStep === 4 && !sending" variant="success" class="float-right" @click="submitData()">{{ $t('save') }}</b-btn>
                    <b-btn v-else-if="presentStep === 4 && sending" variant="success" class="float-right" disabled>
                        <b-spinner small type="grow"></b-spinner>
                        {{ $t('sending') }}...
                    </b-btn>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import StepThree from './steps/StepThree'
import Summary from './steps/Summary'
export default {
    name: 'FenceConfigurator',
    components: {
        StepOne,
        StepTwo,
        StepThree,
        Summary
    },
    props: {
        closeConfigurator: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            stepsQuantity: 5,
            presentStep: 1,
            striped: false,
            data: {
                name: '',
                description: '',
                type: null,
                fenceTypeName: '',
                items: [
                    {},
                    {}
                ]
            },
            errorsStepOne: [],
            errorsStepTwo: [],
            errorsStepThree: [],
            sending: false
        }
    },
    computed: {
        displayPreviousStepButton: function () {
            if (this.presentStep > 1 && !this.sending) {
                return true
            } else {
                return false
            }
        },
        displayNextStepButton: function () {
            if (this.presentStep < 4 && !this.sending) {
                return true
            } else {
                return false
            }

        }
    },
    methods: {
        submitData () {
            this.sending = true
            let data = this.data
            this.$axios
                .post(this.$store.state.url + '/api/f_d_configurations', data)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.sending = false
                })
        },
        goToPreviousStep () {
            this.presentStep--
        },
        goToNextStep () {
            if (this.presentStep === 1) {
                this.errorsStepOne = []
                if (!this.data.name || this.data.name === '' || this.data.name.length < 5) {
                    this.errorsStepOne.push('name')
                }
                if (!this.data.description || this.data.description === '' || this.data.description.length < 15) {
                    this.errorsStepOne.push('description')
                }
                if (!this.data.type) {
                    this.errorsStepOne.push('type')
                }
            }
            if (this.errorsStepOne.length === 0) {
                this.presentStep++
            }
        }
    }
}
</script>