<template>
    <div class="row">
        <grid-header-cell
                v-bind:row="row"
                v-for="(column, index) in columns"
                :key="index"
                v-bind:column="column"
        ></grid-header-cell>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import GridHeaderCell from './grid-header-cell';

    export default {
        props: ["row"],
        components: {
            GridHeaderCell/*: import ('./grid-cell')*/
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