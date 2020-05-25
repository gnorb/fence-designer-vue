<template>
    <b-card class="mt-4">
        <b-row>
            <b-col v-if="globalSettings.configuration">
                <b-btn @click="handleMoreCollapse()" size="sm" class="w-100" variant="dark">
                    <template v-if="!showMore">
                        {{ $t('views.fenceDesigner.globalSettings.openMore') }}
                    </template>
                    <template v-else>
                        {{ $t('views.fenceDesigner.globalSettings.hideMore') }}
                    </template>
                </b-btn>
            </b-col>
        </b-row>
        <b-collapse v-model="showMore">
            <b-row class="mt-2">
                <b-col>
                    <label>{{ $t('views.fenceDesigner.globalSettings.configuration') }}:</label>
                    <b-form-select v-model="globalSettings.configuration" :options="fdConfigurationOptions"></b-form-select>
                </b-col>
            </b-row>
            <b-row class="mt-2" v-if="globalSettings.configuration">
                <b-col>
                    <label>{{ $t('views.fenceDesigner.globalSettings.sectionWidth') }} ({{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input v-model="globalSettings.sectionWidth"
                                  type="number"
                                  step="1"
                                  :placeholder="$t('views.fenceDesigner.globalSettings.sectionWidth')"
                    ></b-form-input>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>
        </b-collapse>
    </b-card>
</template>

<script>
export default {
    name: 'GlobalSettings',
    props: {
        fdConfigurationOptions: {
            type: Array,
            required: true
        },
        getFDConfigurationObjects: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            globalSettings: {
                configuration: null,
                sectionWidth: 0,
                margin: 20
            },
            showMore: true
        }
    },
    watch: {
        'globalSettings.configuration': function (val) {
            let data = this.fdConfigurationOptions
            for (let i in data) {
                if (val === data[i].value) {
                    this.globalSettings.sectionWidth = data[i].defaultSectionWidth
                    this.globalSettings.configurationId = data[i].id
                    break
                }
            }
            this.getFDConfigurationObjects(val)
        },
        globalSettings: {
            handler: function() {
                this.$emit('input', this.globalSettings)
            },
            deep: true
        }
    },
    methods: {
        handleMoreCollapse () {
            if (this.showMore) {
                this.showMore = false
            } else {
                this.showMore = true
            }
        }
    }
}
</script>