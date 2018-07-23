<template>
    <div class="row" :style="{marginLeft: indent}" v-show="isShow">
            <grid-body-child-cell
                    v-for="(column, index) in columns"

                    :column="column"
                    :row="row"
            ></grid-body-child-cell>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import GridBodyChildCell from './grid-body-child-cell.vue';

    export default {
        props: ["row"],
        components: {
            GridBodyChildCell/*: import ('./grid-cell')*/
        },
        computed: {
            ...mapState( [
                'columns',
                'groups',
                'defaultIndent'
            ] ),
            indent() {
                return ( this.groups.length * this.defaultIndent) + 'px';
            },
            isShow(){
                return this.row.parent.isOpen;
            }
        }
    }
</script>

<style>

</style>