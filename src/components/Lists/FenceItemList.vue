<template>
    <b-row>
        <b-col>
            <b-table striped hover :items="items"></b-table>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'FenceItemList',
    data () {
        return {
            items: []
        }
    },
    created () {
        // this.getFenceItemList()
    },
    methods: {
        getFenceItemList () {
            this.$axios.get(this.$url + '/fence/item')
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                })
        }
    }
}
</script>