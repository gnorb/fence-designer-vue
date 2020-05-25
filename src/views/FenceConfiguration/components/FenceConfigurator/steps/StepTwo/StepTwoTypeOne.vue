<template>
    <b-row class="mt-3">
        <b-col>
            <b-row>
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width') }} ({{$store.state.unitOfMeasure}}):</label>
                    <b-form-input v-model="data.items[0].width" min="10" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.width')"></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height') }} ({{$store.state.unitOfMeasure}}):</label>
                    <b-form-input v-model="data.items[0].height" min="5" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.height')"></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth') }} ({{$store.state.unitOfMeasure}}):</label>
                    <b-form-input v-model="data.items[0].depth" min="5" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.block.depth')"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-2" v-if="selectedBlock === 1">
                <b-col>
                    <label>{{ $t('views.fenceConfiguration.fenceConfigurator.data.blocksData.blockCrushed.widthLeft') }} ({{$store.state.unitOfMeasure}}):</label>
                    <b-form-input v-model="data.items[0].widthLeft" min="2" :max="data.items[0].width - 2" type="number" :placeholder="$t('views.fenceConfiguration.fenceConfigurator.data.blocksData.blockCrushed.widthLeft')"></b-form-input>
                </b-col>
            </b-row>
            <hr>
            <b-btn size="sm" variant="dark" @click="addColorToItem()">{{ $t('views.fenceConfiguration.fenceConfigurator.addNewColor') }}</b-btn>
            <b-alert class="mt-2" show variant="dark">{{ $t('views.fenceConfiguration.fenceConfigurator.colorInfo') }}</b-alert>
            <b-row v-for="(color, index) in data.items[0].itemColors" v-bind:key="'color-' + index">
                <b-col>
                    <Color :color="color" :removeColorFromItem="removeColorFromItem" :index="index"></Color>
                    <hr class="mt-2 mb-2">
                </b-col>
            </b-row>
        </b-col>
        <b-col>
            <b-row>
                <b-col>
                    <b-form-group>
                        <b-form-radio-group
                                class="float-right"
                                v-model="selectedBlock"
                                :options="blocksOptions"
                                buttons
                                name="radios-btn-default"
                        ></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <canvas id="blockCanvas" width="700" height="300"></canvas>
        </b-col>
    </b-row>
</template>

<script>
import Color from './Color'
export default {
    name: 'StepTwoTypeOne',
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
            canvas: null,
            selectedBlock: 0,
            blocksOptions: [
                {
                    value: 0,
                    text: this.$t('views.fenceConfiguration.fenceConfigurator.blocksOptions.full')
                },
                {
                    value: 1,
                    text: this.$t('views.fenceConfiguration.fenceConfigurator.blocksOptions.crushed')
                }
            ]
        }
    },
    mounted () {
        var c = document.getElementById("blockCanvas")
        var ctx = c.getContext("2d")
        this.canvas = c
        this.vueCanvas = ctx
    },
    watch: {
        'data.items': {
            handler: function () {
                this.handleCutData()
                this.prepareDataAndDrawBlock()
            },
            deep: true
        },
        'vueCanvas': function () {
          if (this.vueCanvas !== null) {
              this.drawBlock3d()
          }
        },
        'selectedBlock': function () {
            this.prepareDataAndDrawBlock()
        }
    },
    created () {
        this.prepareDataToFenceType()
    },
    methods: {
        handleCutData () {
            this.data.items[0].widthRight = this.data.items[0].width - this.data.items[0].widthLeft
        },
        prepareDataAndDrawBlock () {
            this.drawBlock3d()
        },
        clearCanvas () {
            this.vueCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        drawBlock3d () {
            this.clearCanvas()
            let scale = 7
            let width = parseFloat(this.data.items[0].width) * scale
            let height = parseFloat(this.data.items[0].height) * scale
            let depth = parseFloat(this.data.items[0].depth) * scale
            let cut = parseFloat(this.data.items[0].widthLeft) * scale
            let depthMove = depth / Math.sqrt(2)
            let margin = 150
            let coordinates = this.prepareCoordinates(margin, depthMove, height, width, cut)
            this.drawWidthEdge(coordinates)
            this.drawDepthEdge(coordinates)
            this.drawHeightEdge(coordinates)
            if (this.selectedBlock === 1) {
                this.drawCutEdge(coordinates)
            }
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
        drawCutEdge(coordinates) {
            this.vueCanvas.beginPath()
            this.vueCanvas.strokeStyle = "#FF0000";
            this.vueCanvas.moveTo(coordinates['H']['x'], coordinates['H']['y']) // H
            this.vueCanvas.lineTo(coordinates['I']['x'], coordinates['I']['y']) // I
            this.vueCanvas.lineTo(coordinates['J']['x'],coordinates['J']['y']) // J
            this.vueCanvas.stroke()
        },
        prepareCoordinates (margin, depthMove, height, widthMove, cut) {
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

            coordinates['H'] = []
            coordinates['H']['x'] = margin + cut
            coordinates['H']['y'] = margin + height
            coordinates['I'] = []
            coordinates['I']['x'] = margin + cut
            coordinates['I']['y'] = margin
            coordinates['J'] = []
            coordinates['J']['x'] = margin + cut + depthMove
            coordinates['J']['y'] = margin - depthMove

            return coordinates
        },
        addColorToItem () {
            let color = {
                color: '#FFFFFF',
                texture: [],
                displayOption: 1,
                name: ''
            }
            this.data.items[0].itemColors.push(color)
        },
        removeColorFromItem (index) {
            this.data.items[0].itemColors.splice(index, 1)
        },
        prepareDataToFenceType () {
            let item = {
                width: 38,
                height: 16,
                depth: 22,
                widthLeft: 12,
                widthRight: 24,
                itemColors: []
            }
            // this.data.items.push(item)
            this.data.items[0] = item
        }
    }
}
</script>