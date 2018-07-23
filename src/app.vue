<template>
    <div class="">
        <grid-toolbar></grid-toolbar>

        <grid-header
                :rows="rowsHeader"
        ></grid-header>

        <grid-body-group-row
                v-for="(rowGroupObj) in rowsBody"
                :row="rowGroupObj"
        ></grid-body-group-row>

        <grid-footer
                :rows="rowsFooter"
        ></grid-footer>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import gridToolbar from './components/grid/grid-toolbar.vue';
    import gridHeader from './components/grid/grid-header.vue';
    import gridFooter from './components/grid/grid-footer.vue';

    import GridBodyGroupRow from './components/grid/grid-body-group-row.vue';


    export default {
        components: {
            gridToolbar,
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