<template>
    <b-row>
        <b-col>
            <b-card class="mt-4">
                <b-row>
                    <b-col>
                        <b-btn variant="primary" class="float-left mr-1" @click="addGroupOfPostsAndSpans()">
                            <b-icon-plus-circle-fill style="margin-top: -3px;" class="mr-2"></b-icon-plus-circle-fill>{{ $t('views.fenceDesigner.tabMain.addGroupOfPostsAndSpans') }}
                        </b-btn>
                        <template v-for="(object, index) in fdConfigurationObjectsButtons">
                            <b-btn variant="success" class="float-left mr-1" v-bind:key="'object-' + index" @click="addNewTab(object.id)">
                                <b-icon-plus-circle-fill style="margin-top: -3px;" class="mr-2"></b-icon-plus-circle-fill>{{ $t(object.name) }}
                            </b-btn>
                        </template>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col>
                        <b-tabs content-class="mt-3" v-model="tabIndex" v-if="tabs.length > 0">
                            <template v-for="(tab, index) in tabs">
                                <b-tab :title="tab.name" v-bind:key="'tab-' + index" lazy>
                                    <b-row>
                                        <b-col>
                                            <b-btn size="sm" variant="danger" class="float-right" @click="closeTab(index)" v-if="(index + 1) === tabs.length">
                                                {{ $t('remove') }}
                                            </b-btn>
                                            <b-btn size="sm" variant="danger" class="float-right" v-else disabled v-tooltip.top-center="$t('views.fenceDesigner.tabMain.disabledRemoveTooltip')">
                                                {{ $t('remove') }}
                                            </b-btn>
                                        </b-col>
                                    </b-row>
                                    <TabGroup v-if="tab.type === 0" :tab="tab"></TabGroup>
                                    <template v-else-if="tab.type === 1">
                                        <TabGate :tabObject="tab.objects[0]"
                                                 :getAllObjectsWidthLocal="getAllObjectsWidthLocal"
                                                 :getSectionMaxWidthLocal="getSectionMaxWidthLocal"
                                        ></TabGate>
                                    </template>
                                    <template v-else-if="tab.type === 2">
                                        <TabWicket :tabObject="tab.objects[0]"
                                                   :getAllObjectsWidthLocal="getAllObjectsWidthLocal"
                                                   :getSectionMaxWidthLocal="getSectionMaxWidthLocal"
                                        ></TabWicket>
                                    </template>
                                    <template v-else-if="tab.type === 3">
                                        <TabSpan :tabObject="tab.objects[0]"
                                                 :getAllObjectsWidthLocal="getAllObjectsWidthLocal"
                                                 :getSectionMaxWidthLocal="getSectionMaxWidthLocal"
                                                 :groupEdit="groupEdit"
                                        ></TabSpan>
                                    </template>
                                    <template v-else-if="tab.type === 4">
                                        <TabPost :tabObject="tab.objects[0]"
                                                 :getAllObjectsWidthLocal="getAllObjectsWidthLocal"
                                                 :getSectionMaxWidthLocal="getSectionMaxWidthLocal"
                                                 :groupEdit="groupEdit"
                                        ></TabPost>
                                    </template>
                                </b-tab>
                            </template>
                        </b-tabs>
                    </b-col>
                </b-row>
            </b-card>
            <ModalGroupOfPostsAndSpans :fdConfigurationObjects="fdConfigurationObjects"
                                       :globalSettings="globalSettings"
            ></ModalGroupOfPostsAndSpans>
        </b-col>
    </b-row>
</template>

<script>
import TabGate from './TabGate'
import TabWicket from './TabWicket'
import TabSpan from './TabSpan'
import TabPost from './TabPost'
import TabGroup from './TabGroup'
import { getSectionMaxWidth, getAllObjectsWidth } from '../../functions/tabses'
import ModalGroupOfPostsAndSpans from './ModalGroupOfPostsAndSpans'

