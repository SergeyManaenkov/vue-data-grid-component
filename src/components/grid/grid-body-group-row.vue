<template>

    <div class="container-group">
        <!-- Отрисовываем группировку -->
        <div class="row font-weight-bold bg-light" v-if="row.isGroup">
            <grid-body-group-cell
                    :row="row"
                    :colspan="colspan"
            ></grid-body-group-cell>
        </div>

        <!-- Дочерние группировки, усли они есть -->
        <template
                v-if="row.childGroups"
        >
            <grid-body-group-row
                    v-for="(rowObj) in row.childGroups"
                    :row="rowObj"
            ></grid-body-group-row>
        </template>

        <!-- Выводим детей группировки, если они есть -->
        <template
                v-if="isChilds"
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
        name: 'grid-body-group-row',/* т.к. данные компанент вызывается рекурсивно, нужно задать назвнаине компанента */
        props: ["row", 'index'],
        components: {
            GridBodyGroupCell,
            GridBodyChildRow
        },
        computed: {
            ...mapState( [
                'columns'
            ] ),
            colspan() {
                return this.columns.length;
            },
            isChilds() {
                return this.row.childs && !!this.row.childs.length;
            }
        }
    }
</script>

<style>

</style>