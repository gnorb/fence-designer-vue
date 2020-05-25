<template>
    <b-row>
        <b-col>
            <b-row>
                <b-col>
                    <b-form-input v-model="color.name" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.color.name')"></b-form-input>
                </b-col>
                <b-col>
                    <b-form-group>
                        <b-form-radio-group
                                v-model="color.displayOption"
                                :options="displayOptions"
                                buttons
                                name="radios-btn-default"
                        ></b-form-radio-group>
                    </b-form-group>
                </b-col>
                <b-col v-if="color.displayOption === 0">
                    <b-form-input v-model="color.color" type="color"></b-form-input>
                </b-col>
                <b-col v-else-if="color.displayOption === 1">
                    <b-form-file
                            v-model="color.texture"
                            :state="Boolean(color.texture)"
                            :placeholder="$t('views.fenceConfiguration.fenceConfigurator.color.imagePlaceholder')"
                            :drop-placeholder="$t('views.fenceConfiguration.fenceConfigurator.color.imagePlaceholder2')"
                    ></b-form-file>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="2">
            <b-btn class="float-right w-100" variant="danger" @click="removeColorFromItem(index)">{{  $t('remove') }}</b-btn>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Color',
    props: {
        color: {
            type: Object,
            required: true
        },
        removeColorFromItem: {
            type: Function,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            displayOptions: [
                {
                    value: 0,
                    text: this.$t('views.fenceConfiguration.fenceConfigurator.color.displayOptions.color')
                },
                {
                    value: 1,
                    text: this.$t('views.fenceConfiguration.fenceConfigurator.color.displayOptions.image')
                }
            ]
        }
    }
}
</script>