import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: '',
    displayLoader: false,
    unitOfMeasure: 'cm',
    unitOfMeasureWeight: 'kg',
    aspect: '16:9',
    user: {
      id: 0,
      username: '',
      roles: [],
      email: ''
    },
    configuration: {
      canvas: {
        compartmentsColor: '#343a40'
      }
    },
    fenceItem: {
      creating: false,
      created: false,
      updating: false,
      updated: false,
      loading: false
    },
    modals: {
      FenceDesigner: {
        ModalGroupOfPostsAndSpans: {
          open: false,
          close: false
        }
      },
      FDObject: {
        formModal: {
          open: false,
          id: 0,
          close: false
        }
      },
      FDConfiguration: {
        formModal: {
          open: false,
          id: 0,
          close: false
        }
      },
      FDItem: {
        formModal: {
          open: false,
          id: 0,
          close: false
        }
      },
      fenceItemCreateFormModal: {
        open: false,
        close: false
      },
      fenceItemUpdateFormModal: {
        open: false,
        close: false,
        id: 0
      }
    },
    listener: {
      FDObject: {
        create: 0,
        update: 0,
        remove: 0
      }
    },
    entities: {
      fenceType: {
        list: []
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
