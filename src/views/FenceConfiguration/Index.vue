<template>
    <b-row v-show="!loading">
        <b-col>
            <b-row>
                <b-col>
                    <b-alert class="mt-4" show variant="info" dismissible>{{ $t('views.fenceConfiguration.info') }}</b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card class="mt-4">
                        <FenceConfigurator v-show="configurationBegan" :closeConfigurator="closeConfigurator"></FenceConfigurator>
                        <template v-if="!configurationBegan">
                            <h4>{{$t('views.fenceConfiguration.fenceConfigurator.header')}}</h4>
                            <b-alert show variant="dark">{{$t('views.fenceConfiguration.fenceConfigurator.info')}}</b-alert>
                            <b-btn variant="dark" size="sm" @click="beginConfiguration()">{{$t('start')}}</b-btn>
                        </template>
                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card :title="$t('views.fenceConfiguration.fenceConfigurator.fenceConfigurationList')" class="mt-4">
                        <FDConfigurationList v-model="fdConfigurationListLoading"></FDConfigurationList>
                    </b-card>
                </b-col>
            </b-row>
            <FenceItemCreateFormModal></FenceItemCreateFormModal>
        </b-col>
    </b-row>
</template>

<script>
import FenceItemCreateFormModal from '../../components/Modals/FenceItemCreateFormModal'
import FenceConfigurator from './components/FenceConfigurator/FenceConfigurator'
import FDConfigurationList from '../FenceDesignerBundle/FDConfiguration/List'
export default {
    name: 'Index',
    components: {
        FenceItemCreateFormModal,
        FenceConfigurator,
        FDConfigurationList
    },
    computed: {
        loading: function () {
            if (this.fdConfigurationListLoading) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        loading: function (val) {
            this.$store.state.displayLoader = val
        }
    },
    data () {
        return {
            configurationBegan: false,
            fdConfigurationListLoading: true
        }
    },
    created () {
        this.$store.state.displayLoader = true
    },
    methods: {
        closeConfigurator () {
            this.configurationBegan = false
        },
        openFenceItemCreateFormModal () {
            this.$store.state.modals.fenceItemCreateFormModal.open = true
        },
        beginConfiguration () {
            this.configurationBegan = true
        }
    }
}
</script>