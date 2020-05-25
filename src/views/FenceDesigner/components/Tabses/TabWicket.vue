<template>
    <b-row>
        <b-col>
            <b-row>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabWicket.tabObject.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input v-model="tabObject.width" type="number" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabWicket.tabObject.width')"></b-form-input>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'TabWicket',
    props: {
        tabObject: {
            type: Object,
            required: true
        },
        getSectionMaxWidthLocal: {
            type: Function,
            required: true
        },
        getAllObjectsWidthLocal: {
            type: Function,
            required: true
        }
    },
    watch: {
        'tabObject.width': function (val, oldVal) {
            let allObjectsWidth = this.getAllObjectsWidthLocal()
            let sectionMaxWidth = this.getSectionMaxWidthLocal()

            if (sectionMaxWidth < allObjectsWidth) {
                alert('przekroczono maksymalną szerokość')
                this.tabObject.width = parseInt(oldVal)
            }
        }
    },
    data () {
        return {
            // heightCentimeters: 0,
            // widthCentimeters: 0
        }
    }
}
</script>