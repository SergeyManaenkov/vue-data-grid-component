<template>
    <div class="row">
        <grid-cell
                v-bind:row="row"
                v-for="(column, index) in columns"
                :key="index"
                v-bind:column="column"
        ></grid-cell>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import GridCell from './grid-footer-cell';

    export default {
        props: ["row"],
        components: {
            GridCell/*: import ('./grid-cell')*/
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