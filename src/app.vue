<template>
    <table class="table table-hover table-bordered table-sm">
        <grid-header
                v-bind:rows="rowsHeader"
        ></grid-header>
        <grid-body
                v-bind:rows="rowsBody"
        ></grid-body>
        <grid-footer
                v-bind:rows="rowsFooter"
        ></grid-footer>
    </table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    import gridBody from './components/grid/grid-body.vue';
    import gridHeader from './components/grid/grid-header.vue';
    import gridFooter from './components/grid/grid-footer.vue';

    export default {
        components: {
            gridHeader,
            gridBody,
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
            ...mapActions([
                'getRowsHeader',
                'getRowsBody',
                'getRowsFooter'
            ])
        },
        created(){
            let metods = mapActions([
                'getRowsHeader',
                'getRowsBody',
                'getRowsFooter'
            ]);

            metods.getRowsHeader.apply(this);
            metods.getRowsBody.apply(this);
            metods.getRowsFooter.apply(this);
        }
    }
</script>