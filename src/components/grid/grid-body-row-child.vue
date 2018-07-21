<template v-for="(rowChild, keyChild, indexChild) in groupData.childs">
    <tr>
        <grid-body-cell
                v-bind:row="rowChild"
                v-for="(column, index) in columns"
                :key="index"
                v-bind:column="column"
        ></grid-body-cell>
    </tr>
</template>


<script>
    import { mapState } from 'vuex';
    import GridBodyCell from './grid-body-cell';

    export default {
        components: {

        },
        props: ["groupData"],
        components: {
            GridBodyCell/*: import ('./grid-cell')*/
        },
        computed: {
            ...mapState( [
                'columns'
            ] ),
            colspan(){
                return this.columns.length;
            }
        }
    }
</script>

<style>

</style>