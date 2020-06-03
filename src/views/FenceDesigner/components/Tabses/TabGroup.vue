<template>
    <b-row>
        <b-col>
            <b-row>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                    <b-form-input v-model="tab.width" type="number" :min="step" :step="step" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.width')"></b-form-input>
                </b-col>
                <b-col>
                    <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.level') }}:</label>
                    <b-form-input v-model="tab.level" type="number" min="0" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.level')"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <hr>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h6><b>{{ $t('views.fenceDesigner.tabMain.tabGroup.defaultFirstPost') }}:</b></h6>
                    <b-row>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultFirstPost.width" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.width')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.height') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultFirstPost.height" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.height')"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <h6><b>{{ $t('views.fenceDesigner.tabMain.tabGroup.defaultPost') }}:</b></h6>
                    <b-row>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultPost.width" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.width')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.height') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultPost.height" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.height')"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <h6><b>{{ $t('views.fenceDesigner.tabMain.tabGroup.defaultLastPost') }}:</b></h6>
                    <b-row>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultLastPost.width" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.width')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.postData.height') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultLastPost.height" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.postData.height')"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <hr>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h6><b>{{ $t('views.fenceDesigner.tabMain.tabGroup.defaultSpan') }}:</b></h6>
                    <b-row>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.spanData.width') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultSpan.width" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.spanData.width')"></b-form-input>
                        </b-col>
                        <b-col>
                            <label>{{ $t('views.fenceDesigner.tabMain.tabGroup.spanData.height') }} ({{ $store.state.unitOfMeasure }}):</label>
                            <b-form-input v-model="tab.defaultSpan.height" type="number" min="1" step="1" :placeholder="$t('views.fenceDesigner.tabMain.tabGroup.spanData.height')"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'TabGroup',
    props: {
        tab: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            //
        }
    },
    watch: {
        'tab.width': function (newVal, oldVal) {
            this.handleSectionWidthChange(parseInt(newVal), parseInt(oldVal))
        },
        'tab.defaultLastPost.width': function () {
            this.swapLastPost()
        },
        'tab.defaultLastPost.height': function () {
            this.swapLastPost()
        },
        'tab.defaultPost.width': function () {
            this.swapMiddlePosts()
        },
        'tab.defaultPost.height': function () {
            this.swapMiddlePosts()
        },
        'tab.defaultFirstPost.width': function () {
            this.swapFirstPost()
        },
        'tab.defaultFirstPost.height': function () {
            this.swapFirstPost()
        },
        'tab.defaultSpan.width': function () {
            this.swapSpans()
        },
        'tab.defaultSpan.height': function () {
            this.swapSpans()
        },
        'tab.level': function () {
            this.swapLevels()
        }
    },
    computed: {
        step: function () {
            return parseInt(this.tab.objects[0].brick.width)
        }
    },
    methods: {
        swapFirstPost () {
            this.tab.objects[0].width = this.tab.defaultFirstPost.width
            this.tab.objects[0].height = this.tab.defaultFirstPost.height
        },
        swapLastPost () {
            this.tab.objects[this.tab.objects.length - 1].width = this.tab.defaultLastPost.width
            this.tab.objects[this.tab.objects.length - 1].height = this.tab.defaultLastPost.height
        },
        swapMiddlePosts () {
            for (let i in this.tab.objects) {
                if (i > 0 && i < (this.tab.objects.length - 1) && this.tab.objects[i].objectTypeId === 4) {
                    this.tab.objects[i].width = this.tab.defaultPost.width
                    this.tab.objects[i].height = this.tab.defaultPost.height
                }
            }
        },
        swapSpans () {
            for (let i in this.tab.objects) {
                if (i > 0 && i < (this.tab.objects.length - 1) && this.tab.objects[i].objectTypeId === 3) {
                    this.tab.objects[i].width = this.tab.defaultSpan.width
                    this.tab.objects[i].height = this.tab.defaultSpan.height
                }
            }
        },
        swapLevels () {
            this.tab.defaultSpan.level = this.tab.level
            this.tab.defaultPost.level = this.tab.level
            this.tab.defaultFirstPost.level = this.tab.level
            this.tab.defaultLastPost.level = this.tab.level
            for (let i in this.tab.objects) {
                this.tab.objects[i].level = this.tab.level
            }
        },
        handleSectionWidthChange (sectionWidthNew, sectionWidthOld) {
            if (sectionWidthNew > sectionWidthOld) {
                this.addNewObjects(sectionWidthNew)
            } else {
                this.removeNewObjects(sectionWidthNew)
            }
        },
        addNewObjects(sectionWidth) {
            let objects = JSON.parse(JSON.stringify(this.tab.objects))
            let addNewObjectWidth = (parseInt(this.tab.defaultSpan.brick.width) * parseInt(this.tab.defaultSpan.width)) + (parseInt(this.tab.defaultPost.brick.width) * parseInt(this.tab.defaultPost.width))
            let width = 0
            for (let i in objects) {
                let objectWidth = parseInt(objects[i].brick.width) * parseInt(objects[i].width)
                width += objectWidth
            }
            while ((width + addNewObjectWidth) <= sectionWidth) {
                objects.push(Object.assign({}, this.tab.defaultSpan))
                objects.push(Object.assign({}, this.tab.defaultPost))
                width += addNewObjectWidth
            }
            this.tab.objects = objects
        },
        removeNewObjects(sectionWidth) {
            let objects = JSON.parse(JSON.stringify(this.tab.objects))
            let width = 0
            for (let i in objects) {
                let objectWidth = parseInt(objects[i].brick.width) * parseInt(objects[i].width)
                width += objectWidth
            }
            if (width > sectionWidth) {
                objects.pop()
                objects.pop()
                this.tab.objects = objects
            }
        }
    }
}
</script>
