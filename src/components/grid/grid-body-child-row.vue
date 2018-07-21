<template>
    <tr>
        <template>
            <grid-body-cell
                    v-for="(column, index) in columns"

                    :column="column"
                    :row="row"
            ></grid-body-cell>
        </template>

    </tr>
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
                'columns'
            ] )
        }
    }
</script>

<style>

</style>