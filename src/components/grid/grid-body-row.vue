<template>


    <component :is="GridBodyRowGroup">
        <grid-body-row-group v-if="true" v-for="(rowParent, keyParent, indexGroup) in groupData.groups"
                             :key="indexGroup"
        >
            <tr>
                <grid-body-cell
                        v-bind:row="rowParent"
                        :colspan="colspan"
                ></grid-body-cell>
            </tr>
        </grid-body-row-group>
    </component>



<!--        <grid-body-row-child v-else-if="true" v-for="(rowChild, keyChild, indexChild) in groupData.childs">
            <tr>
                <grid-body-cell
                        v-bind:row="rowChild"
                        v-for="(column, index) in columns"
                        :key="index"
                        v-bind:column="column"
                ></grid-body-cell>
            </tr>
        </grid-body-row-child>-->


</template>

<script>
    import { mapState } from 'vuex';
    import GridBodyRowGroup from './grid-body-row-group.vue';
    import GridBodyRowChild from './grid-body-row-child.vue';
    import GridBodyCell from './grid-body-cell';

    export default {
        components: {
            GridBodyRowGroup,
            GridBodyRowChild
        },
        props: ["groupData"],
        components: {
            GridBodyCell/*: import ('./grid-cell')*/
        },
        computed: {
            ...mapState( [
                'columns'
            ] ),
            colspan() {
                return this.columns.length;
            }
        }
    }
</script>

<style>

</style>