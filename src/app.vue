<template>
    <table class="table table-bordered">
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
    import { mapState } from 'vuex';

    import gridBody from './components/grid/grid-body.vue';
    import gridHeader from './components/grid/grid-header.vue';
    import gridFooter from './components/grid/grid-footer.vue';

    export default {
        components: {
            gridHeader,
            gridBody,
            gridFooter
        },
        computed:{
            ...mapState([
                'rowsBody',
                'rowsHeader',
                'rowsFooter'
            ])
        }
    }
</script>