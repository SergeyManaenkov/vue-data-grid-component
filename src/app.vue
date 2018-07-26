<template>
    <div>
        <!-- ToolBar -->
        <grid-toolbar></grid-toolbar>
        <!-- Header -->
        <grid-header
                :rows="rowsHeader"
        ></grid-header>
        <!-- Body -->
        <grid-body
                :rows="rowsBody"
        ></grid-body>
        <!-- Footer -->
        <grid-footer
                :rows="rowsFooter"
        ></grid-footer>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import gridToolbar from './components/grid/grid-toolbar.vue';
    import gridHeader from './components/grid/grid-header.vue';
    import GridBody from './components/grid/grid-body.vue';
    import gridFooter from './components/grid/grid-footer.vue';


    export default {
        components: {
            gridToolbar,
            gridHeader,
            GridBody,
            gridFooter
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
            debugger;
            metods.getRowsHeader.apply( this );
            metods.getRowsBody.apply( this );
            metods.getRowsFooter.apply( this );
        }
    }
</script>
