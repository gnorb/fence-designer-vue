<template>
    <b-row>
        <b-col>
            <b-row>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabPost.tabObject.height') }} ({{ heightCentimeters }} {{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input v-model="tabObject.height" type="number" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabPost.tabObject.height')"></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabPost.tabObject.width') }} ({{ widthCentimeters }} {{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input v-model="tabObject.width" min="1" type="number" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabPost.tabObject.width')"></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabPost.tabObject.level') }}:</label>
                    <b-form-input v-model="tabObject.level" min="0" type="number" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabPost.tabObject.level')"></b-form-input>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
name: 'TabPost',
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
    },
    groupEdit: {
        type: Function,
        required: true
    }
},
data () {
    return {
        // heightCentimeters: 0,
        // widthCentimeters: 0
    }
},
watch: {
    'tabObject.height': function () {
        // this.groupEdit(this.tabObject)
    },
    'tabObject.width': function (val, oldVal) {
        // this.groupEdit(this.tabObject)

        let allObjectsWidth = this.getAllObjectsWidthLocal()
        let sectionMaxWidth = this.getSectionMaxWidthLocal()

        if (sectionMaxWidth < allObjectsWidth) {
            alert('przekroczono maksymalną szerokość')
            this.tabObject.width = parseInt(oldVal)
        }
    }
},
computed: {
    heightCentimeters: function () {
        let height = parseInt(this.tabObject.height) * parseFloat(this.tabObject.brick.height)
        if (this.tabObject.roof) {
            height += parseFloat(this.tabObject.roof.height)
        }
        return height
    },
    widthCentimeters: function () {
        return parseInt(this.tabObject.width) * parseFloat(this.tabObject.brick.width)
    }
}
}
</script>
