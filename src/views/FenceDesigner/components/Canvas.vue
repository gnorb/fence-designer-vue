<template>
    <b-card class="mt-4">
        <b-row>
            <b-col>
                <div class="float-right">
                    <b-btn @click="getCanvasImage()" v-tooltip.top-center="$t('createPDF')"><b-icon-file-earmark style="margin-top: -3px;"></b-icon-file-earmark></b-btn>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div id="canvasBox">
                    <canvas id="fenceDesignerCanvas" ref="fenceDesignerCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
                </div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import { drawCanvas } from '../functions/drawCanvas'
import {getAllObjectsWidth, getSectionMaxWidth} from '../functions/tabses'
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
            canvasWidth: 0,
            output: null
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
        'output': function (val) {
          if (val) {
              this.generatePdf(val)
              this.output = null
          }
        },
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
        },
        generatePdf (image) {
            let params = {
                image: image
            }
            this.$axios
                .get(this.$store.state.url + '/api/pdf', {
                    params,
                    responseType: 'arraybuffer'
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    // this.sending = false
                })
        },
        async getCanvasImage () {
            const el = this.$refs.fenceDesignerCanvas
            const options = {
                type: 'dataURL'
            }
            this.output = await this.$html2canvas(el, options)
        }
    }
}
</script>