<template>

    <div class="container-group" :style="{paddingLeft: indent}">
        <!-- Отрисовываем группировку -->
        <div class="row font-weight-bold bg-light" v-if="isGroup">
            <grid-body-group-cell
                    :row="row"
            ></grid-body-group-cell>
        </div>

        <!-- Дочерние группировки, усли они есть -->
        <template
                v-if="isChildGroups"
        >
            <grid-body-group-row
                    v-for="(rowObj) in row.childGroups"
                    :row="rowObj"
                    v-show="isOpen"
            ></grid-body-group-row>
        </template>

        <!-- Выводим детей группировки, для последней группировки -->
        <template
                v-if="isLast"
        >
            <grid-body-child-row
                    v-for="(rowChild) in row.childs"
                    :parent="row"
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
        name: 'grid-body-group-row', /* т.к. данные компанент вызывается рекурсивно, нужно задать назвнаине компанента */
        props: ["row"],
        components: {
            GridBodyGroupCell,
            GridBodyChildRow
        },
        computed: {
            ...mapState( [
                'columns',
                'defaultIndent'
            ] ),
            isGroup(){
                return this.row.isGroup;
            },
            isChildGroups(){
              return this.row.childGroups;
            },
            isLast() {
                return this.row.isLast;
            },
            isOpen() {
                return this.row.isOpen;
            },
            indent() {
                let l = this.row.level;
                if ( l > 0 ) {
                    return ( this.defaultIndent) + 'px';
                }
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