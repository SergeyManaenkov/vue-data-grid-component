<template>

    <div>
        <tr>
            <grid-body-group-cell
                    :row="row"
                    :colspan="colspan"
            ></grid-body-group-cell>
        </tr>

        <grid-body-group-row
                v-for="(rowObj) in row.childGroups"
                :row="rowObj"
        ></grid-body-group-row>
        <template
                v-if="row.childs.length"
        >
            <grid-body-child-row
                    v-for="(rowChild) in row.childs"
                    :row="rowChild"
            ></grid-body-child-row>
        </template>

    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import GridBodyGroupCell from './grid-body-group-cell.vue';
    import GridBodyChildRow from './grid-body-child-row.vue';


    export default {
        name: 'grid-body-group-row',
        props: ["row", 'index'],
        components: {
            GridBodyGroupCell,/*: import ('./grid-cell')*/
            GridBodyChildRow
        },
        computed: {
            ...mapState( [
                'columns',
                'fieldKey'
            ] ),
            colspan() {
                return this.columns.length;
            },
            isChildGroups() {
                return !!this.row.childGroups;
            }
        }
    }
</script>

<style>

</style>