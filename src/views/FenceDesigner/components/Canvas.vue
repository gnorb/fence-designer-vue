<template>
    <b-card class="mt-4">
        <b-row>
            <b-col>
                <div id="canvasBox">
                    <canvas id="fenceDesignerCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
                </div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import { drawCanvas } from '../functions/drawCanvas'
import {getAllObjectsWidth, getSectionMaxWidth} from "../functions/tabses";
export default {
    name: 'Canvas',
    props: {
        globalSettings: {
            type: Object,
            required: true
        },
        tabObjects: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            canvasHeight: 280,
            canvas: null,
            canvasHTML: null,
            displayCanvas: true,
            canvasWidth: 0
        }
    },
    mounted () {
        var c = document.getElementById("fenceDesignerCanvas")
        var ctx = c.getContext("2d")
        this.canvasHTML = c
        this.canvas = ctx
        this.canvasDraw()
    },
    created () {
        this.canvasWidth = parseInt(parseInt(this.globalSettings.sectionWidth) + (2 * parseInt(this.globalSettings.margin)))
    },
    watch: {
        tabObjects: {
            handler: function(tabs) {
                let allObjectsWidth = getAllObjectsWidth(tabs)
                let sectionMaxWidth = getSectionMaxWidth(tabs, this.globalSettings.sectionWidth)

                if (sectionMaxWidth >= allObjectsWidth) {
                    this.canvasDraw()
                }

            },
            deep: true
        },
        'globalSettings.sectionWidth': function () {
            this.canvasWidth = parseInt(parseInt(this.globalSettings.sectionWidth) + (2 * parseInt(this.globalSettings.margin)))
        }
    },
    methods: {
        canvasDraw () {
            drawCanvas(this.canvas, this.canvasHTML, this.globalSettings, this.tabObjects)
        }
    }
}
</script>