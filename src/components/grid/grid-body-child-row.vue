<template>
    <div class="row" :style="{marginLeft: indent}">
            <grid-body-cell
                    v-for="(column, index) in columns"

                    :column="column"
                    :row="row"
            ></grid-body-cell>
    </div>
</template>


<script>
    import { mapState } from 'vuex';
    import GridBodyCell from './grid-body-child-cell.vue';

    export default {
        props: ["row"],
        components: {
            GridBodyCell/*: import ('./grid-cell')*/
        },
        computed: {
            ...mapState( [
                'columns',
                'groups',
                'defaultIndent'
            ] ),
            indent() {
                return ( this.groups.length * this.defaultIndent) + 'px';
            }
        }
    }
</script>

<style>

</style>