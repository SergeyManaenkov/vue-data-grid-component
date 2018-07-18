<template>
    <tr>
        <grid-body-cell
                v-bind:row="row"
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