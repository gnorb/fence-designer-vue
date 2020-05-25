<template>
    <b-row>
        <b-col>
            <h3 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepThree.header') }}</h3>
            <h6 class="text-center">{{ $t('views.fenceConfiguration.fenceConfigurator.stepThree.subheader') }}</h6>
            <b-row class="mt-3">
                <b-col>
                    <b-row>
                        <b-col>
                            <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width') }} ({{$store.state.unitOfMeasure}}):</label>
                            <b-form-input v-model="data.items[1].width" min="10" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height') }} ({{$store.state.unitOfMeasure}}):</label>
                            <b-form-input v-model="data.items[1].height" min="5" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth') }} ({{$store.state.unitOfMeasure}}):</label>
                            <b-form-input v-model="data.items[1].depth" min="5" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth')"></b-form-input>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-btn size="sm" variant="dark" @click="addColorToItem()">{{ $t('views.fenceConfiguration.fenceConfigurator.addNewColor') }}</b-btn>
                    <b-alert class="mt-2" show variant="dark">{{ $t('views.fenceConfiguration.fenceConfigurator.colorInfo') }}</b-alert>
                    <b-row v-for="(color, index) in data.items[1].itemColors" v-bind:key="'color-' + index">
                        <b-col>
                            <Color :color="color" :removeColorFromItem="removeColorFromItem" :index="index"></Color>
                            <hr class="mt-2 mb-2">
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <canvas id="roofCanvas" width="700" height="300"></canvas>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import Color from './StepTwo/Color'
export default {
    name: 'StepThree',
    components: {
        Color
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            vueCanvas: null,
            canvas: null
        }
    },
    mounted () {
        var c = document.getElementById("roofCanvas")
        var ctx = c.getContext("2d")
        this.canvas = c
        this.vueCanvas = ctx
    },
    watch: {
        'vueCanvas': function () {
            if (this.vueCanvas !== null) {
                this.drawBlock3d()
            }
        },
        'data.items': {
            handler: function () {
                this.prepareDataAndDrawBlock()
            },
            deep: true
        }
    },
    created () {
        this.prepareDataToFenceType()
    },
    methods: {
        prepareDataAndDrawBlock () {
            this.drawBlock3d()
        },
        clearCanvas () {
            this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        drawBlock3d () {
            this.clearCanvas()
            let scale = 7
            let width = parseFloat(this.data.items[1].width) * scale
            let height = parseFloat(this.data.items[1].height) * scale
            let depth = parseFloat(this.data.items[1].depth) * scale
            let depthMove = depth / Math.sqrt(2)
            let margin = 150
            let coordinates = this.prepareCoordinates(margin, depthMove, height, width)
            this.drawWidthEdge(coordinates)
            this.drawDepthEdge(coordinates)
            this.drawHeightEdge(coordinates)
        },
        drawWidthEdge(coordinates) {
            this.vueCanvas.beginPath()
            this.vueCanvas.strokeStyle = "#000000";
            this.vueCanvas.moveTo(coordinates['A']['x'], coordinates['A']['y']) // A
            this.vueCanvas.lineTo(coordinates['D']['x'],coordinates['D']['y']) // D
            this.vueCanvas.moveTo(coordinates['B']['x'], coordinates['B']['y']) // B
            this.vueCanvas.lineTo(coordinates['C']['x'],coordinates['C']['y']) // C
            this.vueCanvas.moveTo(coordinates['G']['x'], coordinates['G']['y']) // G
            this.vueCanvas.lineTo(coordinates['F']['x'],coordinates['F']['y']) // F
            this.vueCanvas.stroke()
        },
        drawDepthEdge(coordinates) {
            this.vueCanvas.beginPath()
            this.vueCanvas.moveTo(coordinates['A']['x'], coordinates['A']['y']) // A
            this.vueCanvas.lineTo(coordinates['B']['x'], coordinates['B']['y']) // B
            this.vueCanvas.moveTo(coordinates['D']['x'],coordinates['D']['y']) // D
            this.vueCanvas.lineTo(coordinates['C']['x'],coordinates['C']['y']) // C
            this.vueCanvas.moveTo(coordinates['F']['x'],coordinates['F']['y']) // F
            this.vueCanvas.lineTo(coordinates['E']['x'],coordinates['E']['y']) // E
            this.vueCanvas.stroke()
        },
        drawHeightEdge(coordinates) {
            this.vueCanvas.beginPath()
            this.vueCanvas.moveTo(coordinates['A']['x'], coordinates['A']['y']) // A
            this.vueCanvas.lineTo(coordinates['G']['x'], coordinates['G']['y']) // G
            this.vueCanvas.moveTo(coordinates['D']['x'],coordinates['D']['y']) // D
            this.vueCanvas.lineTo(coordinates['F']['x'],coordinates['F']['y']) // F
            this.vueCanvas.moveTo(coordinates['C']['x'],coordinates['C']['y']) // C
            this.vueCanvas.lineTo(coordinates['E']['x'],coordinates['E']['y']) // E
            this.vueCanvas.stroke()
        },
        prepareCoordinates (margin, depthMove, height, widthMove) {
            let coordinates = []

            coordinates['A'] = []
            coordinates['A']['x'] = margin
            coordinates['A']['y'] = margin
            coordinates['B'] = []
            coordinates['B']['x'] = margin + depthMove
            coordinates['B']['y'] = margin - depthMove
            coordinates['C'] = []
            coordinates['C']['x'] = margin + depthMove + widthMove
            coordinates['C']['y'] = margin - depthMove
            coordinates['D'] = []
            coordinates['D']['x'] = margin + widthMove
            coordinates['D']['y'] = margin
            coordinates['E'] = []
            coordinates['E']['x'] = margin + depthMove + widthMove
            coordinates['E']['y'] = margin + height - depthMove
            coordinates['F'] = []
            coordinates['F']['x'] = margin + widthMove
            coordinates['F']['y'] = margin + height
            coordinates['G'] = []
            coordinates['G']['x'] = margin
            coordinates['G']['y'] = margin + height

            return coordinates
        },
        addColorToItem () {
            let color = {
                color: '#FFFFFF',
                texture: [],
                displayOption: 1,
                name: ''
            }
            this.data.items[1].itemColors.push(color)
        },
        removeColorFromItem (index) {
            this.data.items[1].itemColors.splice(index, 1)
        },
        prepareDataToFenceType () {
            let item = {
                width: 25,
                height: 7,
                depth: 31,
                itemColors: []
            }
            // this.data.items.push(item)
            this.data.items[1] = item
        }
    }
}
</script>