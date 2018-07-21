<template v-for="(rowParent, keyParent, indexParent) in groupData.groups"
    :key="indexParent"
>
    <tr>
        <grid-body-cell
                v-bind:row="rowParent"
                :colspan="colspan"
        ></grid-body-cell>
    </tr>
</template>

<script>
    import { mapState } from 'vuex';
    import GridBodyCell from './grid-body-cell';

    export default {
        name: 'RowGroup',
        props: ["row"],
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