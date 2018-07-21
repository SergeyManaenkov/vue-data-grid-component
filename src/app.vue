<template>
    <table class="table table-hover table-bordered table-sm">
        <grid-header
                v-bind:rows="rowsHeader"
        ></grid-header>

        <tbody>
                <grid-body-group-row
                        v-for="(rowGroupObj) in rowsBody"
                        :row="rowGroupObj"
                ></grid-body-group-row>
        </tbody>

        <grid-footer
                v-bind:rows="rowsFooter"
        ></grid-footer>
    </table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import gridHeader from './components/grid/grid-header.vue';
    import gridFooter from './components/grid/grid-footer.vue';

    import GridBodyGroupRow from './components/grid/grid-body-group-row.vue';


    export default {
        components: {
            gridHeader,
            gridFooter,
            GridBodyGroupRow
        },
        computed: {
            ...mapState( [
                'rowsHeader',
                'rowsBody',
                'rowsFooter'
            ] )
        },
        methods: {
            ...mapActions( [
                'getRowsHeader',
                'getRowsBody',
                'getRowsFooter'
            ] )
        },
        created() {
            let metods = mapActions( [
                'getRowsHeader',
                'getRowsBody',
                'getRowsFooter'
            ] );

            metods.getRowsHeader.apply( this );
            metods.getRowsBody.apply( this );
            metods.getRowsFooter.apply( this );
        }
    }
</script>