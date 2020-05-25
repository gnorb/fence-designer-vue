<template>
    <b-row>
        <b-col>
            <h3 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.header') }}</h3>
            <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.subheader') }}</h6>
            <hr>
            <b-row>
                <b-col>
                    <h5 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.stepOne') }}</h5>
                    <p class="text-center">
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.name') }}:</b><br>
                        {{ data.name }}<br>
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.fenceType') }}:</b><br>
                        {{ data.fenceTypeName }}<br>
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.description') }}:</b><br>
                        {{ data.description }}
                    </p>
                </b-col>
                <b-col>
                    <h5 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.stepTwo') }}</h5>
                    <template v-if="data.type === '/api/f_d_types/1'">
                        <b-row>
                            <b-col>
                                <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.blocksOptions.full') }}:</h6>
                                <p class="text-center">
                                    <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width') }}:</b><br>
                                    {{ data.items[0].width }} {{$store.state.unitOfMeasure}}<br>
                                    <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height') }}:</b><br>
                                    {{ data.items[0].height }} {{$store.state.unitOfMeasure}}<br>
                                    <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth') }}:</b><br>
                                    {{ data.items[0].depth }} {{$store.state.unitOfMeasure}}
                                </p>
                            </b-col>
                            <b-col>
                                <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.blocksOptions.crushed') }}:</h6>
                                <p class="text-center">
                                    <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.blockCrushed.widthLeft') }}:</b><br>
                                    {{ data.items[0].widthLeft }} {{$store.state.unitOfMeasure}}<br>
                                    <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.blockCrushed.widthRight') }}:</b><br>
                                    {{ data.items[0].widthRight }} {{$store.state.unitOfMeasure}}
                                </p>
                            </b-col>
                        </b-row>
                    </template>
                    <template v-else-if="data.type === '/api/f_d_types/2'">
                        <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.blocksOptions.full') }}:</h6>
                        <p class="text-center">
                            <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width') }}:</b><br>
                            {{ data.items[0].width }} {{$store.state.unitOfMeasure}}<br>
                            <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height') }}:</b><br>
                            {{ data.items[0].height }} {{$store.state.unitOfMeasure}}<br>
                            <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth') }}:</b><br>
                            {{ data.items[0].depth }} {{$store.state.unitOfMeasure}}
                        </p>
                    </template>
                </b-col>
                <b-col>
                    <h5 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.stepThree') }}</h5>
                    <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.summary.roof') }}:</h6>
                    <p class="text-center">
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width') }}:</b><br>
                        {{ data.items[1].width }} {{$store.state.unitOfMeasure}}<br>
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height') }}:</b><br>
                        {{ data.items[1].height }} {{$store.state.unitOfMeasure}}<br>
                        <b>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth') }}:</b><br>
                        {{ data.items[1].depth }} {{$store.state.unitOfMeasure}}
                    </p>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Summary',
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>
