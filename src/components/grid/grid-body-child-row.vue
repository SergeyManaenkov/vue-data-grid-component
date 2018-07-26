<template>
    <div class="row" :style="{paddingLeft: indent}"
         v-show="isOpen"
    >
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
        props: ["parent", "row"],
        components: {
            GridBodyChildCell
        },
        computed: {
            ...mapState( [
                'columns',
                'groups',
                'defaultIndent'
            ] ),
            indent() {
                return ( this.defaultIndent) + 'px';
            },
            isOpen(){
                return this.parent.isOpen;
            }
        }
    }
</script>

<style scoped>
    .row{
        margin-right: 0px;
        margin-left: 0px;
    }
</style>