import axios from 'axios'
import store from '../../store/index.js'

export function getFenceTypeList (parameters = {}, output) {
    // console.log(parameters)
    axios.get(store.state.url + '/fence/type', parameters)
        .then(function (response) {
            console.log(response)
            let list = response.data

            if (output === 'options') {
                let array = []
                for (let i in list) {
                    let object = {
                        value: list[i].id,
                        text: list[i].name
                    }
                    array.push(object)
                }
                list = array
            }
            store.state.entities.fenceType.list = list
        })
        .catch(function (error) {
            console.log(error)
        })
        // .finally(function () {
        //     // always executed
        // })
}