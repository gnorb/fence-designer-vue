<template>
    <b-row>
        <b-col>
            <h3 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepTwo.header') }}</h3>
            <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepTwo.subheader') }}</h6>
            <StepTwoTypeOne v-if="data.type === '/api/f_d_types/1'" :data="data" v-model="data"></StepTwoTypeOne>
            <StepTwoTypeTwo v-else-if="data.type === '/api/f_d_types/2'" :data="data" v-model="data"></StepTwoTypeTwo>
        </b-col>
    </b-row>
</template>

<script>
import StepTwoTypeOne from './StepTwo/StepTwoTypeOne'
import StepTwoTypeTwo from './StepTwo/StepTwoTypeTwo'
export default {
    name: 'StepTwo',
    components: {
        StepTwoTypeTwo,
        StepTwoTypeOne
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>