export default {
    name: 'TabMain',
    components: {
        TabGate,
        TabWicket,
        TabPost,
        TabSpan,
        TabGroup,
        ModalGroupOfPostsAndSpans
    },
    props: {
        fdConfigurationObjects: {
            type: Array,
            required: true
        },
        globalSettings: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            tabs: [],
            fdConfigurationObjectsButtons: [],
            tabIndex: 0,
            groups: []
        }
    },
    computed: {
        //
    },
    watch: {
        tabs: {
            handler: function() {
                this.updateButtonsStates()
                this.$emit('input', this.tabs)
            },
            deep: true
        }
    },
    created () {
        this.updateButtonsStates()
    },
    methods: {
        updateButtonsStates () {
            let buttonsToDisplay = []
            let typesToDisplay = []
            let lastIndex = this.tabs.length - 1
            // if (this.tabs.length === 0) {
            //     typesToDisplay.push(4)
            // } else if (this.tabs[lastIndex].objectTypeId === 4) {
            //     typesToDisplay.push(3)
            //     typesToDisplay.push(2)
            //     typesToDisplay.push(1)
            // } else {
            //     typesToDisplay.push(4)
            // }
            if (this.tabs.length > 0 && (this.tabs[lastIndex].type === 0 || this.tabs[lastIndex].type === 4)) {
                typesToDisplay.push(2)
                typesToDisplay.push(1)
                typesToDisplay.push(3)
            }
            // else if (this.tabs.length > 0 && this.tabs[lastIndex].type !== 0) {
            //     typesToDisplay.push(4)
            // }
            else {
                typesToDisplay.push(4)
            }
            for (let i in this.fdConfigurationObjects) {
                if (typesToDisplay.includes(this.fdConfigurationObjects[i].objectType.id)) {
                    buttonsToDisplay.push(this.fdConfigurationObjects[i])
                }
            }
            this.fdConfigurationObjectsButtons = buttonsToDisplay
        },
        closeTab(index) {
            this.tabs.splice(index, 1)
        },
        addNewTab (id) {
            let tabs = JSON.parse(JSON.stringify(this.tabs))
            tabs.push(this.createNewObject(id))
            let allObjectsWidth = getAllObjectsWidth(tabs)
            let sectionMaxWidth = getSectionMaxWidth(tabs, this.globalSettings.sectionWidth)

            if (sectionMaxWidth < allObjectsWidth) {
                // this.$bvModal
                //     .msgBoxConfirm('Please confirm that you want to delete everything.', {
                //         title: 'Please Confirm',
                //         size: 'sm',
                //         buttonSize: 'sm',
                //         okVariant: 'danger',
                //         okTitle: 'YES',
                //         cancelTitle: 'NO',
                //         footerClass: 'p-2',
                //         hideHeaderClose: false,
                //         centered: true
                //     })
                //     .then(value => {
                //         console.log(value)
                //     })
                //     .catch(err => {
                //         // An error occurred
                //         console.log(err)
                //     })
                alert('przekroczono maksymalną szerokość')
            } else {
                this.tabs = tabs
            }
        },
        getAllObjectsWidthLocal () {
            return getAllObjectsWidth(this.tabs)
        },
        getSectionMaxWidthLocal () {
            return getSectionMaxWidth(this.tabs, this.globalSettings.sectionWidth)
        },
        createNewObject (id) {
            let objects = this.fdConfigurationObjects
            // let newObject = {}
            let newTab = {
                name: this.$t('views.fenceDesigner.tabMain.group'),
                objects: [],
                type: 0,
                width: 0,
                defaultFirstPost: null,
                defaultPost: null,
                defaultLastPost: null,
                defaultSpan: null
            }
            for (let i in objects) {
                if (objects[i].id === id) {
                    let object = objects[i]
                    let newObject = this.fillNewObject(object)
                    newTab.name = this.$t(object.name)
                    newTab.type = object.objectType.id
                    newTab.objects.push(newObject)
                    break
                }
            }

            return newTab
        },
        addGroupOfPostsAndSpans () {
            // this.$store.state.modals.FenceDesigner.ModalGroupOfPostsAndSpans.open = true
            let objects = this.fdConfigurationObjects
            let newTab = {
                name: this.$t('views.fenceDesigner.tabMain.group'),
                objects: [],
                type: 0,
                width: 0,
                defaultFirstPost: null,
                defaultPost: null,
                defaultLastPost: null,
                defaultSpan: null
            }
            for (let i in objects) {
                if (objects[i].objectType.id === 4) {
                    let object = objects[i]
                    let postObject = this.fillNewObject(objects[i])
                    newTab.objects.push(postObject)
                    newTab.width = parseInt(object.brick.width) * parseInt(object.defaultWidth)
                    newTab.level = 0
                    newTab.defaultFirstPost = Object.assign({}, postObject)
                    newTab.defaultPost = Object.assign({}, postObject)
                    newTab.defaultLastPost = Object.assign({}, postObject)
                } else if (objects[i].objectType.id === 3) {
                    newTab.defaultSpan = Object.assign({}, this.fillNewObject(objects[i]))
                }
            }
            this.tabs.push(newTab)
        },
        groupEdit (object) {
            for (let i in this.tabs) {
                if (this.tabs[i].group === object.group && this.tabs[i].global === '1' && this.tabs[i].objectTypeId === object.objectTypeId) {
                    this.tabs[i].width = object.width
                    this.tabs[i].height = object.height
                }
            }
        },
        fillNewObject (object) {
            let newObject = {}
            newObject.name = object.name
            newObject.objectTypeId = object.objectType.id
            newObject.width = object.defaultWidth
            newObject.height = object.defaultHeight
            newObject.brick = object.brick
            newObject.roof = object.roof
            newObject.level = 0
            return newObject
        }
    }
}
</script>